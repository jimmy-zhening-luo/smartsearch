import OpenAIClient from "./client/OpenAIClient.js";
import Log from "./cli/output/Log.js";

namespace Program {

  export async function main(): Promise<void> {
    try {
      const client: OpenAIClient = new OpenAIClient();

      // Chat
      const chatResponse: Awaited<ReturnType<OpenAIClient["chat"]>> = await client.chat("Say 'hello world'");

      Log.clientResponse(
        "Chat",
        `model: ${chatResponse.model}`,
        chatResponse.answer,
      );

      // ChatJson
      /** TBD */

      // ChatVision
      /** TBD */

      // Image
      const imagePrompt: string = "A picture of a cat";

      Log.clientResponse(
        "Image",
        `Prompt: "${imagePrompt}"`,
        (await client.image(imagePrompt)).images,
      );

      // ImageEdit
      /** OpenAI Bug -- not working */
      const inputImageEditFilename: string = "cat-square.png";
      const inputImageEditMaskFilename: string = "mask-transparent-square.png";
      const imageEditPrompt: string = "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: Show me this cat on vacation in Hawaii";

      const editedImageResponse = await client.imageEdit(
        inputImageEditFilename,
        inputImageEditMaskFilename,
        imageEditPrompt,
      );

      Log.clientResponse(
        "ImageEdit",
        `Input: "${inputImageEditFilename}".\nMask: "${inputImageEditMaskFilename}".\nPrompt: "${imageEditPrompt}".\nNumber of images returned: ${editedImageResponse.images.length}`,
        [
          ...editedImageResponse.images,
          ...Array.from(editedImageResponse.prompts.entries())
            .map(([ image, prompt ]) => `${image}\n${prompt}`),
        ],
      );

      // ImageVariation
      const inputImageVariationFilename: string = "cat-square.png";

      const imageVariationResponse = await client.imageVariation(
        inputImageVariationFilename,
      );

      Log.clientResponse(
        "ImageVariation",
        `Input: "${inputImageVariationFilename}".\nNumber of images returned: ${imageVariationResponse.images.length}`,
        imageVariationResponse.images,
      );

      // Models
      const modelFilter: string = "gpt";

      Log.clientResponse(
        "Models",
        `filter: "${modelFilter}"`,
        await client.models(modelFilter),
      );

      // Speech
      const outputSpeechFilename: string = "hello.mp3";
      const textToSynthesize: string = "Hello world.";

      await client.speech(outputSpeechFilename, textToSynthesize);

      Log.clientResponse(
        "Speech",
        `Output: ${outputSpeechFilename}`,
        `Synthesized text: ${textToSynthesize}`,
      );

      // Transcribe
      const inputEnglishSpeechFilename: string = "hello-to-transcribe.mp3";

      Log.clientResponse(
        "Transcribe",
        `Input: ${inputEnglishSpeechFilename}`,
        await client.transcribe(inputEnglishSpeechFilename),
      );

      // Translate
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
