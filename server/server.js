const app = require("./src/app");
const config = require("./src/configs/config.mongodb");
const PORT = config.app.port;

const server = app.listen(PORT, () => {
  console.log(`WSV chess start with port: ${PORT} `);
});

// clearning when turn off server
process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Exit Server Express`);
  });
});
