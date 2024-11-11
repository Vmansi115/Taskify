"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Ensure the correct prototype is used for extending built-in Error
        Object.setPrototypeOf(this, ErrorHandler.prototype);
    }
}
exports.default = ErrorHandler;
