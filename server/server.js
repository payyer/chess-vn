const app = require("./src/app");
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`WSV chess start with port: ${PORT} `);
});

// clearning when turn off server
process.on("SIGINT", () => {
  server.close(() => {
    console.log(`Exit Server Express`);
  });
});
