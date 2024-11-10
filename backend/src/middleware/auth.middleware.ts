const { Request, Response, NextFunction } = require('express');
const jwt = require('jsonwebtoken');
const { JwtPayload } = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../model/user.model');
const ErrorHandler = require('../lib/errorHandler');
const asyncHandler = require('../lib/asyncHandler');
const { TUser } = require('../types/user');

// Your other code here

dotenv.config();

interface CustomJwtPayload extends Record<string,any> {
    id: string;
    accessToken: string;
}

// Extend Express Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: TUser;
        }
    }
}

export const isAuthenticatedUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler("Authorization failed: Please log in to access this service", 401));
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined.");
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
        console.log(decodedData);

        const user = await User.findOne({ _id: decodedData.id });

        if (!user) {
            return next(new ErrorHandler("Authorization failed: User not found", 401));
        }

        req.user = user as TUser;
        next();
    } catch (error) {
        return next(new ErrorHandler("Authorization failed: Invalid token", 401));
    }
});
