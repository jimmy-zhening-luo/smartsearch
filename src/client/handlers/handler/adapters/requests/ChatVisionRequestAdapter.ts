import type OpenAI from "openai";
import ChatRequestAdapter from "./ChatRequestAdapter.js";
import type { ChatModelSupport } from "../../../types/ChatTypes.js";

/**
 *
 * Currently, GPT-4 Turbo with vision does not support the response_format parameter, and we currently set a low max_tokens default which you can override.

 * Images are made available to the model in two main ways: by passing a link to the image or by passing the base64 encoded image directly in the request. Images can be passed in the user, system and assistant messages.

 */

type ChatVisionRequestPayloadPrompt = OpenAI.ChatCompletionCreateParamsNonStreaming["messages"][0]["content"];

export default class ChatVisionRequestAdapter
  extends ChatRequestAdapter<ChatVisionRequestPayloadPrompt> {
  constructor(
    model: Extract<Extract<ChatModelSupport["vision"], OpenAI.ChatCompletionCreateParamsNonStreaming["model"]>, string>,
    maxTokens: Extract<OpenAI.ChatCompletionCreateParamsNonStreaming["max_tokens"], number>,
    textPrompt: string,
    images: Array<Buffer | URL>,
    instructions?: string,
    temperature?: Extract<OpenAI.ChatCompletionCreateParamsNonStreaming["temperature"], number>,
    seed?: Extract<OpenAI.ChatCompletionCreateParamsNonStreaming["seed"], number>,
  ) {
    const content: ChatVisionRequestPayloadPrompt = [
      {
        type: "text",
        text: textPrompt,
      },
    ];

    for (const image of images)
      content.push(
        {
          type: "image_url",
          image_url: {
            detail: "high",
            url: image instanceof URL
              ? image.href
              : image.toString("base64url"),
          },
        },
      );

    super(
      model,
      [...content],
      instructions,
      temperature,
      maxTokens,
      seed,
    );
  }
}
