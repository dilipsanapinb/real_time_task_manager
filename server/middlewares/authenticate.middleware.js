const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const publicKey=fs.readFileSync('./jwtRS256.key.pub')
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(404).json({ message: "Token not found please login first" })
        }
        jwt.verify(token, process.env.publicKey, function (err, decoded) {
            if (err) {
                console.log('error at verifying the token: ', err);
                res.status(404).json({ message: "Something went wrong at verifying the JWT token using the secrete, Please Login Again" })
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