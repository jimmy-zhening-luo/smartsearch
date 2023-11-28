import path from "path";
import Directory from "../../directories/directory/Directory.js";

export default class File {
  protected readonly directory: Directory;

  constructor(directory: Directory) {
    try {
      this.directory = new Directory(directory);
    }
    catch (e) {
      throw new EvalError(
        `File: ctor: Failed to instantiate base File with member directory set to: ${directory.fullPath}`,
        { cause: e },
      );
    }
  }

  prepare(fileName: string): string {
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
          return path.join(this.directory.fullPath, fileName);
      }
    }
    catch (e) {
      throw new EvalError(
        `File: prepare: Failed to join directory "${this.directory.fullPath}" with fileName "${fileName}"`,
        { cause: e },
      );
    }
  }
}
