# nodeMentoring2018Q4

## HOMEWORK 1
### NODE.JS MODULES. NPM
#### Installing Node.js & Configuring Babel with Nodemon
1. Install ​Node.js​​ (choose any option that suits you ​nvm​, ​brew​, ​apt​, ​.exe​, etc).
2. Create a directory for the future project.
3. Use ​npm ​​to set author name and email for ​npm config​​:a.Use ​npm -l​​​to​​​discover available npm commands and full usage info.
4. Initialize ​package.json​​ using ​npm​​ command.
5. Create the main application file ​app.js​​. This file will be executed on ​npm start​.
6. Install the following npm packages as ​devDependencies​​:
    - Babel core
    - Babel preset env
    - Babel preset stage 2
    - Babel register
    - Nodemon
After the installation all these packages should be saved and listed in ​package.json​​.
7. Configure ​scripts​​ section in ​package.json​​ to include:
    - start ​​script which should compile ​app.js ​​using ​babel ​​and run it in ​nodemon​​.
    - test​​ script to run application tests that we will create in the future (for now it couldbe empty).

#### Adding Modules
1. Create ​config​​ directory inside your project.
2. Create ​json ​​module in ​config​​ directory to store configs of application. For now add justone field ​name ​​that stores the name of the app: ​“Node.js Homework Application”​.
3. Create ​models​​ directory.
4. Create ​User.js ​​module in ​models​​ directory. It should implement and export class ​User(​use​​ECMAScript2015​​) with a ​constructor ​​that logs ​“User module”​ to console.
5. Create ​Product.js ​​module in ​models​​ directory which exports ​Product​​ class with aconstructor​​ that logs ​“Product module”​ to console.
6. In the main application file import ​json ​​module defined in ​config ​​directory (​useECMAScript2015​​as well instead of ​require​​) and log the name of application toconsole.
7. In the main application file import modules defined in ​models ​​directory. There should beone ​import​​ command that brings all our models to the app.
8. Create instances of ​User​​ and ​Product​​ classes. Appropriate messages should be loggedto console.

#### Evaluation Criteria
1. Nothing has been done except the project’s structure.
2. package.json​​ has been created and contains the list of required packages.
3. All three modules have been created and the classes have been implemented.
4. The modules are imported to the main module as described in task 7 and 8.
5. package.json “start”​​ script uses babel and nodemon to run the app.
---

## HOMEWORK 2
### ASYNC DEVELOPMENT
#### Installing Node.js & Configuring Babel with Nodemon
1. Create a directory called ​*data*​. We will assume that CSV files with new products will beuploaded in this directory for processing by our application
2. In your application create a local module called ​*dirwatcher*​. Create class *​DirWatcherthat* should be able to watch a given ​**path**​​ with a given **​delay** ​​and emit a​​ *‘​changed​‘* eventif directory contents have been changed (implement method *watch(path, delay)* by yourself, try not to use native ​*fs.watch()​*).
NB: When the path is checked for the first time all files should be treated as new.
3. Create a module called ​*importer​*. Create class ​*Importer​*. It should be able to listen to *DirWatcher* ​events and start importing CSV files (converting the data to JavaScriptobjects) on *‘​dirwatcher:changed​’* event.
    - Implement ​*import(path)*​: should return a **​promise** ​​with imported data from file at *​path*​
    - Implement ​*importSync(path)*​: should be synchronous and return all importeddata from file at *​path*​
4. In ​**app.js**​:​
    - Import all of the above modules
    - Create a ​Dirwatcher​ and ​Importer​ for processing files asynchronously fromdata ​directory
    - Log imported data to console
    
*Note*: every CSV file in a directory should be processed only once.
*Note*: feel free to use already implemented library for transforming CSV into JSON


#### Evaluation Criteria
1. CSV files are placed in appropriate directory.
2. DirWatcher​ module is implemented and matches described criteria.
3. Importer ​module is implemented and matches described criteria.
4. Application logic is implemented for a fixed (predefined) number of CSV files.
5. Application logic is implemented for arbitrary number of CSV files (all tasks and subtasksare implemented properly) which could be added/changed/removed at any time.
---
