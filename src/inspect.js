const XLSX = require("xlsx");

const workbook = XLSX.readFile("data/timetable.xlsx");
const sheet = workbook.Sheets[workbook.SheetNames[0]];

const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log("\nFirst 30 rows:\n");

raw.slice(0, 30).forEach((row, i) => {
  console.log(`Row ${i}:`, row);
});
