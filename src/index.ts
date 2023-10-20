import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const apiKey: string = process.env.OPENAI_API_KEY ?? "";
const organization: string = process.env.OPENAI_ORG_ID ?? "";

const openai: OpenAI = new OpenAI({
  apiKey: apiKey,
  organization: organization,
});

async function main(): Promise<void> {
  const chatCompletion: OpenAI.ChatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Say 'hello world'",
    }
  ],
    model: "gpt-4",
  });

  console.log(chatCompletion.choices);
}

main();
