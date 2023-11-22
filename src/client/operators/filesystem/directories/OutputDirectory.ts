import Directory from "./directory/Directory.js";

const DEFAULT_OUTPUT_RELATIVE_PATH = "output";

export default class OutputDirectory extends Directory {
  constructor(pathString: ConstructorParameters<typeof Directory>[0]) {
    try {
      super(pathString, DEFAULT_OUTPUT_RELATIVE_PATH);
    }
    catch (e) {
      throw new EvalError(
        `OutputDirectory: constructor: Failed to create OutputDirectory instance`,
        { cause: e },
      );
    }
  }
}
