function parseTimetable(rawData) {
  const sections = {};
  let currentVenue = null;
  let weekdays = [];

  for (const row of rawData) {
    const firstCell = row[0];

    // Detect venue
    if (typeof firstCell === "string" && firstCell.startsWith("VENUE:")) {
      currentVenue = firstCell.replace("VENUE:", "").trim();
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
          typeof row[i + 1] === "string" &&
          row[i + 1].trim().toUpperCase() === day,
      )
    ) {
      weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
      continue;
    }

    // Skip rows that are too short or have no time
    if (!firstCell || typeof firstCell !== "string") continue;

    // Extract lessons
    for (let i = 1; i <= 5; i++) {
      const subject = row[i];
      if (subject && subject.trim() !== "") {
        sections[currentVenue].push({
          day: weekdays[i - 1],
          time: firstCell,
          subject: subject.trim(),
        });
      }
    }
  }

  return sections;
}

module.exports = { parseTimetable };
