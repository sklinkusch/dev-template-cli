const { readdirSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, existsSync } = require("fs");
const { spawn } = require("child_process");

exports.createProject = (myArgs) => {
  const { HOME, PWD } = process.env;
  let template = myArgs[1];
  const sourceDir = `${PWD}/templates/${template}`;
  // all further args. are written to furtherArgs
  const furtherArgs = myArgs.slice(2);
  // taking rules for name and dest and building an object
  const furtherArgsObj = furtherArgs.reduce((acc, curr) => {
    // removing the leading dashes
    const shortened = curr.slice(2);
    // split the argument at the "=" sign and write the elements into key and value
    const [key, value] = shortened.split("=");
    // create new property key in the acc. with the value value
    acc[key] = value;
    // return the accumulator for the next step
    return acc;
  }, {})
  // replace the tilde in the destination
  const dest = furtherArgsObj.dest.replace('~', HOME);
  // destructuring the name of the project folder
  const { name } = furtherArgsObj;
  const targetDir = `${dest}/${name}`;
  makeFolder(targetDir);
  updatePackageJson(sourceDir, targetDir, name);
  copyFiles(sourceDir, targetDir);
  installModules(targetDir);
  startProject(targetDir);
}

const makeFolder = (directory) => {
  const directoryArray = directory.split("/");
  for (let i = 2; i <= directoryArray.length; i++) {
    // container variable
    let newDir;
    // containing folders from root folder to target folder
    if (i !== directoryArray.length) {
      newDir = directoryArray.slice(0, i).join("/");
    } else {
      newDir = directoryArray.slice(0).join("/");
    }
    // checks if folder is already existing
    const isExisting = existsSync(newDir)
    if (!isExisting) {
      // if not, the folder is created
      mkdirSync(newDir, true);
    } else {
      // otherwise, creation of folder is skipped
      continue;
    }
  }
}

const updatePackageJson = (source, target, name) => {
  // read the file (JSON) to packageJSONRaw
  const packageJSONRaw = readFileSync(`${source}/package.json`, 'utf8');
  // convert the object JSON -> JavaScript
  const packageRaw = JSON.parse(packageJSONRaw);
  // add the name
  packageRaw.name = name;
  // convert the object JavaScript -> JSON
  const packageJSON = JSON.stringify(packageRaw);
  // write the file
  writeFileSync(`${target}/package.json`, packageJSON, { encoding: 'utf8' });
}

const copyFiles = (source, target) => {
  // read files in the template folder
  const contentsOfTemplate = readdirSync(source, { encoding: 'utf8' });
  // take each file ...
  contentsOfTemplate.forEach(file => {
    // ... that is not package.json, package-lock.json, or yarn.lock ...
    if (!file.includes("package") && file !== 'yarn.lock') {
      // ... and copy it to the target folder
      copyFileSync(`${source}/${file}`, `${target}/${file}`);
    }
  });
}

const installModules = (target) => {
  const install = spawn('npm', ['install'], { cwd: target });
  install.stderr.on('error', (err) => {
    console.log('Failed to install node_modules');
  });
  install.stdout.on('data', (data) => {
    console.log(data.toString());
  });
}

const startProject = (target) => {
  const runDev = spawn('npm', ['run', 'dev'], { cwd: target });
  runDev.stderr.on('error', (err) => {
    console.log('Failed to run nodemon');
  });
  runDev.stdout.on('data', (data) => {
    console.log(data.toString());
  });
}