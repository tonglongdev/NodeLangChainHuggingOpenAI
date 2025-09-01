import { OpenAI } from "openai";

const openai = new OpenAI();

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "Limit response in 10 words or less",
  },
];

const createChat = async () => {
  const response = await openai.chat.completions.create({
    model: "gpt-5-nano",
    messages: context,
  });
  const responseMessage = response.choices[0].message;
  context.push(responseMessage);
  console.log(response.choices[0].message.content);
};

// process.stdin.addListener is used to read user input from the command line
process.stdin.addListener("data", async (input) => {
  const userInput = input.toString().trim();
  context.push({
    role: "user",
    content: userInput,
  });
  await createChat();
});
