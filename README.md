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
#### Tasks
1. Create a directory called ​*data*​. We will assume that CSV files with 
new products will be uploaded in this directory for processing by our application
2. In your application create a local module called ​*dirwatcher*​. Create
 class *​DirWatcher* that should be able to watch a given ​**path**​​ with a 
 given **​delay** ​​and emit a​​ *‘​changed​‘* event if directory contents 
 have been changed (implement method *watch(path, delay)* by yourself, 
 try not to use native ​*fs.watch()​*).
NB: When the path is checked for the first time all files should be 
treated as new.
3. Create a module called ​*importer​*. Create class ​*Importer​*. It should 
be able to listen to *DirWatcher* ​events and start importing CSV files 
(converting the data to JavaScript objects) on *‘​dirwatcher:changed​’* event.
    - Implement ​*import(path)*​: should return a **​promise** ​​with imported
     data from file at *​path*​
    - Implement ​*importSync(path)*​: should be synchronous and return all
     importeddata from file at *​path*​
4. In ​**app.js**​:​
    - Import all of the above modules
    - Create a ​Dirwatcher​ and ​Importer​ for processing files asynchronously 
    from **data** ​directory
    - Log imported data to console
    
*Note*: every CSV file in a directory should be processed only once.

*Note*: feel free to use already implemented library for transforming 
CSV into JSON


#### Evaluation Criteria
1. CSV files are placed in appropriate directory.
2. DirWatcher​ module is implemented and matches described criteria.
3. Importer ​module is implemented and matches described criteria.
4. Application logic is implemented for a fixed (predefined) number of CSV files.
5. Application logic is implemented for arbitrary number of CSV files 
(all tasks and subtasksare implemented properly) which could be added/changed/removed at any time.
---

## HOMEWORK 3
### COMMAND LINE. DEBUGGING. ERROR HANDLING / FILE SYSTEM AND STREAMS
#### Tasks
1. Create directory utils. Create util module called streams.js inside this directory.
2. This util should be able to work with command line following the next requirements:
    - Should consist of functions which will be run as actions.
    - Should receive an action name as a first argument by --action option
    - Should receive an optional second argument for actions which may require it by
      --file option
    - Should process --help key. If this option is passed as a first argument, print
      usage message and ignore other options. Ignore this option if other options were
      passed before
    - Should support shortcuts for options as well (-a for --action, -f for --file and
      -h for --help respectively). Please note that util should work correctly with any
      option provided regardless its form (full or shortcuted).
      
  Example:
  ```js
  // === streams.js ===
  
  // Main actions to be called
  
  function reverse(str) { /* ... */ }
  function transform(str) { /* ... */ }
  function outputFile(filePath) { /* ... */ }
  function convertFromFile(filePath) { /* ... */ }
  function convertToFile(filePath) { /* ... */ }
  
  /*
  *
  * **** CODE WHICH IMPLEMENTS COMMAND LINE INTERACTION ****
  *
  */
  
  
  // === Terminal ===
  
  ./streams.js --action=outputFile --file=users.csv
  ./streams.js --action=transformToFile --file=users.csv
  ./streams.js --action=transform textToTransform
  ./streams.js -a outputFile -f users.csv
  ./streams.js --help
  ./streams.js -h
  ```
  
3. If module is called without arguments, notify user about wrong input and print a usage
   message (equal to calling with --help option)
4. Appropriate action passed by --action option should be called. If action requires
   additional argument, it should be called with that argument provided with --file option.
5. If streams.js util does not contain an action passed or received argument is invalid,
   appropriate error message should be shown to user. Additionally, util may throw relevant
   exception.
6. Any number of action functions inside streams.js could be implemented but the
   following ones are mandatory for realization:
    - reverse function to reverse string data from process.stdin to process.stdout.
    -  transform function to convert data from process.stdin to upper-cased data on
      process.stdout (e.g. using through2 module).
    - outputFile function that will use fs.createReadStream() to pipe the given file
      provided by --file option to process.stdout.
    - convertFromFile function to convert file provided by --file option from csv to
      json and output data to process.stdout. Function should check that the passed
      file name is valid (see task 5).
    - convertToFile function to convert file provided by --file option from csv to
      json and output data to a result file with the same name but json extension.
      Function should check that the passed file name is valid (see task 5) and use
      fs.createWriteStream additionally
7. Implement cssBundler action function which will use an extra parameter --path (-p as
   a shortcut). It should do the following:
    - Grab all css files from the given path provided by --path option.
    - Concat them into one (big) css file
    - Add contents of https://epa.ms/nodejs18-hw3-css to the end of the result file.
    - Save the output in the file called bundle.css placed in the same provided path.
      
  Example:
  ```js
  ./streams.js --action=cssBundler --path=./assets/css
  ./streams.js --action=cssBundler -p ./assets/css
  ```    


#### Evaluation Criteria
1. utils directory and empty streams.js file were created.
2. streams.js util is able to read command line and output help usage.
3. Util meets all requirements for command line interaction. Most of mandatory
   actions are implemented and called when appropriate arguments are passed.
4. All required actions are implemented from task 6. Some error handlings are
   implemented, util validates some of parameters passed to it.
5. All actions are implemented including an extra one from task 7. Util handles all
   possible error cases and validates all required parameters.
---

Transform flow hint:
  ```js
  // Transform stream takes input data and applies an operation to the data to
  // produce the output data.
  // Create a through stream with `write` and `end` functions:
  
      const through = require('through2');
      const stream = through(write, end);
  
  // The `write` function is called for every buffer of available input:
  
      function write (buffer, encoding, next) {
      // ...
      }
      
  // and the `end` function is called when there is no more data:
  
      function end () {
      // ...
      }
      
  // Inside the write function, call `this.push()` to produce output data and
  // call `next()` when you're ready to receive the next chunk:
  
      function write (buffer, encoding, next) {
          this.push('I got some data: ' + buffer + '\n');
          next();
      }
  // and call `done()` to finish the output:
  
    function end (done) {
        done();
    }
  // `write` and `end` are both optional.
  
  // If `write` is not specified, the default implementation passes the input
  // data to the output unmodified.
  
  // If `end` is not specified, the default implementation calls
  // `this.push(null)` to close the output side when the input side ends.
  
  // Make sure to pipe `process.stdin` into your transform stream
  // and pipe your transform stream into `process.stdout`:
  
    process.stdin.pipe(tr).pipe(process.stdout);
    
  // To convert a buffer to a string call `buffer.toString()`
  ```  

---

## HOMEWORK 4
### MIDDLEWARE. FRAMEWORKS
#### Tasks
1. In a separate directory (e.g. ​http-servers​) create three files called ​plain-text-server.js​​,html-server.js ​​and​ json-server.js​​ respectively. Implement basic ​http server​​ using ​httpmodule in each of them with the following requirements:
   
