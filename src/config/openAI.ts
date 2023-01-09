import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default openai;
