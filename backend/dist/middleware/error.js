"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((items) => items.message).join(',');
    }
    console.log(err);
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.default = errorMiddleware;
