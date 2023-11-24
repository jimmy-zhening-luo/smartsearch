import OpenAIClient from "./client/OpenAIClient.js";

async function main(): Promise<void> {
  try {
    const client: OpenAIClient = new OpenAIClient();
    const chatAnswer: string = (await client.chat("Say 'hello world'")).answer;

    console.log(chatAnswer);

    const modelsList: string[] = await client.models("gpt");

    console.log(modelsList);
  }
  catch (e) {
    console.error(e);
  }
}

main();
