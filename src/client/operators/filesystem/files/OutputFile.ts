import path from "path";
import { promises as fs } from "fs";
import File from "./file/File.js";
import OutputDirectory from "../directories/OutputDirectory.js";

export default class OutputFile extends File {
  protected readonly content: Promise<Response>;

  constructor(content: Promise<Response>, fileName: string) {
    try {
      super(fileName);
      this.content = content;
    }
    catch (e) {
      throw new EvalError(
        `OutputFile: ctor: Failed to construct OutputFile`,
        { cause: e },
      );
    }
  }

  async save(directory: OutputDirectory): Promise<void> {
    try {
      const buffer: Buffer = Buffer.from(
        await (
          await this.content
        )
          .arrayBuffer(),
      );

      fs.writeFile(
        path.join(
          directory.fullPath,
          this.fileName,
        ),
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
