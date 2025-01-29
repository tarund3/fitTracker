const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    console.log("🔹 Authorization header:", req.header('Authorization'));

    const fullHeader = req.header('Authorization');
    if (!fullHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const parts = fullHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            console.log("🔸 Token format invalid:", fullHeader);
            return res.status(401).json({ msg: 'Token format invalid' });
        }
        
        const token = parts[1];
        console.log("🔹 Extracted Token:", token);

        console.log("🔹 JWT_SECRET in authMiddleware:", process.env.JWT_SECRET);
        
        // Verify Token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Decoded Token:", decoded);

        req.user = decoded.user; // Attach user data to request
        next();
    } catch (err) {
        console.error('❌ Token verification failed:', err.message);
        return res.status(401).json({ msg: 'Token is not valid' });
    }
};
