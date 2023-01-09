import openai from "../config/openAI";
import { TALK_TO_ITSELF } from "../prompts/human";

export default class Human {
  private _name: string;
  private _desc: string;
  private prompt: string | null;

  public constructor(name: string, desc: string) {
    this._name = name;
    this._desc = desc;
    this.prompt = null;
  }

  public async talkToYourself(thoughtPrompt: string) {
    if (!this.prompt) {
      this.prompt = TALK_TO_ITSELF(this._name, this._desc, thoughtPrompt);
    }
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
      this.prompt = this.prompt + dialogue + "\n\nAdam:";
      return dialogue!.substring(1);
    } else {
      throw Error(`Failed due to Response Status: ${response.status}`);
    }
  }

  public endTalk() {
    this.prompt = null;
  }

  // Getters
  public get name() {
    return this._name;
  }

  public get desc() {
    return this._desc;
  }
}
