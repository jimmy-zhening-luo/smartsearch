import type OpenAI from "openai";
import type Settings from "./config/Settings.js";

export default interface ClientSettings extends Settings {
  // // OpenAI API
  OPENAI_API_KEY: string;
  OPENAI_ORG_ID?: string;
  // // Client Operations
  INPUT_DIRECTORY: string;
  OUTPUT_DIRECTORY: string;
  DEFAULT_INPUT_RELATIVE_PATH: string;
  DEFAULT_OUTPUT_RELATIVE_PATH: string;
  // // API Handlers
  // Chat
  DEFAULT_CHAT_MODEL: OpenAI.ChatCompletionCreateParamsNonStreaming["model"];
  // Speech
  DEFAULT_SPEECH_MODEL: OpenAI.Audio.SpeechCreateParams["model"];
  DEFAULT_SPEECH_VOICE: OpenAI.Audio.SpeechCreateParams["voice"];
  DEFAULT_SPEECH_RESPONSE_FORMAT?: OpenAI.Audio.SpeechCreateParams["response_format"];
  DEFAULT_SPEECH_SPEED?: OpenAI.Audio.SpeechCreateParams["speed"];
}
