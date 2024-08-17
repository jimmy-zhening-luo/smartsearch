import type { ResponseLogger } from "./loggers/ResponseLogger.js";

export function logMessage(
  ...message: string[]
): void {
  const END_OF_MESSAGE = "\n";

  for (const line of message)
    console.log(line);

  console.log(END_OF_MESSAGE);
}
export const print: ResponseLogger<string[]> = function (
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
export default function (
  ...args: Parameters<typeof print>
): void {
  logMessage(

    ...print(
      ...args,
    ),
  );
}
