# dev-template-cli

This command-line application was created by Stefan Klinkusch at Digital Career Institute in Berlin, Germany using Node.js.

## Manual

### Setup of the application

1. Clone the repository using ```git clone git@github.com:sklinkusch/dev-template-cli.git``` (SSH) or ```git clone https://github.com/sklinkusch/dev-template-cli``` (HTTPS).
1. Move into the directory ```dev-template-cli``` and run ```npm install``` or ```yarn```.

### Running the application

The application includes templates that can be used to create new node projects. It has three main modes:
- ```node index.js ls templates```
  - shows a list of available templates
  - templates should be in the templates folder of this project
- ```node index.js create templateName --name=projectName --dest=targetDirectory```
  - creates a new project in the folder ```projectName``` in the ```targetDirectory```.
  - project is created according to the template ```templateName```
  - files are copied to the project folder
  - ```package.json``` contains the new project name
  - dependencies and devDependencies are installed automatically
  - ```npm run dev``` is automatically run
- ```node index.js --help```
  - shows a help text, similar to this manual, but shorter

## Techniques

- JavaScript
- Node.js
  - file-system manipulations (fs)