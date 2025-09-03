import { OpenAI } from "openai";
const openai = new OpenAI();
const openAIModel = "gpt-5-nano";

const getCurrentTimeAndDate = () => {
  return new Date().toString();
};

const callOpenAIWithFunctionCalling = async () => {
  const context: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "Limit response in 10 words or less",
    },
    {
      role: "user",
      content: "what is the current date and time?",
    },
  ];

  const response = await openai.chat.completions.create({
    model: openAIModel,
    messages: context,
    tools: [
      {
        type: "function",
        function: {
          name: "getCurrentTimeAndDate",
          description: "Get the current time and date",
        },
      },
    ],
    tool_choice: "auto", // openai will decide which tool to use
  });
  console.log("First openai response:", response.choices[0].message.content);

  const shouldInvokeFunction =
    response.choices[0].finish_reason === "tool_calls";
  const toolCall = response.choices[0].message.tool_calls?.[0];

  if (!toolCall) {
    return;
  }
  if (shouldInvokeFunction) {
    if (toolCall?.type === "function") {
      const functionName = toolCall.function.name;

      if (functionName === "getCurrentTimeAndDate") {
        const functionResponse = getCurrentTimeAndDate();

        context.push(response.choices[0].message);
        context.push({
          role: "tool",
          content: functionResponse,
          tool_call_id: toolCall.id,
        });
      }
    }
  }
  const finalResponse = await openai.chat.completions.create({
    model: openAIModel,
    messages: context,
  });
  console.log(
    "Final OpenAI response:",
    finalResponse.choices[0].message.content
  );
};
callOpenAIWithFunctionCalling();
// 03:55:00