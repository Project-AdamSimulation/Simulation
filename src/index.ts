// import Human from "./human";

import Human from "./human";
import {
  COMMUNITY_ADD,
  COMMUNITY_INIT,
  COMMUNITY_ONGOING,
  COMMUNITY_REMOVE,
} from "./prompts/community";

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

const adam = new Human(
  "Adam",
  "You are a programmer who has just learned about roko's basilisk"
);

const eve = new Human(
  "eve",
  "You are a programmer who has just learned about roko's eve"
);

console.log(
  COMMUNITY_REMOVE({
    pointMakers: [adam, eve],
    others: [new Human("some", "some")],
  })
);
