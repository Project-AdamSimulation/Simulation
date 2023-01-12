"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const constants_1 = require("../constants");
const configuration = new openai_1.Configuration({
    apiKey: constants_1.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
exports.default = openai;
