"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserActivities = exports.currentUser = exports.logoutUser = exports.loginUser = exports.signUpUser = void 0;
const catchAsyncError_1 = __importDefault(require("../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../lib/errorHandler"));
const user_1 = __importDefault(require("../model/user"));
const sendToken_1 = require("../lib/sendToken");
const activity_1 = __importDefault(require("../model/activity"));
exports.signUpUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new errorHandler_1.default("please provide all required values", 400));
    }
    const emailExists = yield user_1.default.findOne({ email });
    if (emailExists) {
        return next(new errorHandler_1.default("User already exists with this Email", 400));
    }
    const user = yield user_1.default.create({ name, email, password });
    (0, sendToken_1.sendToken)(user, 200, res);
}));
exports.loginUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new errorHandler_1.default("please provide email and password", 400));
    }
    const user = yield user_1.default.findOne({ email }).select("+password");
    if (!user) {
        return next(new errorHandler_1.default("Invalid  Email or Password", 401));
    }
    const verifyPassword = yield user.comparePassword(password);
    if (!verifyPassword) {
        return next(new errorHandler_1.default("Invalid  Email or Password", 401));
    }
    (0, sendToken_1.sendToken)(user, 200, res);
}));
exports.logoutUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
}));
exports.currentUser = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new errorHandler_1.default("User not found", 401));
    }
    const user = yield user_1.default.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    });
}));
exports.getUserActivities = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new errorHandler_1.default("You are not Authenticated ", 401));
    }
    const { id: userId } = req.params;
    if (!userId || userId !== req.user._id.toString()) {
        return next(new errorHandler_1.default("You are not Authenticated ", 401));
    }
    ;
    const activities = yield activity_1.default.find({ user: userId });
    res.status(200).json({
        success: true,
        activities,
    });
}));
