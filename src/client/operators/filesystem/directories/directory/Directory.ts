import path from "path";

export default class Directory {
  readonly fullPath: string;

  constructor(
    directory: Directory | string = ".",
    defaultRelativeSubpath: string = "",
  ) {
    try {
      if (directory instanceof Directory) {
        this.fullPath = directory.fullPath;
      }
      else {
        const resolvedPath: string = path.normalize(
          path.resolve(
            path.normalize(
              directory,
            ),
          ),
        );
        const root: string = path.normalize(
          path.resolve(
            path.normalize(
              process.cwd(),
            ),
          ),
        );
        const dot: string = path.normalize(
          path.resolve(
            path.normalize(
              ".",
            ),
          ),
        );

        if (resolvedPath === "")
          throw new EvalError(
            `pathString param was non-empty, resolved without falling back to the project directory, but somehow resolved to an empty string. This should never happen, because pathString should be the absolute, fully-qualified path for a directory.`,
          );
        else
          this.fullPath = path.join(
            resolvedPath,
            resolvedPath === root || resolvedPath === dot
              ? path.normalize(defaultRelativeSubpath)
              : "",
          );
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
