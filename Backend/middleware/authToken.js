const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return res.status(401).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            // Setting userId from decoded token
            req.userId = decoded?._id;
            console.log("Authenticated User ID:", req.userId);
            next();
        });
    } catch (err) {
        console.error("AuthToken Error:", err);
        res.status(400).json({
            message: err.message || 'Authentication error',
            error: true,
            success: false
        });
    }
}

module.exports = authToken;
