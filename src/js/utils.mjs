// Find an element.
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage.
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Save data to localStorage.
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Listen for touch and click events.
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });

  qs(selector).addEventListener("click", callback);
}

// Return a parameter from the current URL.
export function getParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Render a list using a template function.
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }

  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Load the shared header and footer.
export async function loadHeaderFooter() {
  const base = import.meta.env.BASE_URL;

  const [headerResponse, footerResponse] = await Promise.all([
    fetch(`${base}partials/header.html`),
    fetch(`${base}partials/footer.html`),
  ]);

  if (!headerResponse.ok || !footerResponse.ok) {
    throw new Error("Could not load header or footer.");
  }

  const [headerHTML, footerHTML] = await Promise.all([
    headerResponse.text(),
    footerResponse.text(),
  ]);

  const header = qs("#main-header");
  const footer = qs("#main-footer");

  if (header) {
    header.innerHTML = headerHTML;
  }

  if (footer) {
    footer.innerHTML = footerHTML;
  }
}