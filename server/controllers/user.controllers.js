const User = require("../models/user.models");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const privatePath = path.join(__dirname, "..", "jwtRS256.key");
const privateKey = fs.readFileSync(privatePath, "utf8");
// get user by id controller;
exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById({ _id: userId });
        if (!user) {
            res
                .status(404)
                .json({
                    message: "User Not Found, Please check your email or password",
                });
        }
        res.status(200).json({ message: "User Found", user });
    } catch (error) {
        console.log("Error occcured: ", error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at gettiing the user by id" });
    }
};

// register the user controller;
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(404).json({ message: "All Fields required" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message:
                    "User with this email allready exists, please try with another email",
            });
        }

        // check the complexity of password;
        const passwordRegex =
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must be at least * characters long and contain at least one capital letter, one symbol, and one number",
            });
        }

        // hashing the password and saving the user database to DB
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                console.log("Error Occured: ", err);
                res
                    .status(404)
                    .json({
                        message: "Something went wrong at the hashing the password",
                    });
            } else {
                const newUser = new User({ username, email, password: hash, role });
                await newUser.save();
                res
                    .status(201)
                    .json({ message: "User Registered Successfully", newUser });
            }
        });
    } catch (error) {
        console.log("Error occcured: ", error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at regisering the user" });
    }
};

// log in user controllers
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found with this email" });
        }

        const hashedPassword = user.password;

        bcrypt.compare(password, hashedPassword, async function (err, result) {
            if (result) {
                const accessToken = jwt.sign(
                    { userId: user._id, userRole: user.role },
                    privateKey,
                    { algorithm: "RS256" }
                );
                res
                    .status(201)
                    .json({ message: "User logged in successfully", accessToken });
            } else {
                console.log(err);
                res
                    .status(404)
                    .json({ message: "Password is not matched, please login again" });
            }
        });
    } catch (error) {
        console.log(error.message);
        res
            .status(500)
            .json({ message: "Something went wrong at logging the user" });
    }
};
