const app = require("../../index");
const syncDb = require("./sync-db");

syncDb().then((_) => {
  console.log("Sync database!");
  const port = 3000;
  app.listen(port, function () {
    console.log("Server is running");
  });
});
