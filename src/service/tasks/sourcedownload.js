import { exec } from 'child_process'

async function downloadGitCode(url) {
    return new Promise((resolve, reject) => {
        // console.log(url)
        exec(`git clone https://github.com/${url.name} source`, (err, stdout) => {
            console.log(err)
            resolve()
        })
    })
}

async function downloadPkgCode(pkgUrl) {
    return new Promise((resolve, reject) => {
        exec(`mkdir source; /opt/OSSGadget/oss-download --download-directory ./source --extract ${pkgUrl}`, (err, stdout, stderr) => {
            console.log(err, stdout, stderr)
            console.log('OSS Download', err)
            resolve()
        })
    })
}

function generatePkgUrl(url) {
    return `pkg:${url.registry}/${url.name}`
}

async function execute(url) {
    if ( url.registry === 'github' ) {
        await downloadGitCode(url)
    } else {
        const pkgUrl = generatePkgUrl(url)
        await downloadPkgCode(pkgUrl)
    }
}

export default {
    execute
}