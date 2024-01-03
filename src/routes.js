const { Router } = require('express');

// controller import
const registerUser = require('./controllers/users/userSignup');
const loginUser = require('./controllers/users/userSignin')
const loginAdmin = require('./controllers/admin/adminSignIn')
const addNewRequest = require('./controllers/requests/newRequests')
const editRequest = require('./controllers/requests/editRequests')
const getAllRequestByUser = require('./controllers/requests/allUserRequest');
const getSingleRequestByUser = require('./controllers/requests/singleUserRequest');
const deleteUserRequest = require('./controllers/requests/deleteRequest');
const getAllRequests = require('./controllers/admin/getAllRequests');
const getSingleRequest = require('./controllers/admin/getSingleRequest');
const getAllUsers = require('./controllers/admin/getAllUsers');
const changeStatus = require('./controllers/admin/changeStatus');




// middleware import
const userSignupMiddleware = require('./middleware/users/userSignupMiddleware');
const adminSigninMiddleware = require('./middleware/admin/adminSigninMiddleware');
const userSigninMiddleware = require('./middleware/users/userSigninMiddleware');
const apiAuth = require('./middleware/api/auth')
const adminApiAuth = require('./middleware/api/adminAuth')
const newRequestsMiddleware = require('./middleware/requests/newRequestsMiddleware');
const changeStatusMiddleware = require('./middleware/admin/checkStatus');
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

app.put('/request/:id', apiAuth, newRequestsMiddleware,  editRequest);
app.get('/request', apiAuth, getAllRequestByUser);
app.get('/request/:id',apiAuth, getSingleRequestByUser);
app.delete('/request/:id', apiAuth, deleteUserRequest);

app.get('/admin/request', adminApiAuth, getAllRequests);
app.get('/admin/request/:id', adminApiAuth, getSingleRequest);
app.get('/admin/users', adminApiAuth, getAllUsers);
app.put('/admin/request/:id', adminApiAuth, changeStatusMiddleware, changeStatus);


module.exports = app;
