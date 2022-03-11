const fs = require('fs');
const _ = require('lodash');

const getDiff = (json1, json2, key) => {
    if (json1[key] === json2[key]) {
      return `  ${key}: ${json1[key]}`;
    } else if (json1[key] === undefined) {
      return `+ ${key}: ${json2[key]}`;
    } else if (json2[key] === undefined) {
      return `- ${key}: ${json1[key]}`;
    } else if (json1[key] !== json2[key]) {
      return `- ${key}: ${json1[key]}\n+ ${key}: ${json2[key]}`;
    }
  };

module.exports = {
  createReport: function (filepath1, filepath2) {
    const json1 = JSON.parse(fs.readFileSync(filepath1));
    const json2 = JSON.parse(fs.readFileSync(filepath2));
      
    const keys = new Set([..._.keys(json1), ..._.keys(json2)]);
    const report = ['{'];
      
    keys.forEach(key => {
      report.push(getDiff(json1, json2, key));
    })
    
    report.push('}');
      
    return report.join('\n');    
  },
};
