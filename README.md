# The Backend for Project Adam Simulation

Adam Simulation is a **Thought Simulator that chains conversational LLM Thoughts together**. Simulations can be personal conversations or conversations within a group. You can provide names and descriptions of participants in a group through a frontend react application as shown below. Try for yourself in the demo [here](https://project-adamsimulation.github.io/adam-frontend/).

## Walkthrough of the demo:
  1. The user enters the name and description of a member by clicking the add button.
  
  <img width="893" alt="Screenshot 2023-08-22 at 3 18 30 PM" src="https://github.com/Project-AdamSimulation/adam-frontend/assets/83650351/e7b205b1-1c49-42f1-807f-39708872e548">
  <img width="893" alt="Screenshot 2023-08-22 at 3 19 02 PM" src="https://github.com/Project-AdamSimulation/adam-frontend/assets/83650351/b7b32207-4e97-490d-a597-9c16a2158599">
  
  2. After adding the names and descriptions for all the members, the user can click the submit button to start the simulation.
The project then runs the simulation on a backend server which streams the conversation to the frontend using a websocket connection.

## Run the backend locally

1. Generate your `<OPENAI API KEY>` from the [Open AI API](https://openai.com/blog/openai-api) and paste it in [/src/constants/index.ts](/src/constants/index.ts):

   ```bash
   export const OPENAI_API_KEY = "<OPENAI API KEY>";

2. Install the required dependencies:

   ```bash
   yarn

3. To test the simulation edit the topic and members in a group in [/src/test.ts](/src/test.ts), then run:

   ```bash
   yarn test

4. To run the Backend Websocket Server:

   ```bash
   yarn dev

## Some Backstory

[Lakshya Gupta](https://github.com/laytoder) and [Aadeesh Sharma](https://github.com/Aaddy-1) had the idea for this project when they were thinking about **train of thought**, and how one thought can lead to other eventually inventing novel ideas. We wanted to replicate that process using an LLM such as **OpenAI's GPT-3** by enabling the LLM to talk to itself.

While the project itself does have limited practical use, We still worked on it as an interesting experiment trying to simulate thoughts using LLMs and essentially replicate consciousness within them, We also saw it as a learning opportunity to explore **LLMs** **GPT-3** and **prompt engineering**.

Here is an example of a conversation between 5 members in a group.

<img width="1100" alt="Screenshot 2023-08-22 at 3 35 03 PM" src="https://github.com/Project-AdamSimulation/adam-frontend/assets/83650351/8f22b51f-db9a-456f-b9a4-d5bf6735707a">

## Contributors
  1. [Lakshya Gupta](https://github.com/laytoder)
  2. [Aadeesh Sharma](https://github.com/Aaddy-1)
