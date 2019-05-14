const express = require("express");
const app = express();
const path = require('path');

app.get("/", (req, res) => {
    console.log(`"/" - responded with index.html`);
    res.sendFile(path.join(__dirname, "./index.html"));
});

app.listen(80, () => {
    console.log("Server started on port 80");
});
