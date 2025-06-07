// src/logging/logger.js

import pino from 'pino';
import config from 'config';

// Get the entire logging configuration object directly from the config files.
// config.get() will throw an error if the 'logging' section is missing,
// ensuring the application fails fast if not configured correctly.
const pinoOptions = config.get('logging');

/**
 * The application's central logger instance, configured dynamically
 * from the JSON config files.
 * @type {pino.Logger}
 */
const logger = pino(pinoOptions);

export default logger;
