import dotenv from "dotenv";
import OpenAI from "openai";
import OpenAiClient from "./client/OpenAiClient.js";

function initialize(): OpenAiClient {
  dotenv.config();
  const apiKey: string = process.env.OPENAI_API_KEY ?? "";
  const organization: string = process.env.OPENAI_ORG_ID ?? "";

  return new OpenAiClient(new OpenAI({
    apiKey: apiKey,
    organization: organization,
  }));

}

async function main(client: OpenAiClient): Promise<void> {
  const completion: OpenAI.ChatCompletion = await client.complete("Say 'hello world'");

  console.log(completion.choices);
  console.log(completion.model);
}

main(initialize());
