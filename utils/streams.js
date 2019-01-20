const program = require('commander');

program
    .version('0.1.0')
    .option('-a, --action <type>', 'action type')
    .option('-f, --file [path]', 'set the path to file');

program.on('--help', function () {
    console.log('Would you mind to help me, sir?');
});

program.parse(process.argv);

console.log('program: ', program);
console.log('-----------------------------------------');

const {help, action, file} = program;

console.log('help: ', help);
console.log('action: ', action);
console.log('file: ', file);

function actionHandler(arg) {
    console.log('--- actionHandler', arg);
}


function reverse(str) {
    console.log('reverse', str);
}

function transform(str) {
    console.log('transform', str);
}

function outputFile(filePath) {
    console.log('outputFile', filePath);
}

function convertFromFile(filePath) {
    console.log('convertFromFile', filePath);
}

function convertToFile(filePath) {
    console.log('convertToFile', filePath);
}
