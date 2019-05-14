let unitno;
let navContainerId = 'wardOrStakeUnitNav';
let listContainerId = 'middleScrollerColumn';

const renderOffenderList = list => {
  let ul = document.createElement('ul');
  ul.className = 'list';
  for (let item of list) {
    console.log(item);
  }
};
async function getOffenderList(memberElements) {
  chrome.storage.sync.get(null, items => {
    let listContainer = document.querySelector(`#${listContainerId}`);
    if (!items.zipcode) {
      // return (listContainer.innerHTML =
      //   '<span style="margin:.5rem; position: relative; top:.5rem;">Missing required location information. Please click the extension icon on your browser, enter your info, and click the "Sex Offenders" option again.</span>');
    }
    // listContainer.innerHTML =
    //   '<span style="margin:.5rem; position: relative; top:.5rem;">Loading Offenders...</span>';
    console.log('LOADING');
    chrome.runtime.sendMessage({ greeting: 'hello' }, async function(response) {
      console.log('LOADED');
      let offenderTable = response;
      let div = document.createElement('div');
      div.innerHTML = offenderTable;
      let offenders = [];
      let cells = div.querySelectorAll('tbody td:nth-child(5)');
      let imageCells = div.querySelectorAll('tbody td:nth-child(2)');
      for (let [index, cell] of cells.entries()) {
        let image = imageCells[index].querySelector('img');
        offenders.push({
          name: cell.textContent.toLowerCase().trim(),
          imageUrl: image ? image.src : ''
        });
      }
      let offendersList = offenders;
      let parsedOffenders = [];
      for (let { name, imageUrl } of offendersList) {
        let [firstName, lastName] = name.split(' ');
        parsedOffenders.push({ firstName, lastName, imageUrl });
      }
      let letters = document.querySelectorAll('[class*="Listing__Header"]');
      letters.forEach(letter => (letter.style.display = 'none'));
      for (let element of memberElements) {
        let hasMatch = false;
        for (let { firstName, lastName, imageUrl } of parsedOffenders) {
          let memberNames = element.textContent.toLowerCase();
          hasMatch =
            memberNames.includes(firstName) && memberNames.includes(lastName);
          if (hasMatch) {
            console.log({ memberNames, firstName, lastName });
            break;
          }
        }
        console.log({ hasMatch });
        if (!hasMatch) {
          element.parentElement.style.display = 'none';
        }
      }
      console.log('LOADED');
    });
  });
}

let showingOffenders = false;

function showOffenders() {
  let toggle = document.querySelector('#offenders-toggle');
  toggle.textContent = 'Remove offender filter';
  let wardMemberElements = document.querySelectorAll(
    '[class*="ListingEntry__HouseholdEntry"]'
  );
  getOffenderList(wardMemberElements);
}

function hideOffenders() {
  let toggle = document.querySelector('#offenders-toggle');
  toggle.textContent = 'Show sex offenders';
}

function offendersFilter() {
  showingOffenders = !showingOffenders;
  showingOffenders ? showOffenders() : hideOffenders();
}

function insertOffenderOption(categoryDiv) {
  let offenderToggle = document.createElement('span');
  offenderToggle.id = 'offenders-toggle';
  offenderToggle.textContent = 'Show sex offenders';
  offenderToggle.style.cssText = `
    color: rgb(1, 182, 209);
    cursor: pointer;
    float: right;
  `;
  offenderToggle.addEventListener('click', offendersFilter);
  categoryDiv.appendChild(offenderToggle);
}
var interval = window.setInterval(() => {
  let element = document.querySelector(`[class*="directory__TypeFilter"]`);
  if (element) {
    insertOffenderOption(element);
    window.clearInterval(interval);
  }
}, 500);
console.log('CHANGE DETECTED');
