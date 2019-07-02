const { readdirSync, mkdir, readFileSync, writeFileSync } = require("fs");

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
  const { name } = furtherArgsObj;
  const targetDir = `${dest}/${name}`;
  mkdir(targetDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
  const packageJSONRaw = readFileSync(`${process.env.PWD}/templates/${template}/package.json`, 'utf8');
  const packageRaw = JSON.parse(packageJSONRaw);
  packageRaw.name = furtherArgsObj.name;
  const packageJSON = JSON.stringify(packageRaw);
  writeFileSync(`${targetDir}/package.json`, packageJSON, { encoding: 'utf8' });
}