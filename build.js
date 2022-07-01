const fs = require("fs");
const childProcess = require("child_process");

try {
  // Remove current build
  fs.rmSync("./dist/", { recursive: true, force: true });

  // Should we use tsc from node_modules/.bin ?
  childProcess.exec("node_modules/.bin/tsc --build tsconfig.json");
  console.log("Finish build");
} catch (err) {
  console.log(err);
}
