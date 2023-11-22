import path from "path";

export default class Directory {
  constructor(pathString: string | Directory = process.cwd()) {
    try {
      this.path = pathString;
    }
    catch (e) {
      throw new EvalError(
        `Directory: constructor: Failed to create Directory instance`,
        { cause: e },
      );
    }
  }

  get path(): string {
    return this.path;
  }

  set path(pathString: string | Directory) {
    try {
      if (pathString instanceof Directory)
        this.path = pathString.path;
      else if (pathString === "")
        throw new SyntaxError(`pathString cannot be empty`);
      else if (
        path.parse(
          path.normalize(pathString),
        ).base !== ""
      )
        throw new TypeError(`pathString must be a directory, not a filepath.`);
      else {
        this.path = path.normalize(
          path.resolve(pathString),
        );
        if (this.path === "")
          throw new EvalError(`pathString param was non-empty, resolved without falling back to the project directory, but somehow resolved to an empty string. This should never happen, because pathString should be the absolute, fully-qualified path for a directory.`);
      }
    }
    catch (e) {
      throw new EvalError(
        `Directory: set path: Failed to set pathString`,
        { cause: e },
      );
    }
  }
}
