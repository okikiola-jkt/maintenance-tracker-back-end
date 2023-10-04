const { Router } = require('express');

// controller import
const registerUser = require('./controllers/users/userSignup');
const loginUser = require('./controllers/users/userSignin')
const loginAdmin = require('./controllers/admin/adminSignIn')

// middleware import
const userSignupMiddleware = require('./middleware/users/userSignupMiddleware');

const app = Router();

app.post('/user/signup', userSignupMiddleware, registerUser);

app.get('/user/signin', loginUser);

app.get('/admin/signin', loginAdmin);

module.exports = app;
