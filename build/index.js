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
const Adam = new human_1.default("Adam", "You are a programmer who has just learned about roko's basilisk");
const Eve = new human_1.default("eve", "You are a programmer who has just learned about roko's eve");
const Lakshya = new human_1.default("Lakshya", "You are a programmer who has just learned about roko's eve");
const Aadeesh = new human_1.default("Aadeesh", "You are a programmer who has just learned about roko's eve");
const community = new Community_1.default([Adam, Eve, Lakshya, Aadeesh]);
community.simulate();
