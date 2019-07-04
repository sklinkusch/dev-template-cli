# dev-template-cli

This command-line application was created by Stefan Klinkusch at Digital Career Institute in Berlin, Germany using Node.js.

## Manual

The application includes templates that can be used to create new node projects. It has three main modes:
- ```node index.js ls templates```
  - shows a list of available templates
  - templates should be in the templates folder of this project
- ```node index.js create templateName name=projectName dest=targetDirectory```
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
