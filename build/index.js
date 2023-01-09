"use strict";
// import Human from "./human";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const human_1 = __importDefault(require("./human"));
const community_1 = require("./prompts/community");
// async function simulate() {
//   console.log("simulation running");
//   const adam = new Human(
//     "Adam",
//     "You are a programmer who has just learned about roko's basilisk"
//   );
//   while (true) {
//     const dialogue = await adam.talkToYourself(
//       "Think about how you would protect yourself from roko's basilisk"
//     );
//     console.log(dialogue);
//   }
// }
// simulate();
const adam = new human_1.default("Adam", "You are a programmer who has just learned about roko's basilisk");
const eve = new human_1.default("eve", "You are a programmer who has just learned about roko's eve");
console.log((0, community_1.COMMUNITY_REMOVE)({
    pointMakers: [adam, eve],
    others: [new human_1.default("some", "some")],
}));
