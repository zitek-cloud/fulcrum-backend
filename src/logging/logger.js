// src/logging/logger.js

import pino from "pino";
import config from "config";

const logger = pino(config.get("logging"));

export default logger;
