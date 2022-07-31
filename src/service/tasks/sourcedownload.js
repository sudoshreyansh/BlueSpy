import { exec } from 'child_process'

async function downloadGitCode(url) {
    return new Promise((resolve, reject) => {
        exec(`git clone https://github.com/${url.name} source`, (err, stdout) => {
            console.log(err)
            resolve()
        })
    })
}

async function downloadPkgCode(pkgUrl) {
    return new Promise((resolve, reject) => {
        exec(`mkdir source && /opt/OSSGadget/oss-download -e true --download-directory source ${pkgUrl}`, (err, stdout) => {
            console.log(err)
            resolve()
        })
    })
}

function generatePkgUrl(url) {
    return `pkg:${url.registry}/${url.name}`
}

async function execute(url) {
    if ( url.registry === 'github' ) {
        await downloadGitCode()
    } else {
        const pkgUrl = generatePkgUrl(url)
        downloadPkgCode(pkgUrl)
    }
}

export default {
    execute
}