const commander = require('commander');

const { fileCopy } = require('./file-copy');

commander.option('-s, --source <type>', 'source file');
commander.option('-t, --target <type>', 'target file');

commander.parse(process.argv);

fileCopy(commander.source, commander.target).then(() => console.log('File was copied'));