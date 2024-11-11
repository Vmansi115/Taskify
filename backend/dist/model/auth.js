"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const activitySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "ongoing", "paused"],
        default: "pending",
    },
    totalActiveDuration: {
        type: Date,
        default: new Date(0),
    },
    lastResumedAt: {
        type: Date,
        default: new Date(0),
    },
    logs: [
        {
            action: {
                type: String,
                enum: ["pending", "completed", "ongoing", "paused"],
            },
            timestamp: {
                type: Date,
                default: new Date(),
            },
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model('Activity', activitySchema);
