const { readdirSync } = require("fs");

exports.listTemplates = () => {
  const contents = readdirSync("./templates", "utf8")
  contents.forEach(content => console.log(content));
}