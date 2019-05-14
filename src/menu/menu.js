import debounce from "../lib/debounce.js";
import app from "../lib/app.js";

async function loadStoredData() {
    const data = await app.getData();

    Object.entries(data).forEach(([ key, value ]) => {
        const element = document.getElementById(key);

        element.value = value;
    });
}

window.onload = () => {
    loadStoredData();
    
    const save = debounce(({ target }) => {
        app.setData({ [target.id]: target.value });
    }, 400);
    
    document.querySelectorAll("input, select").forEach(input => {
        input.addEventListener("input", save);
    });
};
