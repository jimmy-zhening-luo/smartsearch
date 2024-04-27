import { promises as fs } from "fs";
import type InputDirectory from "../directories/InputDirectory.js";
import FileOperator from "./file/FileOperator.js";

export default class FileReader extends FileOperator<"READ", InputDirectory> {
  public async read(): Promise<File> {
    try {
      const safePath: string = await this.safePath();

      return new File(
        [
          new Blob(
            [
              Buffer.from(
                await fs.readFile(
                  safePath,
                ),
              ),
            ],
          ),
        ],
        safePath,
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
