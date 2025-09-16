import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  modelName: "gpt-5-nano",
  temperature: 0.8,
  maxTokens: 10,
});

const fromTemplate = async () => {
  const prompt = ChatPromptTemplate.fromTemplate(
    "Write a summary of the movie {movieName}."
  );

  // const inceptionPrompt = await prompt.format({
  //   movieName: "Inception",
  // });

  // console.log(inceptionPrompt);

  // creating chain: connecting model with prompt
  const chain = prompt.pipe(model);
  const response = await chain.invoke({
    movieName: "inception",
  });
  console.log(response.content);
};

const fromMessage = async () => {
  // drawback: fromMessage does not have type checking
  // but it will throw error on run time
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "Write a summary of the movie {movieName}."],
    ["user", "{movieName}"],
  ]);

  const chain = prompt.pipe(model);
  const response = await chain.invoke({
    movieName: "inception",
  });
  console.log(response.content);
};

// fromTemplate();

fromMessage();
