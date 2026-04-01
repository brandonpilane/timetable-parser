const TYPES = ["LECTURE", "LAB", "TUTORIAL"];

function parseSubject(raw) {
  const words = raw.trim().split(/\s+/);

  const typeIndex = words.findIndex((w) => TYPES.includes(w.toUpperCase()));

  if (typeIndex === -1) {
    if (words.length === 3) {
      // Handles case where there is a group name but no type
      return {
        course: words.slice(0, 2).join(" "),
        type: null,
        group: words[2],
      };
    }

    return {
      course: raw,
      type: null,
      group: null,
    };
  }

  return {
    course: words.slice(0, typeIndex).join(" "),
    type: words[typeIndex].toUpperCase(),
    group: words.slice(typeIndex + 1).join(" ") || null,
  };
}

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

    // Skip rows that are not strings or don't have a time
    if (typeof firstCell !== "string") continue;
    const timeMatch = firstCell.match(/^\d{4}-\d{4}$/);
    if (!timeMatch) continue;

    const [timeStart, timeEnd] = firstCell.split("-");

    // Extract lessons with merged cell handling
    for (let i = 1; i <= 5; i++) {
      const subject = getMergedValue(r, i);
      if (subject && subject.toString().trim() !== "") {
        const parsed = parseSubject(subject.toString());
        sections[currentVenue].push({
          day: weekdays[i - 1],
          start: timeStart,
          end: timeEnd,
          ...parsed,
        });
      }
    }
  }

  return sections;
}

module.exports = { parseTimetable };
