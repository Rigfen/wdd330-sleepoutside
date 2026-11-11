// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// getParam returns parameter fro the url when requested
export function getParam(param) {
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
}
export function renderListWithTemplate(
  templatefn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
const hstmStrings=list.map(templatefn);

if (clear) {
  parentElement.innerHTML = '';
}

parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export async function loadHeaderFooter() {
  const base = import.meta.env.BASE_URL;

  const [headerResponse, footerResponse] = await Promise.all([
    fetch(`${base}partials/header.html`),
    fetch(`${base}partials/footer.html`),
  ]);

  if (!headerResponse.ok || !footerResponse.ok) {
    throw new Error("Could not load header or footer.");
  }

  document.querySelector("#main-header").innerHTML =
    await headerResponse.text();

  document.querySelector("#main-footer").innerHTML =
    await footerResponse.text();
}