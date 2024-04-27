import type { ResponseLogger } from "./loggers/ResponseLogger.js";

export default class Log {
  public static readonly logResponse: ResponseLogger<void> = function (
    ...args: Parameters<typeof Log.print>
  ): void {
    Log
      .logMessage(
        ...Log
          .print(
            ...args,
          ),
      );
  };
  private static readonly print: ResponseLogger<string[]> = function (
    action: string,
    context: string,
    response: string[] | string,
  ): string[] {
    return [
      `${action}:${
        context.length === 0
          ? ""
          : ` [${context}]`
      }`,
      ...[response].flat(),
    ];
  };

  private static logMessage(
    ...message: string[]
  ): void {
    const END_OF_MESSAGE: string = "\n";

    for (const line of message)
      console.log(line);

    console.log(END_OF_MESSAGE);
  }
}
