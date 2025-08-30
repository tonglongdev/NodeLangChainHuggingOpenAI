import { OpenAI } from "openai";
import { encoding_for_model } from "tiktoken";

const client = new OpenAI();
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const context: OpenAI.Responses.ResponseInput = [
  {
    role: "system",
    content: "Limit response in 10 words or less",
  },
];

const createChat = async () => {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: context,
  });
  const responseMessage = response.output[1] || {
    role: "assistant",
    content: "No response",
  };
  context.push(responseMessage);
};

// process.stdin.addListener is used to read user input from the command line
process.stdin.on("data", async (input) => {
  const userInput = input.toString().trim();
  context.push({
    role: "user",
    content: userInput,
  });
  await createChat();
});

// const encodePrompt = (prompt: string) => {
//   // create an encoder for the model
//   const encoder = encoding_for_model("gpt-5-nano");
//   // encode the prompt
//   const tokens = encoder.encode(prompt);
//   console.log(tokens);
// };

// encodePrompt("How big is the moon?");
// console.log(main());
// console.log(response.output[0].content[0].text)
