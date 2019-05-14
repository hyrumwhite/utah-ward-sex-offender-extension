import app from "../lib/app.js";

const offenderFinder = {
    getMemberElements : () => [...document.querySelectorAll(`[class*="ListingEntry__HouseholdEntry"]`)],

    getOffenderList : async () => {
        const offenders = await app.getOffenders();
        console.log(offenders);

        return offenderFinder.getMemberElements().filter(member => {
            const name = member.textContent.toLowerCase();

            return offenders.some(({ firstName, lastName }) => 
                name.includes(firstName) && name.includes(lastName)
            );
        })
    },
};

window.onload = async () => {
    const offenderElements = await offenderFinder.getOffenderList();

    // color red offenders red
    offenderElements.forEach(element => {
        element.style.color = "red";
    })
};
