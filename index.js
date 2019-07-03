const { readdirSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } = require("fs");
const { showHelp } = require("./messaging");
const { listTemplates } = require("./list-templates");
const { spawn } = require("child_process");

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
  const targetDirArray = targetDir.split("/");
  for (let i = 2; i <= targetDirArray.length; i++) {
    let newDir;
    if (i !== targetDirArray.length) {
      newDir = targetDirArray.slice(0, i).join("/");
    } else {
      newDir = targetDirArray.slice(0).join("/");
    }
    const isExisting = existsSync(newDir)
    if (!isExisting) {
      mkdirSync(newDir, true);
    } else {
      continue;
    }
  }
  const sourceDir = `${process.env.PWD}/templates/${template}`;
  const packageJSONRaw = readFileSync(`${sourceDir}/package.json`, 'utf8');
  const packageRaw = JSON.parse(packageJSONRaw);
  packageRaw.name = furtherArgsObj.name;
  const packageJSON = JSON.stringify(packageRaw);
  writeFileSync(`${targetDir}/package.json`, packageJSON, { encoding: 'utf8' });
  const contentsOfTemplate = readdirSync(sourceDir, { encoding: 'utf8' });
  contentsOfTemplate.forEach(file => {
    if (!file.includes("package") && file !== 'yarn.lock') {
      copyFileSync(`${sourceDir}/${file}`, `${targetDir}/${file}`);
    }
  });
  const install = spawn('npm', ['install'], { cwd: targetDir });
  install.stderr.on('error', (err) => {
    console.log('Failed to install node_modules');
  });
  install.stdout.on('data', (data) => {
    console.log(data.toString());
  });
  const runDev = spawn('npm', ['run', 'dev'], { cwd: targetDir });
  runDev.stderr.on('error', (err) => {
    console.log('Failed to run nodemon');
  });
  runDev.stdout.on('data', (data) => {
    console.log(data.toString());
  });
}