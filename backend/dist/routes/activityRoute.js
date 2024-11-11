"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middleware/auth.js");
const activity_js_1 = require("../controller/activity.js");
const activityRouter = express_1.default.Router();
// auth 
activityRouter.route('/').post(auth_js_1.isAuthenticatedUser, activity_js_1.createActivity);
activityRouter.route('/:id').get(auth_js_1.isAuthenticatedUser, activity_js_1.getActivity).patch(auth_js_1.isAuthenticatedUser, activity_js_1.changeStatus).delete(auth_js_1.isAuthenticatedUser, activity_js_1.deleteActivity);
exports.default = activityRouter;
