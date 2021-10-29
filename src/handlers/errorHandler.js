const { Client } = require("../modules/Utils");

/**
 * @param {Client} client
 */
module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {
    console.log("[x] Unhandled Rejection".bgRed);
    console.log(reason, p);
  });

  process.on("uncaughtException", (err, origin) => {
    console.log("[x] Uncaught Exception".bgRed);
    console.log(err, origin);
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("[x] Uncaught Exception (MONITOR)".bgRed);
    console.log(err, origin);
  });

  process.on("multipleResolves", (type, promise, reason) => {
    console.log("[x] Multiple Resolves".bgRed);
    console.log(type, promise, reason);
  });
};
