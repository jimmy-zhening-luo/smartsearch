import { promises as fs } from "fs";
import type InputDirectory from "../directories/InputDirectory.js";
import File from "./file/File.js";

export default class FileReader extends File<"READ", InputDirectory> {
  public async read(): Promise<Buffer> {
    try {
      return await fs.readFile(
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
