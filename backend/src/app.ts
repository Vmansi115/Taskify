const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const userRouter = require('./routes/user.route');
const activityRouter = require('./routes/activity.route');
const error = require('./middleware/error.middleware');

const app= express();

app.use(cors({ origin: process.env.CROS_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/activity", activityRouter);

// error middleware
app.use(error);

export {app}
