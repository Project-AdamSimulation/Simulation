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
Object.defineProperty(exports, "__esModule", { value: true });
const randomSelection_1 = require("../entropy/randomSelection");
const community_1 = require("../prompts/community");
const genRandTopic_1 = require("./helpers/genRandTopic");
class Commmunity {
    constructor(initialMembers, topic) {
        this.prompt = "";
        this.members = initialMembers;
        if (topic)
            this.prompt = (0, community_1.COMMUNITY_INIT)({
                initMembers: initialMembers,
                topic: topic,
            });
    }
    initRandomTopic() {
        return __awaiter(this, void 0, void 0, function* () {
            const topic = yield (0, genRandTopic_1.generateRandomTopic)();
            this.prompt = (0, community_1.COMMUNITY_INIT)({
                initMembers: this.members,
                topic: topic,
            });
        });
    }
    add(member) {
        this.members.push(member);
    }
    simulate() {
        // Randomly select a member to speak
        const [speaker] = (0, randomSelection_1.randomSelection)(this.members, 1);
    }
}
