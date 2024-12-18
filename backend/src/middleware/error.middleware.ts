const { Request, Response, NextFunction } = require('express');


const error = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error";
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = Object.values(err.errors).map((items: any) => items.message).join(',')
    }
    console.log(err)

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })

}

export default error;
