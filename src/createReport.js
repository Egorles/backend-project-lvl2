const _ = require('lodash');
const { getData } = require('./parsers.js');

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
