let date = new Date();
date.setDate(date.getDate() + 1);
date = date.getTime() / 1000;

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  chrome.cookies.set(
    {
      url: 'http://www.icrimewatch.net/',
      domain: '.icrimewatch.net',
      expirationDate: date,
      httpOnly: false,
      name: 'accepted_license',
      path: '/',
      sameSite: 'no_restriction',
      secure: false,
      storeId: '0',
      value: 'NTQ0Mzg%3D'
    },
    err => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText);
          let offenderTableIndex = this.responseText.search(
            /<table.*bgcolor="#CCCCCC"/g
          );
          let offenderTableEndIndex =
            this.responseText.indexOf('</table>', offenderTableIndex) +
            '</table>'.length;
          let offenderTableString = this.responseText.slice(
            offenderTableIndex,
            offenderTableEndIndex
          );
          reply(offenderTableString);
        }
      };
      chrome.storage.sync.get(null, items => {
        let { city, streetAddress, state, zipcode, searchRadius } = items;
        city = city.replace(' ', '+');
        streetAddress = streetAddress.replace(' ', '+');
        state = state.replace(' ', '+');
        let urlPrefix = `http://www.icrimewatch.net/results.php?AgencyID=54438&whichaddr=home_addr%7Ctemp_addr&SubmitAddrSearch=1`;
        let url = `${urlPrefix}&AddrStreet=${streetAddress}&AddrCity=${city}&AddrState=${state}&AddrZip=${zipcode}&AddrZipPlus=&excludeIncarcerated=&radius=${searchRadius}`;
        xhttp.open('GET', url, true);
        xhttp.send();
      });
    }
  );
  return true;
});
