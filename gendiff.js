const { Command } = require('commander');
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.');

program
  .option('-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information');

program.parse();