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
const openAI_1 = __importDefault(require("../config/openAI"));
const human_1 = require("../prompts/human");
class Human {
    constructor(name, desc) {
        this._name = name;
        this._desc = desc;
        this.prompt = null;
    }
    talkToYourself(thoughtPrompt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.prompt) {
                this.prompt = (0, human_1.TALK_TO_ITSELF)(this._name, this._desc, thoughtPrompt);
            }
            const response = yield openAI_1.default.createCompletion({
                model: "text-davinci-003",
                prompt: this.prompt,
                temperature: 0.9,
                max_tokens: 2000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop: ["\n"],
            });
            if (response.status == 200) {
                const dialogue = response.data.choices[0].text;
                this.prompt = this.prompt + dialogue + "\n\nAdam:";
                return dialogue.substring(1);
            }
            else {
                throw Error(`Failed due to Response Status: ${response.status}`);
            }
        });
    }
    endTalk() {
        this.prompt = null;
    }
    // Getters
    get name() {
        return this._name;
    }
    get desc() {
        return this._desc;
    }
}
exports.default = Human;
