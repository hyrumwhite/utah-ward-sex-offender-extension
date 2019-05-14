import debounce from "../lib/debounce.js";

// reload data into page
chrome.storage.sync.get(null, items => {
  for (let key in items) {
    const element = document.getElementById(key);

    if (!element) {
      return;
    }

    element.value = items[key];
  }
});

// save values when updated
const save = debounce(({ target }) => {
  const id = target.id;
  const value = target.value;

  chrome.storage.sync.set({ [id] : value }, () => {
    console.log(`"${id}" is set to "${value}"`);
  });
}, 400);

document.querySelectorAll("input, select").forEach(input => {
  input.addEventListener("input", save);
});
