

const authoriseUser = (roles_array) => {
    return (req, res, next) => {
        const userRole = req.body.userRole;
        if (roles_array.includes(userRole)) {
            next();
        } else {
            res.status(403).json({message:"User is authorised to this action"})
        }
    }
}
module.exports = authoriseUser;