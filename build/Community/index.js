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
const constants_1 = require("../constants");
const randomSelection_1 = require("../entropy/randomSelection");
const community_1 = require("../prompts/community");
const actions_1 = require("./actions");
const genRandTopic_1 = require("./helpers/genRandTopic");
class Commmunity {
    constructor(possibleMembers, initialMembers, topic) {
        this.prompt = "";
        this.conversationHistory = [];
        this.possibleMembers = possibleMembers;
        if (!initialMembers)
            initialMembers = (0, randomSelection_1.randomSelection)(possibleMembers);
        this.members = initialMembers;
        if (topic)
            this.prompt = (0, community_1.COMMUNITY_INIT)({
                initMembers: initialMembers,
                topic: topic,
            });
    }
    // Batch control
    handleBatchControl() {
        if (this.conversationHistory.length === constants_1.BATCH_SIZE) {
            this.prompt = (0, community_1.COMMUNITY_ONGOING)({
                members: this.members,
                prevConversation: this.conversationHistory.join("\n\n"),
            });
            this.conversationHistory = [];
        }
    }
    // First layer between open ai and the simulation
    generateResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleBatchControl();
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
                return dialogue.substring(1);
            }
            else {
                throw Error(`Failed due to Response Status: ${response.status}`);
            }
        });
    }
    // Random topic init
    initRandomTopic() {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield (0, genRandTopic_1.generateRandomTopic)();
            this.prompt = (0, community_1.COMMUNITY_INIT)({
                initMembers: this.members,
                topic: topic,
            });
        });
    }
    // Actions
    talk(speaker) {
        return __awaiter(this, void 0, void 0, function* () {
            this.prompt = this.prompt + `${speaker.name}:`;
            const dialogue = yield this.generateResponse();
            this.prompt = this.prompt + ` ${dialogue}\n\n`;
            this.conversationHistory.push(`${speaker.name}: ${dialogue}\n\n`);
            console.log(`${speaker.name}: ${dialogue}`);
        });
    }
    add(members, aware) {
        this.members.push(...members);
        this.prompt =
            this.prompt +
                (0, community_1.COMMUNITY_ADD)({
                    members: members,
                    aware: aware,
                });
        const [speaker] = (0, randomSelection_1.randomSelection)(members, 1);
        this.talk(speaker);
    }
    remove(pointMaker, others) {
        this.members.filter((member) => member.name != pointMaker.name &&
            others.every((other) => member.name != other.name));
        this.prompt =
            this.prompt +
                (0, community_1.COMMUNITY_REMOVE)({
                    pointMaker: pointMaker,
                    others: others,
                });
        this.talk(pointMaker);
    }
    changeTopic(changer) {
        this.prompt =
            this.prompt +
                (0, community_1.COMMUNITY_CHANGE_SUBJECT)({
                    changer: changer,
                });
        this.talk(changer);
    }
    simulate() {
        if (this.prompt === "")
            this.initRandomTopic();
        while (true) {
            // Randomly select a action
            const [action] = (0, randomSelection_1.randomSelection)(Object.values(actions_1.Actions), 1);
            switch (action) {
                case actions_1.Actions.TALK:
                    for (let i = 0; i < constants_1.TALK_BATCH_SIZE; i++) {
                        const [speaker] = (0, randomSelection_1.randomSelection)(this.members, 1);
                        this.talk(speaker);
                    }
                    break;
                case actions_1.Actions.ADD:
                    const members = (0, randomSelection_1.randomSelection)(this.possibleMembers);
                    const aware = (0, randomSelection_1.randomSelection)(members);
                    this.add(members, aware);
                    break;
                case actions_1.Actions.REMOVE:
                    const others = (0, randomSelection_1.randomSelection)(this.members);
                    // no need to randomly generate a pointMaker
                    // randomness is already introduced in computing others
                    // further randomness to generate a pointmaker doesn't make sense
                    const pointMaker = others.shift();
                    this.remove(pointMaker, others);
                    break;
                case actions_1.Actions.CHANGE:
                    const [changer] = (0, randomSelection_1.randomSelection)(this.members, 1);
                    this.changeTopic(changer);
                    break;
            }
        }
    }
}
exports.default = Commmunity;
