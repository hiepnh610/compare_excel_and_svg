const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const XLSX      = require('xlsx');
const fs        = require('fs');
const jsdom     = require("jsdom");
const { JSDOM } = jsdom;


const excelFile = XLSX.readFile('xlsx/91091185.xlsx');
const worksheet = excelFile.Sheets[excelFile.SheetNames[0]];

const columnC = [];

for (let z in worksheet) {
  if(z.toString() !== 'C1' && z.toString()[0] === 'C') {
    columnC.push(worksheet[z].v);
  }
}

fs.readFile('./svg/91091185.svg', (err, data) => {
  if (err) throw err;

  const dom = new JSDOM(data);
  console.log(dom.window.document.getElementsByTagName('g'));
});

http.listen(3000, () => {
  console.log(`This app listen on port 3000`);
});
