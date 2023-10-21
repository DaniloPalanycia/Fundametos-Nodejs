export function extractQueryParams(query) {
    return query.substr(1).split('&').reduce((queryParams, param) => {
        const [key, valeu] = param.split('=')

        queryParams[key] = valeu

        return queryParams
    }, {})
}