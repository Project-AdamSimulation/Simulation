"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, json, timestamp } = winston_1.default.format;
const errorFilter = winston_1.default.format((info, opts) => {
    return info.level === 'error' ? info : false;
});
const infoFilter = winston_1.default.format((info, opts) => {
    return info.level === 'info' ? info : false;
});
const debugFilter = winston_1.default.format((info, opts) => {
    return info.level === 'debug' ? info : false;
});
exports.logger = winston_1.default.createLogger({
    levels: winston_1.default.config.npm.levels,
    transports: [
        // Error Log
        new winston_1.default.transports.File({ filename: './logs/app-error.log', level: 'error', format: combine(errorFilter(), timestamp(), json()), }),
        // Messages log
        new winston_1.default.transports.File({ filename: './logs/app-info.log', level: 'info', format: combine(infoFilter(), timestamp(), json()), }),
        // MemberCount, Actions Log
        new winston_1.default.transports.File({ filename: './logs/app-debug.log', level: 'debug', format: combine(debugFilter(), timestamp(), json()), }),
    ],
    exitOnError: false
});
