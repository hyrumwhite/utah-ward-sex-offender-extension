import chrome from "../lib/chrome.js";
import parser from "../lib/crimewatch.parse.js";

chrome.runtime.onMessage.addListener(async (message, sender, reply) => {
    await chrome.setCookie(parser.cookie());
    const params = await chrome.getData();

    const offenders = await parser.getData({
        AddrCity   : params.city,
        AddrStreet : params.streetAddress,
        AddrState  : params.state,
        AddrZip    : params.zipcode,
        radius     : params.searchRadius
    });

    reply(offenders);

    return true;
});
