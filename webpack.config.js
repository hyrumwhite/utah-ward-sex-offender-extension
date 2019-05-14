const path = require("path");
const dist = path.join(__dirname, "./extension/dist");

module.exports = [
    {
        mode   : "development",
        name   : "fetch.offenders",
        entry  : "./src/background/fetch.offenders.js",
        output : {
            path     : dist,
            filename : "fetch.offenders.js"
        }
    },
    {
        mode   : "development",
        name   : "offender.finder",
        entry  : "./src/content-scripts/offender.finder.js",
        output : {
            path     : dist,
            filename : "offender.finder.js"
        }
    },
    {
        mode   : "development",
        name   : "menu",
        entry  : "./src/menu/menu.js",
        output : {
            path     : dist,
            filename : "menu.js"
        }
    },
];
