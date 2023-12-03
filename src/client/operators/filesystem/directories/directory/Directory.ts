import path from "path";
import { promises as fs } from "fs";
import sanitize from "sanitize-filename";
import type FileOperation from "../../operations/FileOperation.js";

export default abstract class Directory<Op extends keyof typeof FileOperation> {
  public readonly fullPath: string;
  public abstract readonly operation: Op;

  constructor(
    directory: Directory<Op> | string = ".",
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

  private static sanitizeFileName(fileName: string): string {
    try {
      if (fileName === "")
        throw new SyntaxError(`fileName cannot be empty`);
      else if (fileName.includes("/") || fileName.includes("\\")) {
        throw new SyntaxError(`fileName cannot contain slashes`);
      }
      else {
        const sanitizedFilename: string = sanitize(fileName);

        if (sanitizedFilename !== fileName)
          throw new SyntaxError(`fileName contains invalid characters`);
        else
          return sanitizedFilename;
      }
    }
    catch (e) {
      throw new EvalError(
        `Directory: static getSafeFileName: Failed to get safe fileName "${fileName}"`,
        { cause: e },
      );
    }
  }

  public sanitizeFilePath(fileName: string): {
    fileName: string;
    filePath: string;
  } {
    try {
      const safeFileName = Directory.sanitizeFileName(fileName);

      return {
        fileName: safeFileName,
        filePath: path.join(
          this.fullPath,
          safeFileName,
        ),
      };
    }
    catch (e) {
      throw new EvalError(
        `Directory: getFilePath: Failed to join directory "${this.fullPath}" with fileName "${fileName}"`,
        { cause: e },
      );
    }
  }

  public async safeFilePath(fileName: string): Promise<string> {
    try {
      if (!await this.exists(fileName))
        await this.ifNotExists();

      return this.sanitizeFilePath(fileName).filePath;
    }
    catch (e) {
      throw new EvalError(
        `Directory: async prepare: Failed to get safe filePath for fileName "${fileName}"`,
        { cause: e },
      );
    }
  }

  protected async create(): Promise<void> {
    try {
      if (!await this.exists())
        await fs.mkdir(
          this.fullPath,
          { recursive: true },
        );
    }
    catch (e) {
      throw new EvalError(
        `Directory: protected async create: Failed to create directory "${this.fullPath}"`,
        { cause: e },
      );
    }
  }

  private async exists(fileName?: string): Promise<boolean> {
    try {
      const safePath: string = fileName === undefined
        ? this.fullPath
        : this.sanitizeFilePath(fileName).filePath;

      return await fs.stat(
        safePath,
      )
        .then(
          () => true,
        )
        .catch(
          () => false,
        );
    }
    catch (e) {
      throw new EvalError(
        `Directory: private exists: Failed to check if directory "${this.fullPath}" + optional fileName "${fileName ?? ""}" exists`,
        { cause: e },
      );
    }
  }

  protected abstract ifNotExists(): unknown;
}
