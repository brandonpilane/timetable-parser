const XLSX = require("xlsx");
const { parseTimetable } = require("./parse");

const workbook = XLSX.readFile("data/timetable.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Get merged ranges
const merges = sheet["!merges"] || [];

// Convert to JSON with headers
const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const result = parseTimetable(raw, merges);

console.log(JSON.stringify(result, null, 2));
