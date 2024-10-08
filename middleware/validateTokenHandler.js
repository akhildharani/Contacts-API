const asyncHandler = require("express-async-handler");
const jwt= require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User is not Authorized");
            }
            console.log(decoded);
            req.user = decoded.user;
            next();
        });
    }
    else {
        res.status(401);
        throw new Error("Token is missing or invalid");
    }
});

module.exports = validateToken;