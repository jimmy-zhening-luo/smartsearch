import path from "path";

export default class Directory {
  readonly pathString: string;

  constructor(
    pathString: string | Directory = process.cwd(),
    defaultRelativePathFromProjectRoot?: string,
  ) {
    try {
      if (pathString instanceof Directory)
        this.pathString = pathString.pathString;
      else {
        if (pathString === "")
          throw new SyntaxError(`pathString cannot be empty`);
        else {
          const _pathString: string = path.normalize(
            path.resolve(pathString),
          );
          const _projectRoot: string = path.normalize(
            process.cwd(),
          );

          if (_pathString === "")
            throw new EvalError(
              `pathString param was non-empty, resolved without falling back to the project directory, but somehow resolved to an empty string. This should never happen, because pathString should be the absolute, fully-qualified path for a directory.`,
            );
          else
            this.pathString = path.join(
              _pathString,
              (_pathString === _projectRoot || _pathString === ".")
              && defaultRelativePathFromProjectRoot !== undefined
                ? defaultRelativePathFromProjectRoot
                : "",
            );
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `Directory: ctor: Failed to instantiate base directory with member path set to a valid directory path`,
        { cause: e },
      );
    }
  }
}
