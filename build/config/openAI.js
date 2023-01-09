"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: "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",
});
const openai = new openai_1.OpenAIApi(configuration);
exports.default = openai;
