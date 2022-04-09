const { test, expect } = require('@jest/globals');
const path = require('path');
const { createReport } = require('../utils.js');

const path1 = path.join(__dirname, '..', '__fixtures__', 'file1.json');
const path2 = path.join(__dirname, '..', '__fixtures__', 'file2.json');

const expectedResult = `{
  host: hexlet.io
- timeout: 50
+ timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

test('should work correct', () => {
  expect(createReport(path1, path2)).toBe(expectedResult);
});
