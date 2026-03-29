function parseTimetable(rawData) {
  const sections = {};
  let currentVenue = null;

  for (const row of rawData) {
    const firstCell = row[0];

    // Detect venue
    if (typeof firstCell === "string" && firstCell.startsWith("VENUE:")) {
      currentVenue = firstCell.replace("VENUE:", "").trim();
      sections[currentVenue] = [];
      continue;
    }

    // Collect the rows under that venue
    if (currentVenue) {
      sections[currentVenue].push(row);
    }
  }

  return sections;
}

module.exports = { parseTimetable };
