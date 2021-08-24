const bunyan = require("bunyan");

const logger = bunyan.createLogger({ name: "TODO API" });

module.exports = logger;
