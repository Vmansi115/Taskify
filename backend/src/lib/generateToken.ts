const { Response } = require("express");
const { TUser } = require("../types/user");
const dotenv = require("dotenv");

dotenv.config();

export const sendApiResponse = (user: TUser, statusCode: number, res: Response) => {
    const token = user.createJWT();
    const options = {
        httpOnly: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            token,
            user,
        });
};
