import tomorrow from "../lib/tomorrow";
import urlSerialize from "../lib/url.serialize";

const urlPrefix = `http://www.icrimewatch.net/results.php?AgencyID=54438&whichaddr=home_addr%7Ctemp_addr&SubmitAddrSearch=1`;

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  chrome.cookies.set(
    {
      url            : 'http://www.icrimewatch.net/',
      domain         : '.icrimewatch.net',
      expirationDate : tomorrow,
      httpOnly       : false,
      name           : 'accepted_license',
      path           : '/',
      sameSite       : 'no_restriction',
      secure         : false,
      storeId        : '0',
      value          : 'NTQ0Mzg%3D'
    },
    async () => {
      chrome.storage.sync.get(null, async (items) => {
        const { city, streetAddress, state, zipcode, searchRadius } = items;

        // this is gross, but a bit more clear than what was happening before
        const url = `${urlPrefix}&${urlSerialize({
          AddrStreet : streetAddress,
          AddrCity   : city,
          AddrState  : state,
          AddrZip    : zipcode,
          radius     : searchRadius,

          // url flags
          AddrZipPlus         : null,
          excludeIncarcerated : null
        })}`;

        // TODO test and get working
        const response = await fetch(url);

        console.log(response.responseText);
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
      });
    }
  );
  return true;
});
