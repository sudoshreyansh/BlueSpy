const RegistryRegex = {
    'npm': /npmjs\.com\/package\/([^/]*)/,
    'github': /github\.com\/([^/]*\/[^/]*)/,
    'pypi': /pypi\.org\/project\/([^/]*)/,
}

function parseUrl(url) {
    const parsed = false
    Object.keys(RegistryRegex).some(key => {
        const match = RegistryRegex[key].match(url)
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