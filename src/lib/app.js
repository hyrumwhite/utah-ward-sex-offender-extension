const asyncChromeWrapper = {
    setCookie : (cookies) => 
        new Promise(res => {
            chrome.cookies.set(cookies, res);
        }),
        
    getData : () =>
        new Promise(res => {
            chrome.storage.sync.get(null, res);
        }),

    setData : (data) =>
        new Promise(res => {
            chrome.storage.sync.set(data, res);
        }),

    getOffenders : () =>
        new Promise(res => {
            chrome.runtime.sendMessage({ message : "get.offenders" }, res);
        }),

    respondOffenders : (func) =>
        chrome.runtime.onMessage.addListener((message, sender, reply) => {
            func()
            .then(reply);

            return true;
        })
};

export default asyncChromeWrapper;
