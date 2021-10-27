const { Client } = require("../Modules/Utils");

/**
 * @param {Client} client
 */
module.exports = (client) => {
  process.on("unhandledRejection", (reason, p) => {
    console.log("[x] Unhandled Rejection");
    console.log(reason, p);
  });

  process.on("uncaughtException", (err, origin) => {
    console.log("[x] Uncaught Exception");
    console.log(err, origin);
  });

  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.log("[x] Uncaught Exception (MONITOR)");
    console.log(err, origin);
  });

  process.on("multipleResolves", (type, promise, reason) => {
    console.log("[x] Multiple Resolves");
    console.log(type, promise, reason);
  });
};
