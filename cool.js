/* ==========================================================================
   #BeCOOLforClimate: the pocket guide
   ==========================================================================
   Every word on the cards lives in STEPS and TITLE below. The page, the
   cards on screen, and the print sheet are all built from them, so a
   change here shows up everywhere at once.

   Each step has:
     letter  the big letter on the card
     title   the step's name
     about   the longer description, shown on the page under the card
     ask     the step's main question
     org     the question for organizations, speaking for themselves
     all     the question for everyone, checking what organizations say
   ========================================================================== */

import { renderSiteFoot } from "./core/site-foot.js";

const NAME = "#BeCOOLforClimate";

const TITLE = {
  tagline: "a climate conversation tool",
  lenses: [
    { label: "For organizations", line: "Tell the truth about your impacts." },
    { label: "For everyone", line: "Check those claims with open eyes." }
  ]
};

const STEPS = [
  {
    letter: "C",
    title: "Clarify your actions",
    about: "Map out what we know, identify what we don't know, and strip away the corporate greenwashing to find the baseline truth.",
    ask: "Is this position backed by reliable evidence, or is it supported by unproven claims?",
    org: "What can we prove about our climate claims, and what are we still guessing?",
    all: "What proof backs this claim, and who gains if I believe it?"
  },
  {
    letter: "O",
    title: "Observe your impacts",
    about: "Look beneath the surface at the background data, material supply chains, and underlying policy factors that keep the problem in place.",
    ask: "How do these operational structures and supply chains drive the broader problem?",
    org: "What materials, energy, and rules are behind what we make and do?",
    all: "What's behind this product or promise, and who could show me the whole picture?"
  },
  {
    letter: "O",
    title: "Own your responsibility",
    about: "Test out a highly doable, small-scale alternative in your own life or organization to actively challenge the status quo.",
    ask: "What specific decisions are within your immediate power to change, pivot, or stop right now?",
    org: "What's one small change we could test this month, and who can approve it?",
    all: "What's one choice that's mine to change, try, or stop right now?"
  },
  {
    letter: "L",
    title: "Live your values",
    about: "Evaluate the real-world results of your trial, see what worked, and turn that successful experiment into a new baseline.",
    ask: "Do your habits and decisions match the values you say matter?",
    org: "Which of our stated values show up in how we spend, hire, and partner, and which don't yet?",
    all: "Which value matters most to me, and how can I make it part of my week?"
  }
];

const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------- The cards ----------
   The swirl is the open teal ring from the Kinfeather page, drawn around
   each step's letter. `tag` is the element the card's name sits in: a
   heading on the page, a plain paragraph on the print sheet. */

const SWIRL = `<svg class="swirl" viewBox="0 0 48 48" aria-hidden="true"><path d="M37 12.5A17 17 0 1 0 39.5 32c-1 4-3.5 8-8 11"/></svg>`;

const mark = letter => `<span class="mark" aria-hidden="true">${SWIRL}<span>${esc(letter)}</span></span>`;

function lens(label, line) {
  return `<div class="lens"><p class="lens-label">${esc(label)}</p><p>${esc(line)}</p></div>`;
}

function titleCard(tag = "p") {
  return `<div class="card title-card">
  <${tag} class="card-brand">${esc(NAME)}</${tag}>
  <p class="card-tag">${esc(TITLE.tagline)}</p>
  <ul class="card-steps">${STEPS.map(s => `<li>${mark(s.letter)}<span>${esc(s.title)}</span></li>`).join("")}</ul>
  <div class="card-box">${TITLE.lenses.map(l => lens(l.label, l.line)).join("")}</div>
</div>`;
}

function stepCard(s, tag = "p") {
  return `<div class="card step-card">
  <div class="card-head">${mark(s.letter)}<${tag} class="card-name">${esc(s.title)}</${tag}></div>
  <p class="card-ask">${esc(s.ask)}</p>
  ${lens("For organizations", s.org)}
  ${lens("For everyone", s.all)}
  <p class="card-foot">${esc(NAME)}</p>
</div>`;
}

function backCard() {
  return `<div class="card back-card">
  <span class="back-mark" aria-hidden="true">${SWIRL}<span>COOL</span></span>
  <p class="back-name">${esc(NAME)}</p>
  <p class="back-tag">${esc(TITLE.tagline)}</p>
  <p class="back-url">becoolforclimate.com</p>
</div>`;
}

/* ---------- The page ---------- */

$("deck").innerHTML =
  `<li class="deck-item">${titleCard("h3")}</li>` +
  STEPS.map(s => `<li class="deck-item">${stepCard(s, "h3")}<p class="about">${esc(s.about)}</p></li>`).join("");
$("backDeck").innerHTML = backCard();

/* ---------- The print sheet ----------
   One letter page holds all five cards. With backs on, a page of nine
   backs follows, so a two-sided print puts a back behind every card on
   either flip edge. */

function buildSheet() {
  const fronts = `<div class="sheet-page">${titleCard()}${STEPS.map(s => stepCard(s)).join("")}</div>`;
  const backs = `<div class="sheet-page">${Array(9).fill(backCard()).join("")}</div>`;
  $("sheet").innerHTML = fronts + ($("withBacks").checked ? backs : "");
}

buildSheet();
$("withBacks").addEventListener("change", buildSheet);
$("printBtn").addEventListener("click", () => window.print());

renderSiteFoot($("siteFoot"), "", { name: NAME });
