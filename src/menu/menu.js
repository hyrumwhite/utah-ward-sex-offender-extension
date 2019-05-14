import debounce from "../lib/debounce.js";
import chrome from "../lib/chrome.js";

async function loadStoredData() {
    const data = await chrome.getData();

    Object.entries(items).forEach(([ key, value ]) => {
        const element = document.getElementById(key);

        element.value = value;
    });
}

window.onload = () => {
    loadStoredData();
    
    const save = debounce(({ target }) => {
        chrome.setData({ [target.id]: target.value });
    }, 400);
    
    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", save);
    });
};
