import OpenAIClient from "./client/OpenAIClient.js";
import log from "./cli/output/Log.js";

namespace Program {

  export async function main(): Promise<void> {
    try {
      const client: OpenAIClient = new OpenAIClient();
      const chatResponse: Awaited<ReturnType<OpenAIClient["chat"]>> = await client.chat("Say 'I am a little teapot!'");

      log(
        "Chat",
        `model: ${chatResponse.model}`,
        chatResponse.answer,
      );

      // ChatJson
      /** TBD */

      // ChatVision
      /** TBD */

      // Image
      const imagePrompt: string = "A family on vacation in Shanghai";

      log(
        "Image",
        `Prompt: "${imagePrompt}"`,
        (await client.image(imagePrompt)).images,
      );

      // ImageEdit
      /** OpenAI Bug -- not working */
      // const inputImageEditFilename: string = "cat-square.png";
      // const inputImageEditMaskFilename: string = "mask-transparent-square.png";
      // const imageEditPrompt: string = "I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS: Show me this cat on vacation in Hawaii";

      // const editedImageResponse = await client.imageEdit(
      //   inputImageEditFilename,
      //   inputImageEditMaskFilename,
      //   imageEditPrompt,
      // );

      // log(
      //   "ImageEdit",
      //   `Input: "${inputImageEditFilename}".\nMask: "${inputImageEditMaskFilename}".\nPrompt: "${imageEditPrompt}".\nNumber of images returned: ${editedImageResponse.images.length}`,
      //   [
      //     ...editedImageResponse.images,
      //     ...Array.from(editedImageResponse.prompts.entries())
      //       .map(([ image, prompt ]) => `${image}\n${prompt}`),
      //   ],
      // );

      // ImageVariation
      // const inputImageVariationFilename: string = "cat-square.png";

      // const imageVariationResponse = await client.imageVariation(
      //   inputImageVariationFilename,
      // );

      // log(
      //   "ImageVariation",
      //   `Input: "${inputImageVariationFilename}".\nNumber of images returned: ${imageVariationResponse.images.length}`,
      //   imageVariationResponse.images,
      // );

      // // Models
      // const modelFilter: string = "gpt";

      // log(
      //   "Models",
      //   `filter: "${modelFilter}"`,
      //   await client.models(modelFilter),
      // );

      // Speech
      // const outputSpeechFilename: string = "hello.mp3";
      // const textToSynthesize: string = "Hello world.";

      // await client.speech(outputSpeechFilename, textToSynthesize);

      // log(
      //   "Speech",
      //   `Output: ${outputSpeechFilename}`,
      //   `Synthesized text: ${textToSynthesize}`,
      // );

      // Transcribe
      const inputEnglishSpeechFilename: string = "hello-to-transcribe.mp3";

      log(
        "Transcribe",
        `Input: ${inputEnglishSpeechFilename}`,
        await client.transcribe(inputEnglishSpeechFilename),
      );

      // Translate
      // const inputChineseSpeechFilename: string = "nihao-to-translate.mp3";

      // log(
      //   "Translate",
      //   `Input: ${inputChineseSpeechFilename}`,
      //   await client.translate(inputChineseSpeechFilename),
      // );
    }
    catch (e) {
      console.error(e);
    }
  }
}

await Program.main();
