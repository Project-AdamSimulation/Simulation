"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TALK_TO_ITSELF = void 0;
const TALK_TO_ITSELF = (name, desc, thoughtPrompt) => `Imagine you are a human whose name is ${name}. In the following task, you need to have a conversation with yourself. ${desc}. The conversation will be like your train of thought. You will be given a prompt to start your ideas. A dialogue in your conversation should be derived from previous dialogues. Generate at least 20 dialogues.\n\nPrompt: ${thoughtPrompt}.\n\n${name}:`;
exports.TALK_TO_ITSELF = TALK_TO_ITSELF;
