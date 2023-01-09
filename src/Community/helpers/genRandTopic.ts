import openai from "../../config/openAI";
import { RANDOM_TOPIC } from "../../prompts/topic";

export const generateRandomTopic = async () => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: RANDOM_TOPIC,
    temperature: 0.9,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });
  if (response.status == 200) {
    const topic = response.data.choices[0].text;
    return topic!;
  } else {
    throw Error(`Failed due to Response Status: ${response.status}`);
  }
};
