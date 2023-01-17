import openai from "../config/openAI";
import { BATCH_SIZE, TALK_BATCH_SIZE, TALK_DELAY } from "../constants";
import { randomSelection } from "../entropy/randomSelection";
import Human from "../human";
import {
  COMMUNITY_ADD,
  COMMUNITY_CHANGE_SUBJECT,
  COMMUNITY_INIT,
  COMMUNITY_ONGOING,
  COMMUNITY_REMOVE,
} from "../prompts/community";
import { Actions } from "./actions";
import { delay } from "./helpers/delay";
import { generateRandomTopic } from "./helpers/genRandTopic";

const NATURAL_ACTIONS = [Actions.TALK];
const POSSIBLE_ACTIONS = [Actions.ADD, Actions.REMOVE, Actions.CHANGE];

class Commmunity {
  private members: Human[];
  private possibleMembers: Human[];
  private prompt: string = "";
  private conversationHistory: string[] = [];
  private naturalAction = true;
  private naturalActionCount = 0;

  public constructor(
    possibleMembers: Human[],
    initialMembers?: Human[],
    topic?: string
  ) {
    this.possibleMembers = possibleMembers;
    if (!initialMembers) initialMembers = randomSelection(possibleMembers);
    this.members = initialMembers;
    if (topic)
      this.prompt = COMMUNITY_INIT({
        initMembers: initialMembers,
        topic: topic,
      });
  }

  // Batch control

  private handleBatchControl() {
    if (this.conversationHistory.length === BATCH_SIZE) {
      this.prompt = COMMUNITY_ONGOING({
        members: this.members,
        prevConversation: this.conversationHistory.join("\n\n"),
      });
      this.conversationHistory = [];
    }
  }

  // First layer between open ai and the simulation

  private async generateResponse() {
    // logging prompt
    // console.log("------------- Prompt ---------------");
    // console.log(this.prompt);
    // console.log("------------------------------------");
    const response = await openai.createCompletion({
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
      return dialogue!.substring(1);
    } else {
      throw Error(`Failed due to Response Status: ${response.status}`);
    }
  }

  // Random topic init

  private async initRandomTopic() {
    const topic = await generateRandomTopic();
    this.prompt = COMMUNITY_INIT({
      initMembers: this.members,
      topic: topic,
    });
  }

  // Actions

  public async talk(speaker: Human) {
    this.handleBatchControl();
    const prevGen = this.prompt;
    this.prompt = this.prompt + `${speaker.name}:`;
    const dialogue = await this.generateResponse();
    if (dialogue !== "") {
      this.prompt = this.prompt + ` ${dialogue}\n\n`;

      this.conversationHistory.push(`${speaker.name}: ${dialogue}`);
      console.log(`${speaker.name}: ${dialogue}\n`);

      // delay
      await delay(TALK_DELAY);
    } else this.prompt = prevGen;
  }

  public async add(members: Human[], aware: Human[]) {
    this.members.push(...members);
    this.prompt =
      this.prompt +
      COMMUNITY_ADD({
        members: members,
        aware: aware,
      });
    const [speaker] = randomSelection(members, 1);
    await this.talk(speaker);
  }

  public async remove(pointMaker: Human, others: Human[]) {
    this.members.filter(
      (member) =>
        member.name != pointMaker.name &&
        others.every((other) => member.name != other.name)
    );
    this.prompt =
      this.prompt +
      COMMUNITY_REMOVE({
        pointMaker: pointMaker,
        others: others,
      });
    await this.talk(pointMaker);
  }

  public async changeTopic(changer: Human) {
    this.prompt =
      this.prompt +
      COMMUNITY_CHANGE_SUBJECT({
        changer: changer,
      });
    await this.talk(changer);
  }

  public async simulate() {
    if (this.prompt === "") await this.initRandomTopic();
    while (this.members.length != 0) {
      console.log("members:", this.members.length);
      // Randomly select an action
      const [action] = this.naturalAction
        ? randomSelection(NATURAL_ACTIONS, 1)
        : randomSelection(POSSIBLE_ACTIONS, 1);

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

      switch (action) {
        case Actions.TALK:
          for (let i = 0; i < TALK_BATCH_SIZE; i++) {
            const [speaker] = randomSelection(this.members, 1);
            await this.talk(speaker);
          }
          break;

        case Actions.ADD:
          // console.log("Adding ....");
          const potentialMembers = [];

          // TODO: to be optimized
          for (let possibleMember of this.possibleMembers) {
            if (
              !this.members.some(
                (member) => member.name === possibleMember.name
              )
            )
              potentialMembers.push(possibleMember);
          }

          // TODO: to be optimized, implement removal of Addition action from
          // POSSIBLE_ACTIONS here, also make sure to add Addition action
          // when potentialMembers are more than 0
          if (potentialMembers.length === 0) break;

          const members = randomSelection(potentialMembers);
          const aware = randomSelection(members);
          await this.add(members, aware);
          break;

        case Actions.REMOVE:
          // console.log("Removing ....");
          const others = randomSelection(this.members);
          // no need to randomly generate a pointMaker
          // randomness is already introduced in computing others
          // further randomness to generate a pointmaker doesn't make sense
          const pointMaker = others.shift();
          await this.remove(pointMaker!, others);
          break;

        case Actions.CHANGE:
          // console.log("Changing ....");
          const [changer] = randomSelection(this.members, 1);
          await this.changeTopic(changer);
          break;
      }
    }
  }
}

export default Commmunity;
