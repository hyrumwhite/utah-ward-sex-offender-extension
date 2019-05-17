let card = document.createElement('div');
card.style.cssText = `
          background: white;
          box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
          border-radius: 3px;
          position: fixed;
          right: 1rem;
          bottom: -5rem;
          z-index: 999999;
          display: flex;
          align-items: center;
          transition: .3s;
          padding: 1.5rem;
        `;
card.textContent = 'Updated Ward Sex Offender Extension data.';
document.body.appendChild(card);

const getUnitNumber = () => {
  let path = window.location.pathname.slice(1);
  let [unitNumber] = path.split('/');
  return unitNumber;
};
let unitNumber = getUnitNumber();
if (!unitNumber) {
  let intervalId = window.setInterval(() => {
    unitNumber = getUnitNumber();
    if (unitNumber) {
      window.clearInterval(intervalId);
      getWardMembers();
    }
  }, 100);
}
let imageUrl = '/api/v4/photos/households/${houseHoldUuid}?thumbnail=true';
const getWardMembers = async () => {
  chrome.storage.local.set({ unitNumber }, function() {
    console.log('set unit number');
  });
  try {
    let response = await fetch(`/api/v4/households?unit=${unitNumber}`, {
      credentials: 'include'
    });
    if (response.ok) {
      let members = await response.json();
      chrome.storage.local.set({ members }, () => {
        card.style.bottom = '1rem';
        window.setTimeout(() => (card.style.bottom = '-5rem'), 3000);
      });
    }
  } catch (e) {
    console.log(e);
  }
};
if (!isNaN(parseInt(unitNumber))) {
  getWardMembers();
}
