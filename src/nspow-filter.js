let boxShadow =
  '0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12)';
let button = document.createElement('button');
button.textContent = 'Show Possible Ward Members';

let header = document.querySelector('article > header > h2');

header.appendChild(button);
button.style.cssText = `
  float: right;
  margin-right: 204px;
  font-size: 1rem;
  border: 1px solid #006a89;
  background-color: #0091BC;
  border-radius: 4px;
  color: #fff;
  font-weight: normal;
  padding: .5em 1em;
  text-decoration: none;
  line-height: 1.42857143;
  cursor: pointer;
  transition: background 0.1s;
`;
button.addEventListener(
  'mouseenter',
  () => (button.style.backgroundColor = '#13617f')
);
button.addEventListener(
  'mouseleave',
  () => (button.style.backgroundColor = '#0091BC')
);

// function showMemberCard($event, member) {
//   let { target } = $event;
//   let { left, top, width } = target.getBoundingClientRect();
//   let card = document.createElement('div');
//   card.id = 'extension-member-card';
//   card.style.cssText = `
//     background: white;
//     box-shadow: ${boxShadow};
//     border-radius: 3px;
//     position: fixed;
//     width: 500px;
//     left: ${left + width / 2 - 250}px;
//     bottom: ${top}px
//   `;
//   let h2 = document.createElement('h2');
//   h2.textContent = member.displayName;
//   card.appendChild(h2);
//   document.body.appendChild(card);
// }

// function removeMemberCard() {
//   let card = document.querySelector('#extension-member-card');
//   card && card.parentElement.removeChild(card);
// }

function showMemberMatchToggle(element, member) {
  let div = document.createElement('a');
  div.textContent = 'Possible ward member';
  div.setAttribute('target', '_blank');
  div.style.color = '#0091BC';
  let uuid = member.householdUuid;
  chrome.storage.local.get({ unitNumber: '' }, ({ unitNumber }) => {
    div.href = `https://directory.lds.org/${unitNumber}/households/${uuid}`;
    element.appendChild(div);
  });
}
button.addEventListener('click', () => {
  chrome.storage.local.get({ members: [] }, ({ members: households }) => {
    console.log({ households });
    if (households.length) {
      let offendersNames = document.querySelectorAll(
        '.results-offenders tbody tr .name'
      );
      let foundAnyMatch = false;
      for (let nameTd of offendersNames) {
        let foundMatch = false;
        let memberMatch = {};
        for (let { members, uuid } of households) {
          for (let member of members) {
            let { givenName, surname, positions } = member;
            let memberSurname = surname.toLowerCase();
            givenName = givenName.toLowerCase();
            let memberGivenNameArray = givenName.split(' ');
            let name = nameTd.textContent.trim().toLowerCase();
            let [lastName, othernames] = name.split(',');
            othernames = othernames.trim();
            let otherNameArray = othernames.split(' ');
            if (
              memberSurname === lastName &&
              otherNameArray[0] === memberGivenNameArray[0] &&
              otherNameArray[1] === memberGivenNameArray[1]
            ) {
              foundAnyMatch = true;
              foundMatch = true;
              member.householdUuid = uuid;
              memberMatch = member;
            }
          }
        }
        if (!foundMatch) {
          nameTd.parentElement.style.display = 'none';
        } else {
          showMemberMatchToggle(nameTd, memberMatch);
        }
      }
      if (!foundAnyMatch) {
        let table = document.querySelector('.results-offenders tbody');
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent =
          'No matches from your ward found. Refresh the page to see all results again.';
        td.setAttribute('colspan', 4);
        tr.appendChild(td);
        table.appendChild(tr);
      }
    } else {
      window.alert(
        'Please visit directory.lds.org and log in to see possible ward matches.'
      );
    }
  });
});
