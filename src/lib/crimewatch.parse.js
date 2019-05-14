import tomorrow from "./tomorrow.js";
import serialize from "./url.serialize.js";
import htmlParser from "./html.parser.js";

const crimewatch = {
    url : "http://www.icrimewatch.net/",

    cookie : () => ({
        url            : crimewatch.url,
        domain         : '.icrimewatch.net',
        expirationDate : tomorrow.getTime() / 1000,
        httpOnly       : false,
        name           : 'accepted_license',
        path           : '/',
        sameSite       : 'no_restriction',
        secure         : false,
        storeId        : '0',
        value          : 'NTQ0Mzg%3D'
    }),
    /**
     *         
     * 
     *  let { city, streetAddress, state, zipcode, searchRadius } = items;
        city = city.replace(' ', '+');
        streetAddress = streetAddress.replace(' ', '+');
        state = state.replace(' ', '+');
        let urlPrefix = `http://www.icrimewatch.net/results.php?AgencyID=54438&whichaddr=home_addr%7Ctemp_addr&SubmitAddrSearch=1`;
        let url = `${urlPrefix}&AddrStreet=${streetAddress}&AddrCity=${city}&AddrState=${state}&AddrZip=${zipcode}&AddrZipPlus=&excludeIncarcerated=&radius=${searchRadius}`;
     */

    get : (params = {}) =>
        `${crimewatch.url}results.php?${
            serialize({
                ...params,

                AgencyID         : 54438,
                whichaddr        : "home_addr|temp_addr",
                SubmitAddrSearch : 1,

                // Url Param Flags
                AddrZipPlus         : null,
                excludeIncarcerated : null
            })
        }`
    ,

    getText : async (params) => {
        const response = await fetch(crimewatch.get(params));

        return response.text();
    },

    getData : async (params) => {
        const text = await crimewatch.getText(params);

        // Pull out table containing offenders
        const tableStart = text.search(/<table.*bgcolor="#CCCCCC"/g);
        const tableEnd = text.indexOf('</table>', tableStart) + '</table>'.length;

        const table = htmlParser(text.slice(tableStart, tableEnd));

        const offenders = [];

        const cells = table.querySelectorAll('tbody td:nth-child(5)');
        const imageCells = table.querySelectorAll('tbody td:nth-child(2)');

        Object.entries(cells).forEach(([ i, cell ]) => {
            const image = imageCells[i].querySelector("img");
            const [ firstName, lastName ] = cell.textContent.toLowerCase().trim().split(" ");

            offenders.push({
                firstName,
                lastName,
                imageUrl : image && image.src || ""
            })
        });

        return offenders;
    }
};

export default crimewatch;
