const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth.middleware');
// const { verifyOtp } = require('../middleware/otp.middleware');
const { signUpUser, loginUser, logoutUser, currentUser, getUserActivities } = require('../controller/user.controller');

// Your other code here

const userRouter = express.Router();

// Authentication routes
userRouter.post('/auth/signup', signUpUser); // Route with OTP verification middleware
userRouter.post('/auth/login', loginUser);
userRouter.get('/auth/logout', logoutUser);

// User routes
userRouter.get('/me', isAuthenticatedUser, currentUser);
userRouter.get('/activity/:id', isAuthenticatedUser, getUserActivities);

// // Password management routes
// userRouter.post('/auth/forgot-password', forgotPassword); // Initiates password reset process
// userRouter.post('/auth/reset-password', resetPassword); // Resets password after OTP verification



export default userRouter;
