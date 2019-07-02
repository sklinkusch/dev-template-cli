const { readdirSync, mkdir } = require("fs");

const myArgs = process.argv.slice(2);
if (myArgs.includes("ls") && myArgs.includes("templates")) {
  const contents = readdirSync("./templates", "utf8")
  contents.forEach(content => console.log(content));
  process.exit();
}

if (myArgs[0] === "create") {
  let template = myArgs[1];
  const furtherArgs = myArgs.slice(2);
  const furtherArgsObj = furtherArgs.reduce((acc, curr) => {
    const shortened = curr.slice(2);
    const [key, value] = shortened.split("=");
    acc[key] = value;
    return acc;
  }, {})
  const dest = furtherArgsObj.dest.replace('~', process.env.HOME);
  mkdir(dest, { recursive: true }, (err) => {
    if (err) throw err;
  });
}