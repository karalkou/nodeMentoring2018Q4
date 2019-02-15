export function cookieParser(params) {
    const {req, /* res, */ next} = params;

    req.parsedCookies = parseCookies(req.headers.cookie);
    next();
}

function parseCookies(cookie) {
    return cookie
        .split(';')
        .reduce(
            (result, curr) => {
                const keyValPair = (/ *([^=]+)=(.*)/).exec(curr);

                result[keyValPair[1]] = decodeURIComponent(keyValPair[2]);

                return result;
            },
            {}
        );
}
