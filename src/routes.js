const { Router } = require('express');

// controller import
const registerUser = require('./controllers/users/userSignup');
const loginUser = require('./controllers/users/userSignin')
const loginAdmin = require('./controllers/admin/adminSignIn')

// middleware import
const userSignupMiddleware = require('./middleware/users/userSignupMiddleware');
const adminSigninMiddleware = require('./middleware/admin/adminSigninMiddleware');
const userSigninMiddleware = require('./middleware/users/userSigninMiddleware');

const app = Router();

app.post('/user/signup', userSignupMiddleware, registerUser);

app.get('/user/signin', userSigninMiddleware, loginUser);

app.get('/admin/signin', adminSigninMiddleware, loginAdmin);

module.exports = app;
