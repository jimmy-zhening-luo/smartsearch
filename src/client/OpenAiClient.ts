// import fs from 'fs';
// import fetch from 'node-fetch';
import dotenv from "dotenv";
import OpenAI from "openai";
// import { toFile } from 'openai';

export default class OpenAiClient {
  openai: OpenAI;

  constructor(openai?: OpenAI | OpenAiClient) {
    if (openai === undefined) {
      dotenv.config();
      const apiKey: string = process.env.OPENAI_API_KEY ?? "";
      const organization: string = process.env.OPENAI_ORG_ID ?? "";
      this.openai = new OpenAI({
        apiKey: apiKey,
        organization: organization,
      });
    } else if (openai instanceof OpenAI) this.openai = openai;
    else this.openai = openai.openai;
  }

  async models(): Promise<OpenAI.Models.ModelsPage> {
    const models: OpenAI.Models.ModelsPage = await this.openai.models.list();
    return models;
  }

  async complete(
    prompt: string,
    model: string = "gpt-4",
  ): Promise<OpenAI.ChatCompletion> {
    const completion: OpenAI.ChatCompletion =
      await this.openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: model,
      });

    return completion;
  }
}
