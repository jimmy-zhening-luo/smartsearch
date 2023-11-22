import path from "path";

export default class Directory {
  readonly path: string;

  constructor(
    pathString: string | Directory = process.cwd(),
    defaultRelativePathFromProjectRoot?: string,
  ) {
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
        else if (this.path === path.normalize(process.cwd()))
          this.path = path.normalize(
            defaultRelativePathFromProjectRoot !== undefined
              ? path.join(
                process.cwd(),
                defaultRelativePathFromProjectRoot,
              )
              : process.cwd(),
          );
      }
    }
    catch (e) {
      throw new EvalError(
        `Directory: constructor: Failed to create Directory instance`,
        { cause: e },
      );
    }
  }
}
