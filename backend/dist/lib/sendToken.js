"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendToken = (user, statusCode, res) => {
    let token = user.createJWT();
    const options = {
        httpOnly: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};
exports.sendToken = sendToken;
