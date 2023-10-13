const { Router } = require('express');

// controller import
const registerUser = require('./controllers/users/userSignup');
const loginUser = require('./controllers/users/userSignin')
const loginAdmin = require('./controllers/admin/adminSignIn')
const addNewRequest = require('./controllers/requests/newRequests')
const editRequest = require('./controllers/requests/editRequests')


// middleware import
const userSignupMiddleware = require('./middleware/users/userSignupMiddleware');
const adminSigninMiddleware = require('./middleware/admin/adminSigninMiddleware');
const userSigninMiddleware = require('./middleware/users/userSigninMiddleware');
const apiAuth = require('./middleware/api/auth')
const newRequestsMiddleware = require('./middleware/requests/newRequestsMiddleware');
const editNewRequestsMiddleware = require('./middleware/requests/editRequestMiddleware')

const app = Router();

app.post('/user/signup', userSignupMiddleware, registerUser);

app.post('/user/signin', userSigninMiddleware, loginUser);

app.post('/admin/signin', adminSigninMiddleware, loginAdmin);

app.post(
    '/request', 
    apiAuth,
    newRequestsMiddleware, 
    addNewRequest
);

app.put('/request/:id', apiAuth, editNewRequestsMiddleware,  editRequest);

module.exports = app;
