import OpenAIClient from "./client/OpenAIClient.js";
import Log from "./cli/output/Log.js";

namespace Program {

  export async function main(): Promise<void> {
    try {
      const client: OpenAIClient = new OpenAIClient();

      const inputDir: string = client.inputDirectory;
      const outputDir: string = client.outputDirectory;

      Log.clientResponse(
        "I/O Folders",
        "",
        [
          `input: ${inputDir}`,
          `output: ${outputDir}`,
        ],
      );

      const chatAnswer: Awaited<ReturnType<OpenAIClient["chat"]>> = await client.chat("Say 'hello world'");

      Log.clientResponse(
        "Chat",
        `model: ${chatAnswer.model}`,
        chatAnswer.answer,
      );

      const modelFilter: string = "gpt";
      const modelsList: Awaited<ReturnType<OpenAIClient["models"]>> = await client.models(modelFilter);

      Log.clientResponse(
        "Models",
        `filter: "${modelFilter}"`,
        modelsList,
      );
    }
    catch (e) {
      console.error(e);
    }
  }
}

await Program.main();
