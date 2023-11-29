import type { LogMessage } from "./log/LogMessage.js";

export default class Log {
  static clientResponse: LogMessage = function (
    endpoint,
    qualifier,
    response,
  ): void {
    Log.logFormattedParagraph(
      `${endpoint}: [${qualifier}]`,
      response,
    );
  };

  protected static logFormattedParagraph(
    prefix: string,
    body: string | string[],
  ): void {
    Log.logParagraph(
      ...[
        prefix,
        ...Array.isArray(body)
          ? body
          : [body],
      ],
    );
  }

  protected static logParagraph(
    ...lines: string[]
  ): void {
    for (const line of lines)
      console.log(line);

    console.log("\n");
  }
}
