import path from "path";

export default class File {
  protected readonly fileName: string;

  constructor(fileName: string) {
    try {
      if (fileName === "")
        throw new SyntaxError(`fileName is empty`);
      else {
        const parsedFileName: path.ParsedPath = path.parse(
          path.normalize(fileName),
        );

        if (parsedFileName.base === "")
          throw new SyntaxError(`fileName does not resolve to a valid base`);
        else if (parsedFileName.name === "")
          throw new SyntaxError(`fileName is missing name`);
        else if (parsedFileName.ext === "")
          throw new SyntaxError(`fileName is missing extension`);
        else
          this.fileName = path.format(parsedFileName);
      }
    }
    catch (e) {
      throw new EvalError(
        `File: ctor: Failed to instantiate base File with member fileName set to a valid file name`,
        { cause: e },
      );
    }
  }
}
