export const isPast = (d) => new Date(d).getTime() < Date.now();

export const icsHref = (event) => {
  const fmt = (d) => new Date(d).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = event.endTime || new Date(new Date(event.eventTime).getTime() + 2 * 3600000);
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Deep Sky Society//EN", "BEGIN:VEVENT",
    `UID:${event._id}@deepskysociety`,
    `DTSTAMP:${fmt(Date.now())}`,
    `DTSTART:${fmt(event.eventTime)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${(event.title || "").replace(/[,;]/g, " ")}`,
    `LOCATION:${(event.location || event.meetLink || "Online").replace(/[,;]/g, " ")}`,
    "END:VEVENT", "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
};
