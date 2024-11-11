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
exports.isAuthenticatedUser = void 0;
const errorHandler_js_1 = __importDefault(require("../lib/errorHandler.js"));
const catchAsyncError_js_1 = __importDefault(require("./catchAsyncError.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_js_1 = __importDefault(require("../model/user.js"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.isAuthenticatedUser = (0, catchAsyncError_js_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.cookies)
    const { token } = req.cookies;
    if (!token) {
        return next(new errorHandler_js_1.default("Please Login to access this resource", 401));
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    console.log(decodedData);
    const user = yield user_js_1.default.findOne({ _id: decodedData.id });
    if (!user) {
        return next(new errorHandler_js_1.default("user not found with associated token", 401));
    }
    req.user = user;
    next();
}));
