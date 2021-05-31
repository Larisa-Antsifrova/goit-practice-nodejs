import fs from "fs/promises";
import path from "path";
import { isAccessible } from "./lib/isAccessible.js";

export class SortFiles {
  constructor(dist) {
    this.dist = dist;

    queueMicrotask(async () => {
      if (!(await isAccessible(dist))) {
        await fs.mkdir(dist);
      }
    });
  }

  async #copyFile(file) {
    const folder = path.extname(file.path);
    const targetPath = path.join(this.dist, folder);

    try {
      if (!(await isAccessible(targetPath))) {
        await fs.mkdir(targetPath);
      }

      await fs.copyFile(file.path, path.join(targetPath, file.name));
    } catch (error) {
      console.log(error.message);
      process.exit(1);
    }
  }

  async readFolder(base) {
    const files = await fs.readdir(base);

    for (const item of files) {
      const localBase = path.join(base, item);
      const entity = await fs.stat(localBase);

      if (entity.isDirectory()) {
        this.readFolder(localBase);
      } else {
        await this.#copyFile({ name: item, path: localBase });
      }
    }
  }
}
