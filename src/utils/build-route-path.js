export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWitchParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')
    const pathRegex = new RegExp(`^${pathWitchParams}(?<query>\\?(.*))?$`)

    return pathRegex
}