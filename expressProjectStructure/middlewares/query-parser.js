export function queryParser(params) {
    const {req, /* res, */ next} = params;

    req.parsedQuery = req.query;
    next();
}
