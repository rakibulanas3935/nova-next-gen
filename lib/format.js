const dateFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const longFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

export const formatDate = (d) => (d ? dateFmt.format(new Date(d)) : "");
export const formatLongDate = (d) => (d ? longFmt.format(new Date(d)) : "");
export const formatTime = (d) => (d ? timeFmt.format(new Date(d)) : "");
export const formatDateTime = (d) => (d ? `${formatLongDate(d)} · ${formatTime(d)}` : "");

export const isPast = (d) => new Date(d).getTime() < Date.now();

export const timeAgo = (d) => {
  const diff = (Date.now() - new Date(d).getTime()) / 1000;
  const units = [["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [name, secs] of units) {
    const v = Math.floor(diff / secs);
    if (v >= 1) return `${v} ${name}${v > 1 ? "s" : ""} ago`;
  }
  return "just now";
};

// Local datetime string for <input type="datetime-local">
export const toLocalInput = (d) => {
  if (!d) return "";
  const date = new Date(d);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export const EVENT_TYPES = {
  stargazing: { label: "Stargazing", emoji: "🔭" },
  workshop: { label: "Workshop", emoji: "🛠️" },
  webinar: { label: "Webinar", emoji: "💻" },
  talk: { label: "Talk", emoji: "🎤" },
  meetup: { label: "Meetup", emoji: "🤝" },
  other: { label: "Event", emoji: "✨" },
};

// Google-Calendar-style .ics data URL for "Add to calendar"
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

// The v1 API returned gallery images as bare URL strings; v2 returns objects.
// Accept both so the site works against either.
export const normalizeImages = (list, offset = 0) =>
  (Array.isArray(list) ? list : []).map((img, i) =>
    typeof img === "string"
      ? { id: `img-${offset + i}`, url: img, caption: "", credit: "Deep Sky Society", createdAt: null }
      : { id: img.id || `img-${offset + i}`, credit: img.credit || "Deep Sky Society", caption: img.caption || "", ...img }
  );
