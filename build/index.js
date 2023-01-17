"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Community_1 = __importDefault(require("./Community"));
const human_1 = __importDefault(require("./human"));
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
const Lakshya = new human_1.default("Lakshya", [
    "Lakshya likes chicks",
    "Lakshya is very determined about his work",
    "Lakshya can cook",
    "Lakshya has OCD",
]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n"));
const Aadeesh = new human_1.default("Aadeesh", [
    "Aadeesh's nickname is Panda",
    "Aadeesh likes comic books",
    "Aadeesh is funny",
    "Aadeesh can sometimes be lazy",
]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n"));
const Tathagat = new human_1.default("Tathagat", [
    "Tathagat is a very secretive individual",
    "Tathagat watches and plays every sport",
    "Tathagat can sometimes be stubborn",
    "Tathagat likes punjabi music",
]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n"));
const Devansh = new human_1.default("Devansh", [
    "Devansh is a sigma male",
    "Devansh is punctual",
    "Devansh is a one girl man",
    "Devansh sings well",
]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n"));
const community = new Community_1.default([Lakshya, Aadeesh, Tathagat, Devansh], [Lakshya, Aadeesh], "meaningful relationships or just hookups");
community.simulate();
