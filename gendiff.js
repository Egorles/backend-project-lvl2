const { Command } = require('commander');
const { createReport } = require('./utils.js');

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.');

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    console.log(createReport(filepath1, filepath2));
  });

program.parse();
