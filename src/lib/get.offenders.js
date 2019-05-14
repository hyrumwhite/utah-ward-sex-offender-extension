export default function getOffenders() {
    return new Promise(res => {
        chrome.runtime.sendMessage({ message : "get.offenders" }, (offenders) => {
            res(offenders);
        });
    });
};
