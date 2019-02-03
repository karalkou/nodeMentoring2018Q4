const program = require('commander');
const fs = require('fs');
const nodePath = require('path');
const csv = require('csvtojson');
const through2 = require('through2');
const CombinedStream = require('combined-stream');


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
    .option('-f, --file [path]', 'set the path to file')
    .option('-p, --path <path>', 'set the path to folder');

program.on('--help', function () {
    console.log('Would you mind to help me, sir?');
});

program.parse(process.argv);


const { action, file, path } = program;

if (action) {
    actionOptionHandler(action)
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
        case 'outputFile': {
            outputFile(file);
            break;
        }
        case 'convertFromFile': {
            convertFromFile(file);
            break;
        }
        case 'convertToFile': {
            convertToFile(file);
            break;
        }
        case 'cssBundler': {
            cssBundler(path);
            break;
        }
        default: {
            console.log('ERROR');
        }
    }
}


function reverse() {
    const reverseStr = str => str.split('').reverse().join('');

    process.stdin
        .pipe(through2(
            (data, enc, cb) => (
                cb(null, Buffer.from(reverseStr(data.toString())))
            ))
        )
        .pipe(process.stdout);
}

function transform() {
    process.stdin.on('data', data => {
        const upperCaseStr = convertBufferToString(data).toUpperCase();

        process.stdout.write(`${upperCaseStr}\n`);
    });
}

function outputFile(filePath) {
    const reader = fs.createReadStream(filePath);

    reader.on('readable', () => {
        const buffer = reader.read();

        if (buffer) {
            process.stdout.write(convertBufferToString(buffer));
        }
    });
}

function convertFromFile(filePath) {
    if (!/csv$/.test(filePath)) {
        console.log('Wrong file path');
        return;
    }

    csv().fromFile(filePath)
        .then((res) => {
            console.log(res);
        });
}

function convertToFile(filePath) {
    if (!/csv$/.test(filePath)) {
        console.log('Wrong file path');
        return;
    }

    const path = filePath.replace('csv', 'json');
    const writer = fs.createWriteStream(path);

    csv().fromFile(filePath)
        .then((res) => {
            writer.write(JSON.stringify(res));
        });
}

function cssBundler(path) {
    const BUNDLE_NAME = 'bundle.css';
    const SAMPLE_CSS = 'nodejs18-hw3.css';

    const combinedStream = CombinedStream.create();

    fs.readdir(path, (err, fileNames) => {
        if (err) {
            console.log('ERROR');
            return;
        }

        fileNames.forEach((file) => {
            const filename = nodePath.basename(file);
            if (filename === nodePath.basename(SAMPLE_CSS) || filename === BUNDLE_NAME) return;

            const stream = fs.createReadStream(`${path}/${file}`);
            combinedStream.append(stream);
        });

        const stream = fs.createReadStream(`${path}/${SAMPLE_CSS}`);
        combinedStream.append(stream);

        combinedStream.pipe(fs.createWriteStream(`${path}/${BUNDLE_NAME}`));
    });
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

/*--------------------------------------------------*/

/*------------------ questions ---------------------*/
// 1. Я заюзал два разных подхода:
//    а) в reverse - pipe
//    б) в transform, etc. - просто располагаю внутри обработки 'data', и т.п.
//   Как правильнее (точнее, что может вызвать больше сложностей)? - норм и то и другое. Просто с pipe читабельнее
// 2. Как сделать перевод строки после выполнения action в консоли? - os.eol
// 3. Строка 81 - cb(null, Buffer.from(reverseStr(data.toString()))). Можно обойтись и без Buffer.from. Зачем он? - найти статью, откуда брал пример
// 4. Как элегантнее реализовать cssBundler? - в принципе норм
