import app from "../lib/app.js";
import parser from "../lib/crimewatch.parse.js";

app.respondOffenders(async (reply) => {
    const params = await app.getData();
    
    await app.setCookie(parser.cookie());

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
