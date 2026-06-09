const fs = require("fs");
const path = require("path");

const logFilePath = path.join(
  __dirname,
  "../logs/activity.log"
);

const logger = (message) => {
  const timestamp = new Date().toISOString();

  const logMessage =
    `[${timestamp}] ${message}\n`;

  fs.appendFileSync(
    logFilePath,
    logMessage
  );
};

module.exports = logger;