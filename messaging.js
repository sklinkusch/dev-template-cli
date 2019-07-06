const { name, version } = require("./package.json");

exports.showHelp = () => {
  console.log(`
  Welcome to ${name} ${version}!\n
  The general usage is: node index.js options
  possible options:
  ls templates: list all available templates
  create <template-name> --name="<your project-name>" --dest="<destination>":
  creates a new project folder with the provided name in the destination directory using the given template
  --help: prints this help
  `);
};
