const fs = require("fs");
const XLSX = require("xlsx");
const { parseTimetable } = require("./parse");

const workbook = XLSX.readFile("data/timetable.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

// Get merged ranges
const merges = sheet["!merges"] || [];

// Convert to JSON with headers
const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

const result = parseTimetable(raw, merges);

// Prints the timetable to the console
// console.log(JSON.stringify(result, null, 2));

// Write to file
fs.writeFileSync("data/timetable.json", JSON.stringify(result, null, 2));

console.log("Timetable written to data/timetable.json");
