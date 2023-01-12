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

const Adam = new Human(
  "Adam",
  "You are a programmer who has just learned about roko's basilisk"
);

const Eve = new Human(
  "eve",
  "You are a programmer who has just learned about roko's eve"
);

const Lakshya = new Human(
  "Lakshya",
  "You are a programmer who has just learned about roko's eve"
);

const Aadeesh = new Human(
  "Aadeesh",
  "You are a programmer who has just learned about roko's eve"
);

const community = new Commmunity([Adam, Eve, Lakshya, Aadeesh]);

community.simulate();
