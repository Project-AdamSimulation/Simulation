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
const delay_1 = require("./helpers/delay");
const genRandTopic_1 = require("./helpers/genRandTopic");
const logger_1 = require("./helpers/logger");
const NATURAL_ACTIONS = [actions_1.Actions.TALK];
const POSSIBLE_ACTIONS = [actions_1.Actions.ADD, actions_1.Actions.REMOVE, actions_1.Actions.CHANGE];
class Commmunity {
    constructor(possibleMembers, initialMembers, topic) {
        this.prompt = "";
        this.conversationHistory = [];
        this.naturalAction = true;
        this.naturalActionCount = 0;
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
            // logging prompt
            // console.log("------------- Prompt ---------------");
            // console.log(this.prompt);
            // console.log("------------------------------------");
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
                logger_1.logger.error(`Failed due to Response Status: ${response.status}`);
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
            this.handleBatchControl();
            const prevGen = this.prompt;
            this.prompt = this.prompt + `${speaker.name}:`;
            const dialogue = yield this.generateResponse();
            if (dialogue !== "") {
                this.prompt = this.prompt + ` ${dialogue}\n\n`;
                this.conversationHistory.push(`${speaker.name}: ${dialogue}`);
                logger_1.logger.info(`${speaker.name}: ${dialogue}\n`);
                console.log(`${speaker.name}: ${dialogue}\n`);
                // delay
                yield (0, delay_1.delay)(constants_1.TALK_DELAY);
            }
            else
                this.prompt = prevGen;
        });
    }
    add(members, aware) {
        return __awaiter(this, void 0, void 0, function* () {
            this.members.push(...members);
            this.prompt =
                this.prompt +
                    (0, community_1.COMMUNITY_ADD)({
                        members: members,
                        aware: aware,
                    });
            const [speaker] = (0, randomSelection_1.randomSelection)(members, 1);
            yield this.talk(speaker);
        });
    }
    remove(pointMaker, others) {
        return __awaiter(this, void 0, void 0, function* () {
            this.members.filter((member) => member.name != pointMaker.name &&
                others.every((other) => member.name != other.name));
            this.prompt =
                this.prompt +
                    (0, community_1.COMMUNITY_REMOVE)({
                        pointMaker: pointMaker,
                        others: others,
                    });
            yield this.talk(pointMaker);
        });
    }
    changeTopic(changer) {
        return __awaiter(this, void 0, void 0, function* () {
            this.prompt =
                this.prompt +
                    (0, community_1.COMMUNITY_CHANGE_SUBJECT)({
                        changer: changer,
                    });
            yield this.talk(changer);
        });
    }
    simulate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.prompt === "")
                yield this.initRandomTopic();
            while (this.members.length != 0) {
                // logger.debug("members:", this.members.length);
                console.log("members:", this.members.length);
                // Randomly select an action
                const [action] = this.naturalAction
                    ? (0, randomSelection_1.randomSelection)(NATURAL_ACTIONS, 1)
                    : (0, randomSelection_1.randomSelection)(POSSIBLE_ACTIONS, 1);
                // this.naturalAction
                //   ? console.log("natural action", action)
                //   : console.log("possible action", action);
                if (this.naturalAction) {
                    this.naturalActionCount++;
                    if (this.naturalActionCount == 4) {
                        this.naturalAction = false;
                        this.naturalActionCount = 0;
                    }
                }
                if (!this.naturalAction && !NATURAL_ACTIONS.includes(action))
                    this.naturalAction = true;
                // Prompt, members and action logger
                logger_1.logger.debug({ "members": this.members.length, "action:": action, "prompt:": this.prompt });
                switch (action) {
                    case actions_1.Actions.TALK:
                        for (let i = 0; i < constants_1.TALK_BATCH_SIZE; i++) {
                            const [speaker] = (0, randomSelection_1.randomSelection)(this.members, 1);
                            yield this.talk(speaker);
                        }
                        break;
                    case actions_1.Actions.ADD:
                        // console.log("Adding ....");
                        const potentialMembers = [];
                        // TODO: to be optimized
                        for (let possibleMember of this.possibleMembers) {
                            if (!this.members.some((member) => member.name === possibleMember.name))
                                potentialMembers.push(possibleMember);
                        }
                        // TODO: to be optimized, implement removal of Addition action from
                        // POSSIBLE_ACTIONS here, also make sure to add Addition action
                        // when potentialMembers are more than 0
                        if (potentialMembers.length === 0)
                            break;
                        const members = (0, randomSelection_1.randomSelection)(potentialMembers);
                        const aware = (0, randomSelection_1.randomSelection)(members);
                        yield this.add(members, aware);
                        break;
                    case actions_1.Actions.REMOVE:
                        // console.log("Removing ....");
                        const others = (0, randomSelection_1.randomSelection)(this.members);
                        // no need to randomly generate a pointMaker
                        // randomness is already introduced in computing others
                        // further randomness to generate a pointmaker doesn't make sense
                        const pointMaker = others.shift();
                        yield this.remove(pointMaker, others);
                        break;
                    case actions_1.Actions.CHANGE:
                        // console.log("Changing ....");
                        const [changer] = (0, randomSelection_1.randomSelection)(this.members, 1);
                        yield this.changeTopic(changer);
                        break;
                }
            }
        });
    }
}
exports.default = Commmunity;
