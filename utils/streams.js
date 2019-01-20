const program = require('commander');


let args = process.argv.slice(2);
const helpRegExp = /^(-h|--help)$/;

// Checks whether any command is provided and output help if no
if (!args.length) {
    console.log('No inputs found!');
    program.outputHelp();
}

// Ignores --help option if other options were passed before
if (hasHelpArg(args) && !isHelpArg(args[0])) {
    process.argv = process.argv.filter(arg => !isHelpArg(arg));
}

program
    .version('0.1.0')
    .option('-a, --action <type>', 'action type')
    .option('-f, --file [path]', 'set the path to file');

program.on('--help', function () {
    console.log('Would you mind to help me, sir?');
});

program.parse(process.argv);


if (program.action) {
    actionOptionHandler(program.action)
}

function actionOptionHandler(arg) {
    switch (arg) {
        case 'reverse': {
            reverse();
            break;
        }
        case 'transform': {
            transform();
            break;
        }
        default: {
            console.log('ERROR');
        }
    }
}


function reverse() {
    process.stdin.on('data', data => {
        const reversedStr = convertBufferToString(data)
            .split('')
            .reverse()
            .join('');

        process
            .stdout
            .write(`${reversedStr}\n`);
    });
}

function transform() {
    process.stdin.on('data', data => {
        const upperCaseStr = convertBufferToString(data).toUpperCase();

        process.stdout.write(`${upperCaseStr}\n`);
    });
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


/*--------------------------------------------------*/

/*------------------- helpers ----------------------*/

function isHelpArg(arg) {
    return helpRegExp.test(arg);
}

function hasHelpArg(arr) {
    return arr.some(curVal => isHelpArg(curVal));
}

function convertBufferToString(buffer) {
    return buffer.toString().trim();
}