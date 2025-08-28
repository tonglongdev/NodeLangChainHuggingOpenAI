import { OpenAI } from "openai";

const client = new OpenAI();
// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

const prompt = "How big is the moon? Limit your response in 100 words or less.";
const sysOpt = "";
const main = async () => {
  const response = await client.responses.create({
    model: "gpt-5-nano",
    input: [
      // {
      //   role: "system",
      //   content: sysOpt,
      // },
      {
        role: "user",
        content: prompt,
      },
    ],
    //   max_tokens: 60,
    //   n: 2,
    //   frequency_penalty: 1.5,
    //   seed: 88888,
  });
};

console.log(main());
// console.log(response.output[0].content[0].text)
