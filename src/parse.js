function parseTimetable(rawData, merges = []) {
  const sections = {};
  let currentVenue = null;
  let weekdays = [];

  // Helper: check if cell [r, c] is part of a merge and get the top-left value
  function getMergedValue(r, c) {
    for (const merge of merges) {
      const { s, e } = merge; // start and end {r, c}, 0-indexed
      if (r >= s.r && r <= e.r && c >= s.c && c <= e.c) {
        return rawData[s.r][s.c]; // top-left value of merged block
      }
    }
    return rawData[r][c];
  }

  for (let r = 0; r < rawData.length; r++) {
    const row = rawData[r];
    const firstCell = row[0];

    // Detect venue
    if (
      typeof firstCell === "string" &&
      firstCell.trim().toUpperCase().startsWith("VENUE:")
    ) {
      currentVenue = firstCell.split(":")[1].trim();
      if (!sections[currentVenue]) {
        // create new section only if it doesn't exist yet
        // this is to avoid overwriting existing sections
        sections[currentVenue] = [];
      }
      weekdays = []; // reset for new venue
      continue;
    }

    if (!currentVenue) continue; // skip anything before first venue

    // Detect header row
    const expectedDays = [
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
    ];

    if (
      row.length >= 6 &&
      expectedDays.every(
        (day, i) =>
          row[i + 1] && row[i + 1].toString().trim().toUpperCase() === day,
      )
    ) {
      weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      continue;
    }

    // Skip rows that are too short or have no time
    if (!firstCell || typeof firstCell !== "string") continue;

    // Extract lessons with merged cell handling
    for (let i = 1; i <= 5; i++) {
      const subject = getMergedValue(r, i);
      if (subject && subject.toString().trim() !== "") {
        sections[currentVenue].push({
          day: weekdays[i - 1],
          time: firstCell,
          subject: subject.toString().trim(),
        });
      }
    }
  }

  return sections;
}

module.exports = { parseTimetable };
