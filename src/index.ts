import { OpenAI } from "openai";
import { encoding_for_model } from "tiktoken";

const client = new OpenAI();
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const prompt = "How big is the moon? Limit your response in 100 words or less.";
const sysOpt = "Start with greetings";
const main = async () => {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: [
      {
        role: "system",
        content: sysOpt,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 60,
    n: 2,
    frequency_penalty: 1.5,
    seed: 88888,
  });
};

const encodePrompt = (prompt: string) => {
  // create an encoder for the model
  const encoder = encoding_for_model("gpt-5-nano");
  // encode the prompt
  const tokens = encoder.encode(prompt);
  console.log(tokens);
};

encodePrompt("How big is the moon?");

// console.log(main());
// console.log(response.output[0].content[0].text)
