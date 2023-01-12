"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
const delay = (interval) => {
    return new Promise((resolve, reject) => {
        try {
            setTimeout(resolve, interval);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.delay = delay;
