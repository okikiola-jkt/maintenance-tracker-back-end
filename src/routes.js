const { Router } = require('express');

// controller import
const registerUser = require('./controllers/users/userSignup');
const loginUser = require('./controllers/users/userSignin')

// middleware import
const userSignupMiddleware = require('./middleware/users/userSignupMiddleware');

const app = Router();

app.post('/user/signup', userSignupMiddleware, registerUser);

app.get('/user/signin', loginUser);

module.exports = app;
