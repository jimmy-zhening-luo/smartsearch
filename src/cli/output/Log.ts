import type { LogMessage } from "./log/LogMessage.js";

export default class Log {
  public static clientResponse: LogMessage = function (
    endpoint: string,
    qualifier: string,
    response: string[] | string,
  ): void {
    Log.logFormattedP(
      `${endpoint}:${
        qualifier === ""
          ? ""
          : " [" + qualifier + "]"
      }`,
      response,
    );
  };

  protected static logFormattedP(
    prefix: string,
    body: string[] | string,
  ): void {
    Log.logP(
      ...[
        prefix,
        ...Array.isArray(body)
          ? body
          : [body],
      ],
    );
  }

  protected static logP(
    ...lines: string[]
  ): void {
    for (const line of lines)
      console.log(line);

    console.log("\n");
  }
}
