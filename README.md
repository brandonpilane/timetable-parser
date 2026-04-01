# Timetable Parser

A node.js script that parses the BIUST timetable into a JSON file.

## Usage

1. Clone the repository
   ```bash
   git clone https://github.com/brandonpilane/timetable-parser.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Save the timetable to `data/timetable.xlsx`
4. Run the script
   ```bash
   node src/index.js
   ```
5. The parsed timetable will be written to `data/timetable.json`

## Project Structure

timetable-parser/
├── data/ # Data and output files
│ ├── timetable.xlsx  
│ └── timetable.json
├── src/ │
| ├── index.js # Entry point
│ └── parse.js # Core parsing logic
├── package.json
└── README.md

## Output format

The output format is a JSON file with the following structure:

```json
{
  "AUDITORIUM": [
    {
      "day": "Friday",
      "time": "1100-1150",
      "subject": "PHYS 312 LAB",
      "course": "PHYS 312",
      "type": "LAB",
      "group": null
    }
  ]
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
