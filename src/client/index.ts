// import fs from 'fs';
// import fetch from 'node-fetch';
import OpenAI from 'openai';
// import { toFile } from 'openai';

export default class OpenAiClient {
  client: OpenAI;

  constructor(client: OpenAI | OpenAiClient) {
    this.client = client instanceof OpenAI ? client : client.client;
  }

  async complete(prompt: string, model?: string): Promise<OpenAI.ChatCompletion.Choice[]> {
    const completion: OpenAI.ChatCompletion = await this.client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
      }
    ],
      model: model ?? "gpt-4",
    });

    return completion.choices;
  }

}
