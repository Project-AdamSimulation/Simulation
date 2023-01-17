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
exports.generateRandomTopic = void 0;
const openAI_1 = __importDefault(require("../../config/openAI"));
const topic_1 = require("../../prompts/topic");
const generateRandomTopic = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield openAI_1.default.createCompletion({
        model: "text-davinci-003",
        prompt: topic_1.RANDOM_TOPIC,
        temperature: 0.9,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"],
    });
    if (response.status == 200) {
        const topic = response.data.choices[0].text;
        return topic.substring(1);
    }
    else {
        throw Error(`Failed due to Response Status: ${response.status}`);
    }
});
exports.generateRandomTopic = generateRandomTopic;
