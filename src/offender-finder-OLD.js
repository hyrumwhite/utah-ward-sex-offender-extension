let unitno;
let navContainerId = 'wardOrStakeUnitNav';
let listContainerId = 'middleScrollerColumn';

function markLiSelected(offenderLi) {
  let selectedLi = document.querySelector(`#${navContainerId} .selected`);
  selectedLi.classList.remove('selected');
  offenderLi.classList.add('selected');
}
const renderDetails = details => {
  let detailsContainer = document.querySelector('#details');
  let headOfHouseholdCalling = details.headOfHousehold.callings[0];
  headOfHouseholdCalling =
    typeof headOfHouseholdCalling === 'undefined'
      ? 'No Calling'
      : headOfHouseholdCalling;
  let detailsHTML = `
    <div style="margin:20px 10px 10px 10px;">
      <table>
        <tbody>
          <tr>
            <td>
              <span id="familyName" class="weight_bold size_14">${
                details.householdInfo.name
              }</span>
              <div class="profileDetailLeft">
                <span id="householdAddress" class="content_container">
                  <div>
                    <span>${details.householdInfo.address.addr1}</span>
                    <br>
                    <span>${details.householdInfo.address.addr2}</span>
                  </div>
                </span>
                <span class="size_10 content_container">
                  <div>
                    <a href="mailto:${details.householdInfo.email}">${
    details.householdInfo.email
  }</a>
                  </div>
                </span>
              </div>
            </td>
            <td style="float:right; margin-right:10px;">
              <div id="householdPhoto${
                details.householdInfo.individualId
              }-container" style="position:relative;display:flex">
                <img id="offenderPhoto" src="${
                  details.offenderImageUrl
                }" style="width: 50%; height: 50%; margin-left:.5rem;">
                <img style="margin-left:.5rem;" id="householdPhoto${
                  details.householdInfo.individualId
                }" src="${details.householdInfo.photoUrl ||
    'images/nofamily_medium.png'}" alt="family Photo" class="profile-householdPhoto">
              </div>
              <div class="pending-photo-banner household-pending" id="household-pending-${
                details.householdInfo.individualId
              }">Pending approval from ward clerk</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="margin_5 heading_wrapper size_11">Head of Household</div>
    <div style="margin:10px 10px 10px 10px;">
      <table class="individualProfileTable">
        <tbody>
          <tr>
            <td class="profileDetailLeft individualRow">
              <span class="profileName color_gray size_11 weight_bold ellipsisText">
                ${details.headOfHousehold.name} -
                <span class="profileDetailCallings size_9" title="${headOfHouseholdCalling}">${headOfHouseholdCalling}</span>
              </span>
              <div>
                <span class="content_container">
                  <div>${details.headOfHousehold.phone}</div>
                </span>
              </div>
            </td>
            <td class="individualRow">
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td style="float:right;">
                        <div id="memberPhoto${
                          details.headOfHousehold.individualId
                        }-container" class="memberPhoto-container" style="position:relative; height:100px; width:100px; margin-right: 20px; text-align: center; overflow: hidden; border-radius: 50%;">
                          <img id="memberPhoto${
                            details.headOfHousehold.individualId
                          }" src="${details.headOfHousehold.photoUrl ||
    'images/nophoto_medium.gif'}" alt="individualPhoto" class="profile-memberPhoto" style="cursor: pointer;">
                        </div>
                        <div class="pending-photo-banner" id="member-pending-${
                          details.headOfHousehold.individualId
                        }" style="width: 94px;">Pending approval from ward clerk</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    ${
      details.spouse
        ? `
    <div style="margin:10px 10px 10px 10px;">
      <table class="individualProfileTable">
        <tbody>
          <tr>
            <td class="profileDetailLeft individualRow">
              <span class="profileName color_gray size_11 weight_bold ellipsisText">
                ${details.spouse.name} -
                <span class="profileDetailCallings size_9" title="${
                  details.spouse.callings[0]
                }">${details.spouse.callings[0]}</span>
              </span>
              <div>
                <span class="content_container">
                  <div>${details.spouse.phone}</div>
                </span>
              </div>
            </td>
            <td class="individualRow">
              <div>
                <table>
                  <tbody>
                    <tr>
                      <td style="float:right;">
                        <div id="memberPhoto${
                          details.spouse.individualId
                        }-container" class="memberPhoto-container" style="position:relative; height:100px; width:100px; margin-right: 20px; text-align: center; overflow: hidden; border-radius: 50%;">
                          <img id="memberPhoto${
                            details.spouse.individualId
                          }" src="${
            details.spouse.photoUrl
          }" alt="individualPhoto" class="profile-memberPhoto" style="cursor: pointer;">
                        </div>
                        <div class="pending-photo-banner" id="member-pending-${
                          details.spouse.individualId
                        }" style="width: 94px;">Pending approval from ward clerk</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`
        : ''
    }
  `;
  detailsContainer.innerHTML = detailsHTML;
};
const getDetails = async (memberId, member) => {
  let response = await fetch(
    `https://www.lds.org/directory/services/web/v3.0/mem/householdProfile/${memberId}?imageSize=MEDIUM`
  );
  let details = await response.json();
  details.offenderImageUrl = member.offenderImageUrl;
  console.log(details.offenderImageUrl);
  renderDetails(details);
};
const renderOffenderList = list => {
  let ul = document.createElement('ul');
  ul.className = 'list';
  for (let item of list) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = '#';
    a.textContent = `${item.coupleName} (${item.offenderName})`;
    li.addEventListener('click', () =>
      getDetails(item.headOfHouseIndividualId, item)
    );
    li.appendChild(a);
    ul.appendChild(li);
  }
  let listContainer = document.querySelector(`#${listContainerId}`);
  let disclaimerDiv = document.createElement('div');
  disclaimerDiv.style.paddingTop = '.5rem';
  disclaimerDiv.style.paddingLeft = '.5rem';
  disclaimerDiv.style.lineHeight = '1rem';
  disclaimerDiv.textContent =
    'Note: The following list is not 100% accurate. The list was created by first name/last name matching against a registry of sex offenders. Please verify identity by checking addresses, pictures, etc, before assuming the person listed is a sex offender. Currently, this list will  only display male offenders. Female offenders will be added in the next release. Only the first 12 offenders in your area will be displayed. Additional offenders will be added in future releases. Thanks for your patience';
  listContainer.innerHTML = '';
  listContainer.appendChild(disclaimerDiv);
  listContainer.appendChild(ul);
  return ul;
};
async function getOffenderList($event) {
  chrome.storage.sync.get(null, items => {
    let listContainer = document.querySelector(`#${listContainerId}`);
    markLiSelected($event.target.parentElement);
    if (!items.zipcode) {
      return (listContainer.innerHTML =
        '<span style="margin:.5rem; position: relative; top:.5rem;">Missing required location information. Please click the extension icon on your browser, enter your info, and click the "Sex Offenders" option again.</span>');
    }
    listContainer.innerHTML =
      '<span style="margin:.5rem; position: relative; top:.5rem;">Loading Offenders...</span>';
    chrome.runtime.sendMessage({ greeting: 'hello' }, async function(response) {
      let offenderTable = response;
      let div = document.createElement('div');
      div.innerHTML = offenderTable;
      let offenders = [];
      let cells = div.querySelectorAll('tbody td:nth-child(5)');
      let imageCells = div.querySelectorAll('tbody td:nth-child(2)');
      for (let [index, cell] of cells.entries()) {
        let image = imageCells[index].querySelector('img');
        console.log(image ? image.src : '');
        offenders.push({
          name: cell.textContent.toLowerCase().trim(),
          imageUrl: image ? image.src : ''
        });
      }
      let offendersList = offenders;
      let membersResponse = await fetch(
        `https://www.lds.org/directory/services/web/v3.0/mem/member-list/${unitno}`
      );
      let membersList = await membersResponse.json();
      let parsedOffenders = [];
      let memberOffenders = [];
      for (let { name, imageUrl } of offendersList) {
        let [firstName, lastName] = name.split(' ');
        parsedOffenders.push({ firstName, lastName, imageUrl });
      }
      for (let member of membersList) {
        let { preferredName } = member.headOfHouse;
        let [
          memberLastName,
          memberFirstName
        ] = preferredName.toLowerCase().split(', ');
        [memberFirstName] = memberFirstName.split(' ');
        for (let { firstName, lastName, imageUrl } of parsedOffenders) {
          if (memberFirstName === firstName && memberLastName === lastName) {
            member.offenderName = firstName;
            member.offenderImageUrl = imageUrl;
            console.log(member.offenderImageUrl);
            memberOffenders.push(member);
          }
        }
      }
      renderOffenderList(memberOffenders);
    });
  });
}

function insertOffenderOption(ul) {
  unitno = document.querySelector('[unitno]').getAttribute('unitno');
  let li = document.createElement('li');
  let anchor = document.createElement('a');
  anchor.textContent = 'Sex Offenders';
  li.appendChild(anchor);
  li.style.cursor = 'pointer';
  li.addEventListener('click', getOffenderList);
  ul.insertBefore(li, ul.childNodes[0]);
}
var interval = window.setInterval(() => {
  let ul = document.querySelector(`#${navContainerId} div ul`);
  if (ul) {
    insertOffenderOption(ul);
    window.clearInterval(interval);
  }
}, 500);
