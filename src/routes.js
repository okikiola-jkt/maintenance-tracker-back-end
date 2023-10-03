const { Router } = require('express');

// controller import
const registerUser = require('./controllers/users/userSignup');

// middleware import
const userSignupMiddleware = require('./middleware/users/userSignupMiddleware');

const app = Router();

app.post('/user/signup', userSignupMiddleware, registerUser);

module.exports = app;
