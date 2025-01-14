import path from "path";
import fs from "fs-extra";
import logger from "./logger";

import getChangesetBase from "./getChangesetBase";

export default async function resolveConfig(cwd: string) {
  const changesetBase = await getChangesetBase(cwd);

  const configPath = path.resolve(changesetBase, "config.js");
  const hasConfigFile = await fs.pathExists(configPath);

  if (hasConfigFile) {
    try {
      const loadedConfig = require(configPath);
      return loadedConfig;
    } catch (error) {
      logger.error("There was an error reading your changeset config", error);
      throw error;
    }
  } else {
    return {};
  }
}
