const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth.middleware');
const { createActivity, getActivity, changeStatus, deleteActivity } = require('../controller/activity.controller');

const activityRouter = express.Router();

// Authentication middleware
activityRouter.use(isAuthenticatedUser);

// Routes
activityRouter.route('/')
    .post(createActivity);

activityRouter.route('/:id')
    .get(getActivity)
    .patch(changeStatus)
    .delete(deleteActivity);

export default activityRouter;
