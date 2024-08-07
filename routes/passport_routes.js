const {
    passport
} = require('../config/passport')
const router = require('express').Router()

const jwt = require('jsonwebtoken');

// Routes
router.get('/', passport.authenticate('auth0', {
    scope: 'openid email profile'
}));

router.get('/callback', passport.authenticate('auth0', {
    failureRedirect: '/'
}), (req, res) => {
    console.log(req.user, "req.user")
    const token = jwt.sign(req.user, process.env.JWT_SECRET);
    res.json({
        token
    });
});

router.get('/profile', (req, res) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    console.log(req.headers.authorization, "req")
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({
            message: 'Unauthorized'
        });
        res.json(decoded);
    });
});

module.exports = {
    passportRoutes: router
}