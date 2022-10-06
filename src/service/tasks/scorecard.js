import { exec } from 'child_process'
import shellescape from 'shell-escape'

function checkWithScorecard(registryFlag) {
    return new Promise((resolve, reject) => {
        exec(`/opt/scorecard/scorecard ${registryFlag} --format=json`, (err, stdout, stderr) => {
            console.log(stdout, err, stderr)
            const data = JSON.parse(stdout)
            resolve(data)
        })
    })
}

function generateRegistryFlag(url) {
    let flag = ''
    switch ( url.registry ) {
        case 'github':
            flag = '--repo=github.com/' + url.name
            break;
        case 'npm':
            flag = '--npm=' + url.name
            break;
        case 'pypi':
            flag = '--repo=' + url.name
            break;
    }

    return shellescape([flag])
}

function mapper(output) {
    const mappedOut = {}
    mappedOut.score = output.score
    mappedOut.checks = output.checks.map(check => ({
        score: check.score,
        name: check.name,
    }))
    
    return mappedOut
}

async function execute(url) {
    const registryFlag = generateRegistryFlag(url)
    const data = await checkWithScorecard(registryFlag)
    return mapper(data)
}

export default {
    execute
}