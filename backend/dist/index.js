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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const connectDB_js_1 = __importDefault(require("./lib/connectDB.js"));
const userRoute_js_1 = __importDefault(require("./routes/userRoute.js"));
const activityRoute_js_1 = __importDefault(require("./routes/activityRoute.js"));
const error_js_1 = __importDefault(require("./middleware/error.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
// routes
app.use("/api/v1/user", userRoute_js_1.default);
app.use("/api/v1/activity", activityRoute_js_1.default);
// error middleware
app.use(error_js_1.default);
const port = process.env.PORT || 8000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (process.env.MONGO_URL) {
            yield (0, connectDB_js_1.default)(process.env.MONGO_URL);
            app.listen(port, () => console.log(`Server is runnnning at http://localhost:${port}`));
        }
    }
    catch (error) {
        console.log(error);
    }
});
start();
