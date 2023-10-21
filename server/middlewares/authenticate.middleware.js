const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();
const publicPath = path.join(__dirname, "..", "jwtRS256.key.pub");
const publicKey = fs.readFileSync(publicPath, "utf8");

const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token not found please login first" })
        }
        jwt.verify(token, publicKey, function (err, decoded) {
            if (err) {
                console.log('error at verifying the token: ', err);
                res.status(401).json({ message: "Something went wrong at verifying the JWT token using the secrete, Please Login Again" })
            } else {
                const userRole = decoded?.userRole;
                req.body.userRole = userRole;
                const userId = decoded?.userId;
                req.body.userId = userId;
                next();
            }
        })
    } catch (error) {
        console.log('JWT_TOKEN verification Error: ', error);
        res.status(500).json({ message: "Something went wrong at the authenticating the user with jwt token" })
    }
};

module.exports = authenticateUser;