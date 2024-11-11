"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middleware/auth.js");
const user_js_1 = require("../controller/user.js");
const userRouter = express_1.default.Router();
// auth 
userRouter.route('/auth/signup').post(user_js_1.signUpUser);
userRouter.route('/auth/login').post(user_js_1.loginUser);
userRouter.route('/auth/logout').get(user_js_1.logoutUser);
userRouter.route('/me').get(auth_js_1.isAuthenticatedUser, user_js_1.currentUser);
userRouter.route('/activity/:id').get(auth_js_1.isAuthenticatedUser, user_js_1.getUserActivities);
exports.default = userRouter;
