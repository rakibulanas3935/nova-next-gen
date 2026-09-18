import sanitizeHtml from "sanitize-html";

// Defence in depth: the API already sanitises on write, we sanitise again
// on render so old/unsanitised records can never inject markup.
const options = {
  allowedTags: [
    "p", "br", "strong", "em", "u", "s", "a", "ul", "ol", "li",
    "h1", "h2", "h3", "h4", "blockquote", "code", "pre", "hr", "img",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"],
  },
  allowedSchemes: ["http", "https", "mailto"],
  transformTags: {
    a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
  },
};

export const cleanHtml = (html) => (typeof html === "string" ? sanitizeHtml(html, options) : "");

export const toText = (html, max = 160) => {
  const text = sanitizeHtml(html || "", { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};
