const { test, expect } = require('@jest/globals');
const path = require('path');
const { createReport } = require('../src/createReport.js');

const jsonPath1 = path.join(__dirname, '..', '__fixtures__', 'json_file1.json');
const jsonPath2 = path.join(__dirname, '..', '__fixtures__', 'json_file2.json');
const ymlPath1 = path.join(__dirname, '..', '__fixtures__', 'yml_file1.yml');
const ymlPath2 = path.join(__dirname, '..', '__fixtures__', 'yml_file2.yml');

const expectedResult = `{
  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('json should work correct', () => {
  expect(createReport(jsonPath1, jsonPath2)).toBe(expectedResult);
});

test('yml should work correct', () => {
  expect(createReport(ymlPath1, ymlPath2)).toBe(expectedResult);
});
