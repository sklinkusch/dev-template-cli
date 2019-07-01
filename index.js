const { readdirSync } = require("fs");

const myArgs = process.argv.slice(2);
if (myArgs.includes("ls") && myArgs.includes("templates")) {
  const contents = readdirSync("./templates", "utf8")
  contents.forEach(content => console.log(content));
  process.exit();
}

if (myArgs[0] === "create") {
  let template = myArgs[1];
  console.log(template);
}