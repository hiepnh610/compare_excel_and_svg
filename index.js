const express   = require('express');
const app       = express();
const http      = require('http').Server(app);
const XLSX      = require('xlsx');
const fs        = require('fs');
const jsdom     = require("jsdom");
const _         = require('lodash');
const { JSDOM } = jsdom;

const nameFile = '91091186';

const excelFile = XLSX.readFile(`xlsx/${nameFile}.xlsx`);
const worksheet = excelFile.Sheets[excelFile.SheetNames[0]];

const getDataFromExcelFile = () => {
  let column = [];

  for (let z in worksheet) {
    if(z.toString() !== 'C1' && z.toString()[0] === 'C') {
      column.push(worksheet[z].v);
    }
  }

  return column;
};

const getDataFromSVGFile = () => {
  const listCode = getDataFromExcelFile();

  fs.readFile(`./svg/${nameFile}.svg`, (err, data) => {
    if (err) throw err;

    let seatCode = [];

    const dom = new JSDOM(data);
    const getListOfSeats = dom.window.document.getElementsByTagName('g');

    for (seat of getListOfSeats) {
      const newSeat = new JSDOM(seat.outerHTML, { includeNodeLocations: true });
      const getSeatCode = newSeat.window.document.querySelector('g').getAttribute('id');

      if (getSeatCode) {
        seatCode.push(getSeatCode);
      }
    }

    console.log('Excel', listCode.length);
    console.log('SVG', seatCode.length);

    console.log('Excel', (_.difference(listCode, seatCode)).length, _.difference(listCode, seatCode));

    console.log('SVG', (_.difference(listCode, seatCode)).length, _.difference(seatCode, listCode));
  });
};

getDataFromSVGFile();

http.listen(3000, () => {
  console.log(`This app listen on port 3000`);
});
