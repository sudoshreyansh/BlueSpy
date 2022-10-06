import { exec } from 'child_process'
import shellescape from 'shell-escape'

function checkWithMetadata(packageName) {
    return new Promise((resolve, reject) => {
        exec(`cd /home/bluespy/src/modules/metadata/util/eval/scripts; ./npm-sec.sh ${packageName}`, (err, stdout, stderr) => {
            console.log(err, stdout, stderr)
            const data = JSON.parse(stdout)
            resolve(data)
        })
    })
}

async function execute(url) {
    if ( url.registry !== 'npm' ) {
        return {}
    }
    const data = await checkWithMetadata(url.name)
    return data
}

export default {
    execute
}