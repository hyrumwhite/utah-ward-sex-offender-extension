const anchors = {
  lds: document.querySelector('#lds-anchor'),
  nspow: document.querySelector('#nsopw-anchor')
};
const nsopwStepIcons = {
  check: document.querySelector('#on-nsopw-page-check'),
  x: document.querySelector('#on-nsopw-page-x')
};
const membersStepIcons = {
  check: document.querySelector('#has-members-check'),
  x: document.querySelector('#has-members-x')
};
anchors.lds.addEventListener('click', () =>
  chrome.tabs.create({ url: 'https://directory.lds.org' })
);

anchors.nspow.addEventListener('click', () =>
  chrome.tabs.create({ url: 'https://www.nsopw.gov/en/search/' })
);
chrome.storage.local.get({ members: [] }, ({ members }) => {
  if (members.length) {
    membersStepIcons.check.style.display = 'initial';
    membersStepIcons.check.style.color = 'green';
    membersStepIcons.x.style.display = 'none';
  }
});
