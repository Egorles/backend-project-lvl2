const fs = require('fs');
const _ = require('lodash');
const yaml = require('js-yaml');
const path = require('path');

const getData = (filePath) => {
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
};

const getDiff = (obj1, obj2, key) => {
  if (obj1[key] === obj2[key]) {
    return `  ${key}: ${obj1[key]}`;
  } if (obj1[key] === undefined) {
    return `+ ${key}: ${obj2[key]}`;
  } if (obj2[key] === undefined) {
    return `- ${key}: ${obj1[key]}`;
  } if (obj1[key] !== obj2[key]) {
    return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
  }
  return undefined;
};

module.exports = {
  createReport(filepath1, filepath2) {
    const data1 = getData(filepath1);
    const data2 = getData(filepath2);

    const keys = Array.from(new Set([..._.keys(data1), ..._.keys(data2)]));
    const stringsReport = keys.map((key) => getDiff(data1, data2, key));

    const report = ['{', ...stringsReport, '}'];

    return report.join('\n');
  },
};
