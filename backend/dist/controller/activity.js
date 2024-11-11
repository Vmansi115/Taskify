"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.getActivity = exports.changeStatus = exports.createActivity = void 0;
const catchAsyncError_1 = __importDefault(require("../middleware/catchAsyncError"));
const errorHandler_1 = __importDefault(require("../lib/errorHandler"));
const activity_1 = __importDefault(require("../model/activity"));
exports.createActivity = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new errorHandler_1.default("You are not Authenticated ", 401));
    }
    const { name } = req.body;
    if (!name) {
        return next(new errorHandler_1.default("Please provide all required values", 400));
    }
    const logs = [{
            action: "pending",
            timestamp: new Date(),
        }];
    const activity = yield activity_1.default.create({ name, user: req.user._id, logs });
    res.status(201).json({
        success: true,
        activity,
    });
}));
exports.changeStatus = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new errorHandler_1.default("You are not Authenticated ", 401));
    }
    const { status } = req.body;
    const { id: activityId } = req.params;
    if (!status) {
        return next(new errorHandler_1.default("Please provide all required values", 400));
    }
    const activity = yield activity_1.default.findById(activityId);
    if (!activity) {
        return next(new errorHandler_1.default("Activity not found", 404));
    }
    if (status == "paused" || status == "completed") {
        if (activity.status != "ongoing") {
            return next(new errorHandler_1.default("You can only Pause or complete an ongoing activity", 400));
        }
        const lastResumedAt = new Date(activity.lastResumedAt).getTime();
        const duration = Date.now() - lastResumedAt;
        activity.totalActiveDuration.setTime(activity.totalActiveDuration.getTime() + duration);
    }
    if (status == "ongoing") {
        const existingActivity = yield activity_1.default.findOne({ user: req.user._id, status: "ongoing" });
        if (existingActivity) {
            return next(new errorHandler_1.default("Please pause or complete the current activity.", 400));
        }
        activity.lastResumedAt = new Date();
    }
    activity.status = status;
    activity.logs.push({ action: status, timestamp: new Date() });
    const updatedActivity = yield activity.save();
    res.status(200).json({
        success: true,
        activity: updatedActivity,
    });
}));
exports.getActivity = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new errorHandler_1.default("You are not Authenticated ", 401));
    }
    const { id: activityId } = req.params;
    const activity = yield activity_1.default.findById(activityId);
    if (!activity) {
        return next(new errorHandler_1.default("Activity not found", 404));
    }
    res.status(200).json({
        success: true,
        activity,
    });
}));
exports.deleteActivity = (0, catchAsyncError_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return next(new errorHandler_1.default("You are not Authenticated ", 401));
    }
    const { id: activityId } = req.params;
    yield activity_1.default.findByIdAndDelete(activityId);
    res.status(200).json({
        success: true,
        message: "Activity Deleted Successfully",
    });
}));
