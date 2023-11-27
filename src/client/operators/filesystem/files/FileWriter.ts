import { promises as fs } from "fs";
import File from "./file/File.js";

export default class FileWriter extends File {
  async save(content: Promise<Response>, fileName: string): Promise<void> {
    try {
      const buffer: Buffer = Buffer.from(
        await (
          await content
        )
          .arrayBuffer(),
      );

      fs.writeFile(
        this.prepare(fileName),
        buffer,
      );
    }
    catch (e) {
      throw new EvalError(
        `OutputFile: save: Failed to save file`,
        { cause: e },
      );
    }
  }
}
