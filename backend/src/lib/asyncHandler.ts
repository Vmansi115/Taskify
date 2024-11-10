const { Request, Response, NextFunction } = require('express');

const asyncHandler = (asyncFunction: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    Promise.resolve(asyncFunction(req, res, next)).catch(next);
};

export default asyncHandler;
