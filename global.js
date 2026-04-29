console.log("IT'S ALIVE!");

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

const BASE_PATH =
  location.hostname === "localhost" || location.hostname === "127.0.0.1"
    ? "/"           // Local dev server
    : "/portfolio/"; // GitHub Pages (your repo is called "portfolio")

// Define all pages on your site
let pages = [
  { url: "",         title: "Home" },
  { url: "projects/", title: "Projects" },
  { url: "contact/",  title: "Contact" },
  { url: "resume/",   title: "Resume" },
  { url: "https://github.com/jachan056", title: "GitHub" },
];

// Create a <nav> element and add it to the top of <body>
let nav = document.createElement("nav");
document.body.prepend(nav);

// Loop through pages and create a link for each
for (let p of pages) {
  let url = p.url;
  let title = p.title;

  // If the URL is internal (not http), prefix it with BASE_PATH
  if (!url.startsWith("http")) {
    url = BASE_PATH + url;
  }

  // Create the <a> element
  let a = document.createElement("a");
  a.href = url;
  a.textContent = title;

  // Highlight the current page link
  a.classList.toggle(
    "current",
    a.host === location.host && a.pathname === location.pathname
  );

  // Open external links in a new tab
  a.toggleAttribute("target", a.host !== location.host);
  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.append(a);
}

// Inject the theme switcher UI into the page
document.body.insertAdjacentHTML(
  "afterbegin",
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

// Get a reference to the <select> element
const select = document.querySelector(".color-scheme select");

// Function to apply a color scheme
function setColorScheme(scheme) {
  document.documentElement.style.setProperty("color-scheme", scheme);
  select.value = scheme;
}

// On page load: restore saved preference if it exists
if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

// When user changes the select: save + apply
select.addEventListener("input", function (event) {
  const value = event.target.value;
  localStorage.colorScheme = value;
  setColorScheme(value);
});

// Only runs on the contact page (safe on all pages)
const form = document.querySelector("form");

form?.addEventListener("submit", function (event) {
  event.preventDefault(); // Stop default form submission

  const data = new FormData(form);
  let params = [];

  for (let [name, value] of data) {
    params.push(`${name}=${encodeURIComponent(value)}`);
  }

  // Build the mailto URL with proper encoding
  const url = `${form.action}?${params.join("&")}`;
  location.href = url;
});
