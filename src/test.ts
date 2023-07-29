import Commmunity from "./Community";
import Human from "./human";

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

const Lakshya = new Human(
  "Lakshya",
  [
    "Lakshya likes chicks",
    "Lakshya is very determined about his work",
    "Lakshya can cook",
    "Lakshya has OCD",
  ]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n")
);

const Aadeesh = new Human(
  "Aadeesh",
  [
    "Aadeesh's nickname is Panda",
    "Aadeesh likes comic books",
    "Aadeesh is funny",
    "Aadeesh can sometimes be lazy",
  ]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n")
);

const Tathagat = new Human(
  "Tathagat",
  [
    "Tathagat is a very secretive individual",
    "Tathagat watches and plays every sport",
    "Tathagat can sometimes be stubborn",
    "Tathagat likes punjabi music",
  ]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n")
);

const Devansh = new Human(
  "Devansh",
  [
    "Devansh is a sigma male",
    "Devansh is punctual",
    "Devansh is a one girl man",
    "Devansh sings well",
  ]
    .map((desc, i) => `${i + 1}. ${desc}`)
    .join("\n")
);

const community = new Commmunity(
  [Lakshya, Aadeesh, Tathagat, Devansh],
  (speakerName, dialogue) => {
    console.log(`${speakerName}: ${dialogue}`);
  },
  "meaningful relationships or just hookups",
  [Lakshya, Aadeesh]
);

community.simulate();
