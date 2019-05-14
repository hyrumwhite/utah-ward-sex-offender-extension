/**
 * Serialize object as url params
 * 
 * This is pretty gross but uh, encodeURI is a better step than
 * swapping out spaces. We may want to bring in an external dep for
 * util stuff like this but for now this works
 */
export default function serialize(obj = {}) {
    return Object.keys(obj).reduce((acc, curr) => {
        if (acc.length !== 0) {
            acc += "&";
        }

        if (obj[curr]) {
            acc += encodeURI(`${curr}=${obj[curr]}`);
        } else {
            acc += encodeURI(curr);
        }

        return acc;
    }, "");
}
