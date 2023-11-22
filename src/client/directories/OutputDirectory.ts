import path from "path";
import Directory from "./directory/Directory.js";

const DEFAULT_OUTPUT_RELATIVE_PATH = "output";

export default class OutputDirectory extends Directory {
  constructor(...pathString: ConstructorParameters<typeof Directory>) {
    try {
      super(...pathString);
      if (this.path === path.normalize(process.cwd()))
        this.path = path.normalize(
          path.join(process.cwd(), DEFAULT_OUTPUT_RELATIVE_PATH),
        );
    }
    catch (e) {
      throw new EvalError(
        `OutputDirectory: constructor: Failed to create OutputDirectory instance`,
        { cause: e },
      );
    }
  }
}
