import Directory from "./directory/Directory.js";

type WRITE = "WRITE";

export default class OutputDirectory extends Directory<WRITE> {
  public readonly operation: WRITE = "WRITE";

  public async ifNotExists(): Promise<void> {
    try {
      await this.create();
    }
    catch (e) {
      throw new EvalError(
        `OutputDirectory: ifNotExists: Failed to create directory`,
        { cause: e },
      );
    }
  }
}
