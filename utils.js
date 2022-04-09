const fs = require('fs');
const _ = require('lodash');

const getDiff = (json1, json2, key) => {
  if (json1[key] === json2[key]) {
    return `  ${key}: ${json1[key]}`;
  } if (json1[key] === undefined) {
    return `+ ${key}: ${json2[key]}`;
  } if (json2[key] === undefined) {
    return `- ${key}: ${json1[key]}`;
  } if (json1[key] !== json2[key]) {
    return `- ${key}: ${json1[key]}\n+ ${key}: ${json2[key]}`;
  }
  return undefined;
};

module.exports = {
  createReport(filepath1, filepath2) {
    const json1 = JSON.parse(fs.readFileSync(filepath1));
    const json2 = JSON.parse(fs.readFileSync(filepath2));

    const keys = Array.from(new Set([..._.keys(json1), ..._.keys(json2)]));
    const stringsReport = keys.map((key) => getDiff(json1, json2, key));

    const report = ['{', ...stringsReport, '}'];

    return report.join('\n');
  },
};
