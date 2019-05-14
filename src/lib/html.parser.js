/**
 * This is fragile but works for now
 * 
 * @param {string} htmlText html string
 */
export default function htmlParser(htmlText) {
    const div = document.createElement("div");
    div.innerHTML = htmlText;

    return div;
}
