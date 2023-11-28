import { promises as fs } from "fs";
import File from "./file/File.js";

export default class FileReader extends File {
  async open(fileName: string): Promise<Buffer> {
    try {
      return await fs.readFile(
        this.prepare(fileName),
      );
    }
    catch (e) {
      throw new EvalError(
        `InputFile: read: Failed to read file`,
        { cause: e },
      );
    }
  }
}
