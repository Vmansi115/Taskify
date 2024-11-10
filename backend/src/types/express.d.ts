const { Session } = require('express-session');
const { User } = require('./types');
const { otp } = require('./types');

declare module 'express' {
    interface Request {
        session: Session & Partial<SessionData> & { user: User } & {user: otp}; // Customize as per your session configuration
    }
}
