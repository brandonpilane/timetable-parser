const XLSX = require("xlsx");
const { parseTimetable } = require("./parse");

const workbook = XLSX.readFile("data/timetable.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const result = parseTimetable(raw);


console.log(JSON.stringify(result, null, 2));
