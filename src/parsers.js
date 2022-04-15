const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

module.exports = {
  getData(filePath) {
    const format = path.extname(filePath);
    const data = fs.readFileSync(filePath);

    let parse;
    switch (format) {
      case '.json':
        parse = JSON.parse;
        break;
      case '.yml':
      case '.yaml':
        parse = yaml.load;
        break;
      default:
        parse = JSON.parse;
    }

    return parse(data);
  },
};
