const jwt = require('jsonwebtoken');

function getToken(req) {
    const auth = req.get("authorization");
    if (auth && auth.startsWith("Bearer ")) {
        return auth.replace("Bearer ", "");
    }
    return null;
}

module.exports = (req, res, next) => {
    try {
        const token = getToken(req);
        if (!token) {
            return res.status(401).json({
                message: 'Access denied'
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({
            message: 'Invalid token'
        });
    }
}