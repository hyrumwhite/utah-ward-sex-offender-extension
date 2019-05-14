const asyncChromeWrapper = {
    setCookie : (cookies) => 
        new Promise(res => {
            chrome.cookies.set(cookies, (data) => {
                res(data)
            });
        }),
    getData : () =>
        new Promise(res => {
            chrome.storage.sync.get(null, (data) => res(data));
        }),
    setData : (data) =>
        new Promise(res => {
            chrome.storage.sync.set(data, () => res());
        }),
    getOffenders : () =>
        new Promise(res => {
            chrome.runtime.sendMessage({ message : "get.offenders" }, (offenders) => {
                res(offenders);
            });
        }),
    respondOffenders : (func) =>
        chrome.runtime.onMessage.addListener((message, sender, reply) => {
            func(reply);

            return true;
        })
};

export default asyncChromeWrapper;
