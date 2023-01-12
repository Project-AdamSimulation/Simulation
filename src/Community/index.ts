import openai from "../config/openAI";
import { BATCH_SIZE, TALK_BATCH_SIZE } from "../constants";
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
import { generateRandomTopic } from "./helpers/genRandTopic";

class Commmunity {
  private members: Human[];
  private possibleMembers: Human[];
  private prompt: string = "";
  private conversationHistory: string[] = [];

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
    this.handleBatchControl();
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
    this.prompt = this.prompt + `${speaker.name}:`;
    const dialogue = await this.generateResponse();
    this.prompt = this.prompt + ` ${dialogue}\n\n`;

    this.conversationHistory.push(`${speaker.name}: ${dialogue}\n\n`);
    console.log(`${speaker.name}: ${dialogue}`);
  }

  public add(members: Human[], aware: Human[]) {
    this.members.push(...members);
    this.prompt =
      this.prompt +
      COMMUNITY_ADD({
        members: members,
        aware: aware,
      });
    const [speaker] = randomSelection(members, 1);
    this.talk(speaker);
  }

  public remove(pointMaker: Human, others: Human[]) {
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
    this.talk(pointMaker);
  }

  public changeTopic(changer: Human) {
    this.prompt =
      this.prompt +
      COMMUNITY_CHANGE_SUBJECT({
        changer: changer,
      });
    this.talk(changer);
  }

  public simulate() {
    if (this.prompt === "") this.initRandomTopic();
    while (true) {
      // Randomly select a action
      const [action] = randomSelection(Object.values(Actions), 1);

      switch (action) {
        case Actions.TALK:
          for (let i = 0; i < TALK_BATCH_SIZE; i++) {
            const [speaker] = randomSelection(this.members, 1);
            this.talk(speaker);
          }
          break;

        case Actions.ADD:
          const members = randomSelection(this.possibleMembers);
          const aware = randomSelection(members);
          this.add(members, aware);
          break;

        case Actions.REMOVE:
          const others = randomSelection(this.members);
          // no need to randomly generate a pointMaker
          // randomness is already introduced in computing others
          // further randomness to generate a pointmaker doesn't make sense
          const pointMaker = others.shift();
          this.remove(pointMaker!, others);
          break;

        case Actions.CHANGE:
          const [changer] = randomSelection(this.members, 1);
          this.changeTopic(changer);
          break;
      }
    }
  }
}

export default Commmunity;
