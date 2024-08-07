require('dotenv').config();
const express = require('express');
const session = require('express-session');




require('./config/database');
const {
    passport
} = require('./config/passport')

const {
    passportRoutes
} = require('./routes/passport_routes')



const app = express();
const port = process.env.PORT || 3000;

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    } // Set secure to true if using HTTPS
}));

//Passport Initialize
app.use(passport.initialize());
app.use(passport.session());


//Routes
app.use('/api/v1', passportRoutes);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});