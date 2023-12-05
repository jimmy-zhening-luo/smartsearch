import OpenAIClient from "./client/OpenAIClient.js";
import Log from "./cli/output/Log.js";

namespace Program {

  export async function main(): Promise<void> {
    try {
      const client: OpenAIClient = new OpenAIClient();

      const chatResponse: Awaited<ReturnType<OpenAIClient["chat"]>> = await client.chat("Say 'hello world'");

      Log.clientResponse(
        "Chat",
        `model: ${chatResponse.model}`,
        chatResponse.answer,
      );

      const modelFilter: string = "gpt";

      Log.clientResponse(
        "Models",
        `filter: "${modelFilter}"`,
        await client.models(modelFilter),
      );

      const outputSpeechFilename: string = "hello.mp3";
      const textToSynthesize: string = "Hello world.";

      await client.speech(outputSpeechFilename, textToSynthesize);

      Log.clientResponse(
        "Speech",
        `Output: ${outputSpeechFilename}`,
        `Synthesized text: ${textToSynthesize}`,
      );

      const inputEnglishSpeechFilename: string = "hello-to-transcribe.mp3";

      Log.clientResponse(
        "Transcribe",
        `Input: ${inputEnglishSpeechFilename}`,
        await client.transcribe(inputEnglishSpeechFilename),
      );

      const inputChineseSpeechFilename: string = "nihao-to-translate.mp3";

      Log.clientResponse(
        "Translate",
        `Input: ${inputChineseSpeechFilename}`,
        await client.translate(inputChineseSpeechFilename),
      );
    }
    catch (e) {
      console.error(e);
    }
  }
}

await Program.main();
