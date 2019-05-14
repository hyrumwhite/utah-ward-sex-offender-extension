/**
 * 
 * @param {function} func function to debounce
 * @param {number} wait wait in ms
 * @param {*} immediate 
 */
export default function debounce(func, wait = 1000) {
    let timerId;

    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            func(...args);
            timerId = null;
        }, wait);
    };
}
