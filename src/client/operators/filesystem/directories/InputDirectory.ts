import path from "path";
import Directory from "./directory/Directory.js";

const DEFAULT_INPUT_RELATIVE_PATH = "input";

export default class InputDirectory extends Directory {
  constructor(...pathString: ConstructorParameters<typeof Directory>) {
    try {
      super(...pathString);
      if (this.path === path.normalize(process.cwd()))
        this.path = path.normalize(
          path.join(process.cwd(), DEFAULT_INPUT_RELATIVE_PATH),
        );
    }
    catch (e) {
      throw new EvalError(
        `InputDirectory: constructor: Failed to create InputDirectory instance`,
        { cause: e },
      );
    }
  }
}
