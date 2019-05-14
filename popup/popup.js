function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

let inputs = document.querySelectorAll('input');
let selects = document.querySelectorAll('select');
chrome.storage.sync.get(null, items => {
  for (let key in items) {
    let element = document.querySelector(`#${key}`);
    element && (element.value = items[key]);
  }
});
function updateSearchData($event) {
  chrome.storage.sync.set({ [this.id]: this.value }, () => {
    console.log(this.id + ' is set to ' + this.value);
  });
}
let debouncedUpdate = debounce(updateSearchData, 400);

for (let input of inputs) {
  input.addEventListener('input', debouncedUpdate);
}
for (let select of selects) {
  select.addEventListener('change', debouncedUpdate);
}
