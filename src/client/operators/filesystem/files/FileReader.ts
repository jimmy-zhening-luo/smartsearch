import fs from "fs";
import type InputDirectory from "../directories/InputDirectory.js";
import File from "./file/File.js";

export default class FileReader extends File<"READ", InputDirectory> {
  public async read(): Promise<fs.ReadStream> {
    try {
      return fs.createReadStream(
        await this.safePath(),
      );
    }
    catch (e) {
      throw new EvalError(
        `InputFile: async read: Failed to read file`,
        { cause: e },
      );
    }
  }
}
