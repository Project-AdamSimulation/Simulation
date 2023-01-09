import { randomSelection } from "../entropy/randomSelection";
import Human from "../human";
import { COMMUNITY_INIT } from "../prompts/community";
import { generateRandomTopic } from "./helpers/genRandTopic";

class Commmunity {
  private members: Human[];
  private prompt: string = "";

  public constructor(initialMembers: Human[], topic?: string) {
    this.members = initialMembers;
    if (topic)
      this.prompt = COMMUNITY_INIT({
        initMembers: initialMembers,
        topic: topic,
      });
  }

  public async initRandomTopic() {
    const topic = await generateRandomTopic();
    this.prompt = COMMUNITY_INIT({
      initMembers: this.members,
      topic: topic,
    });
  }

  public add(member: Human) {
    this.members.push(member);
  }

  public simulate() {
    // Randomly select a member to speak
    const [speaker] = randomSelection(this.members, 1);
  }
}
