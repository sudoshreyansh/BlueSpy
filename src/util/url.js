const RegistryRegex = {
    'npm': /npmjs\.com\/package\/([^/]*)/,
    'github': /github\.com\/([^/]*\/[^/]*)/,
    'pypi': /pypi\.org\/project\/([^/]*)/,
}

function parseUrl(url) {
    let parsed = false
    Object.keys(RegistryRegex).some(key => {
        const match = url.match(RegistryRegex[key])
        if ( match && match.length > 0 ) {
            parsed = {
                registry: key,
                name: match[1]
            }
            return true
        }
        return false
    })

    return parsed
}

export default {
    parseUrl
}