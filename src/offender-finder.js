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
    if (!items.zipcode) {
      // return (listContainer.innerHTML =
      //   '<span style="margin:.5rem; position: relative; top:.5rem;">Missing required location information. Please click the extension icon on your browser, enter your info, and click the "Sex Offenders" option again.</span>');
    }
    // listContainer.innerHTML =
    //   '<span style="margin:.5rem; position: relative; top:.5rem;">Loading Offenders...</span>';

    dialog.querySelector('#extension-dialog-body').textContent =
      'Loading offenders. This may take several seconds.';
    chrome.runtime.sendMessage({ greeting: 'hello' }, async function(response) {
      dialog.close();
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

let dialog;
function offendersFilter() {
  showingOffenders = !showingOffenders;
  if (showingOffenders) {
    dialog.style.opacity = 1;
    dialog.showModal();
  } else {
    dialog.close();
    hideOffenders();
  }
}
function initializeDialog() {
  dialog && (dialog.innerHTML = '');
  dialog = dialog || document.createElement('dialog');
  dialog.id = 'extension-dialog';
  dialog.style.cssText = `
    opacity: 0;
    display:flex;
    flex-direction: column;
    background: white;
    border-radius: .25rem;
    padding: .5rem;
    position: fixed;
    top: 30%;
    border: 1px solid #e0e0e0;
    max-width: 60vw;
    width: 60vw;
    transition: .3s;
    border: none;
  `;
  let header = document.createElement('h2');
  header.textContent = 'Disclaimer';
  header.style.cssText = `
    border-bottom: 1px solid #e0e0e0;
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: .5rem;
  `;
  dialog.appendChild(header);
  let body = document.createElement('div');
  body.id = 'extension-dialog-body';
  body.style.marginTop = '.5rem';
  body.style.marginBottom = '.5rem';
  body.textContent =
    'This filter is best guess only. No one in this list is guaranteed to be a sex offender. Please independently verify. Do not use this information to harass or attack the registered sex offenders. It is for informational use and awareness only.';
  dialog.appendChild(body);
  let buttonRow = document.createElement('div');
  buttonRow.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: .5rem;
    border-top: 1px solid #e0e0e0;
  `;
  let okButton = document.createElement('button');
  okButton.style.cssText = `
    background: rgb(23, 124, 156);
    padding: .5rem;
    border-radius: 3px;
    border: none;
    color: white;
    cursor: pointer;
  `;
  okButton.addEventListener('click', showOffenders);
  okButton.textContent = 'Ok';
  buttonRow.appendChild(okButton);
  dialog.appendChild(buttonRow);
  dialog.addEventListener('close', () => (dialog.style.opacity = 0));
  document.body.appendChild(dialog);
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
// var interval = window.setInterval(() => {
//   let element = document.querySelector(`[class*="directory__TypeFilter"]`);
//   if (element) {
//     insertDialog();
//     insertOffenderOption(element);
//     window.clearInterval(interval);
//   }
// }, 500);
window.setTimeout(() => {
  initializeDialog();
  let element = document.querySelector(`[class*="directory__TypeFilter"]`);
  insertOffenderOption(element);
}, 5000);
console.log('ASSDFA ASDF');
