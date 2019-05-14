const asyncChromeWrapper = {
    setCookie : (cookies) => 
        new Promise(res => {
            chrome.cookies.set(cookie, (data) => {
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
        })
};

export default asyncChromeWrapper;
