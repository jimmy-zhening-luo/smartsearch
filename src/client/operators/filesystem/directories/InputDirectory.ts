import Directory from "./directory/Directory.js";

const DEFAULT_INPUT_RELATIVE_PATH = "input";

export default class InputDirectory extends Directory {
  constructor(pathString: ConstructorParameters<typeof Directory>[0]) {
    try {
      super(pathString, DEFAULT_INPUT_RELATIVE_PATH);
    }
    catch (e) {
      throw new EvalError(
        `InputDirectory: ctor: Failed to instantiate directory using parent base directory ctor and const default input relative path`,
        { cause: e },
      );
    }
  }
}
