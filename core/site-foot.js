/* ==========================================================================
   CLIMATE TRAILWAY: the footer every page shares
   ==========================================================================
   The owner's legal pages, a note about what the Climate Trailway is and isn't,
   and one line about the owner. Change the words here and the Trail and
   the core reference page follow.

   The 404 page runs no scripts on purpose, so it holds a typed copy of
   this footer in its HTML. When the words here change, change that copy
   too.

   USE
     import { renderSiteFoot } from "../core/site-foot.js";
     renderSiteFoot(document.getElementById("siteFoot"));
     renderSiteFoot(el, '<p class="feedback">...</p>');  // a page's own
                                                          // line on top
     renderSiteFoot(el, "", { name: "Climate Color",  // a page's own
       extra: "One more sentence for the note." });         // name, and an
                                                          // added sentence
   ========================================================================== */

export const SITE_FOOT = {
  links: [
    { name: "Terms of Service", url: "https://kinfeather.com/terms" },
    { name: "Privacy Policy", url: "https://kinfeather.com/privacy" },
    { name: "Accessibility", url: "https://kinfeather.com/accessibility" }
  ],
  note: "{name} is an open resource. No payment, login, or download is needed. To the best of our knowledge, all outside resources linked here are also free and open to access. Kinfeather is not affiliated with the organizations that host these resources and receives no financial or other incentive for sharing them.",
  made: "{name} is a project of Kinfeather LLC.",
  name: "The Climate Trailway"
};

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* The footer's inside as HTML text. `before` is HTML a page adds on top.
   `name` swaps in the page's own name; `extra` adds a sentence to the note
   just before the line about Kinfeather's links. */
export function siteFootHTML(before = "", { name = SITE_FOOT.name, extra = "" } = {}) {
  const f = SITE_FOOT, named = s => s.replace(/\{name\}/g, name);
  const note = named(f.note).replace(" Kinfeather is not", `${extra ? " " + extra : ""} Kinfeather is not`);
  return `${before}<ul>${f.links.map(l => `<li><a href="${esc(l.url)}">${esc(l.name)}</a></li>`).join("")}</ul>` +
    `<p class="site-note">${esc(note)}</p><p>${esc(named(f.made))}</p>`;
}

/* Fills a <footer class="site-foot"> element. */
export function renderSiteFoot(el, before = "", opts) {
  if (el) el.innerHTML = siteFootHTML(before, opts);
}
