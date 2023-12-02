import type OpenAI from "openai";

export type ConstSettingIds =
  // // API Handlers
  // Chat
  | "DEFAULT_CHAT_MODEL"
  // Speech
  | "DEFAULT_SPEECH_MODEL"
  | "DEFAULT_SPEECH_VOICE"
  | "DEFAULT_SPEECH_RESPONSE_FORMAT"
  | "DEFAULT_SPEECH_SPEED";

export type EnvSettingIds =
  // // OpenAI API
  | "OPENAI_API_KEY"
  | "OPENAI_ORG_ID"
  // // Client Operations
  | "INPUT_DIRECTORY"
  | "OUTPUT_DIRECTORY"
  | "DEFAULT_INPUT_RELATIVE_PATH"
  | "DEFAULT_OUTPUT_RELATIVE_PATH";

export interface ConstSettings {
  // // API Handlers
  // Chat
  DEFAULT_CHAT_MODEL: OpenAI.ChatCompletionCreateParamsNonStreaming["model"];
  // Speech
  DEFAULT_SPEECH_MODEL: OpenAI.Audio.SpeechCreateParams["model"];
  DEFAULT_SPEECH_VOICE: OpenAI.Audio.SpeechCreateParams["voice"];
  DEFAULT_SPEECH_RESPONSE_FORMAT: OpenAI.Audio.SpeechCreateParams["response_format"];
  DEFAULT_SPEECH_SPEED: OpenAI.Audio.SpeechCreateParams["speed"];
}

export interface EnvSettings {
  // // OpenAI API
  OPENAI_API_KEY: string | null;
  OPENAI_ORG_ID: string | null;
  // // Client Operations
  INPUT_DIRECTORY: string;
  OUTPUT_DIRECTORY: string;
  DEFAULT_INPUT_RELATIVE_PATH: string;
  DEFAULT_OUTPUT_RELATIVE_PATH: string;
}
