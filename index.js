const { showHelp } = require("./messaging");
const { listTemplates } = require("./list-templates");
const { createProject } = require("./createProject");


const myArgs = process.argv.slice(2);

if (myArgs.includes("--help")) {
  showHelp();
  process.exit();
}

if (myArgs.includes("ls") && myArgs.includes("templates")) {
  listTemplates();
  process.exit();
}

if (myArgs[0] === "create") {
  createProject(myArgs);
}