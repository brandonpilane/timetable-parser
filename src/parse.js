function parseTimetable(rawData) {
  const sections = {};
  let currentVenue = null;
  let weekdays = [];

  for (const row of rawData) {
    const firstCell = row[0];

    // Detect venue
    if (typeof firstCell === "string" && firstCell.startsWith("VENUE:")) {
      currentVenue = firstCell.replace("VENUE:", "").trim();
      sections[currentVenue] = [];
      weekdays = []; // reset for new venue
      continue;
    }

    if (!currentVenue) continue; // skip anything before first venue

    // Detect header row
    if (
      row.length >= 6 &&
      row.slice(1, 6).every((cell) => typeof cell === "string")
    ) {
      weekdays = row.slice(1, 6); // "Monday" to "Friday"
      continue; // skip header itself
    }

    // Collect lesson rows (still raw for now)
    sections[currentVenue].push(row);
  }

  return sections;
}

module.exports = { parseTimetable };
