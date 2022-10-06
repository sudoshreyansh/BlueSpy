import { exec, spawn } from 'child_process'

const ruleCodes = {
    dynamicExecution: ["AI034800","AI034900","AI035000","AI035010","AI035100","AI035200","AI035300","AI035400","AI035500","AI035510","AI035520","AI035530","AI035531","AI035532"],
    crytpography: ["AI006900","AI007000","AI007100","AI007101","AI007102","AI007200","AI007300","AI007400","AI007600","AI008700","AI008800","AI008900","AI009000","AI009100","AI009200"],
    networkCalls: ["AI031600","AI031700","AI031800","AI031900","AI031910","AI032000","AI032100","AI032110","AI032200","AI032300","AI032400","AI032500","AI032600","AI032700","AI032800","AI032900","AI033000","AI033100","AI033200","AI033300","AI033400","AI033410"],
    cryptocurrency: ['AI007700'],
    fileio: ["AI035600","AI035700","AI035800","AI035900","AI035910","AI035911","AI036000","AI036010","AI036100","AI036200","AI036300","AI036400","AI036500","AI036501","AI036600","AI036610","AI036620","AI036621","AI036622"],
    os: ['AI038700','AI038800',"AI037500","AI037600","AI037700","AI037800","AI037900","AI037910","AI037920","AI037930","AI037940","AI037950","AI037960","AI037970","AI037980","AI037990","AI038000","AI038100","AI038110","AI038200","AI038210","AI038300","AI038400","AI038500","AI038600","AI038601"]
}

function checkWithAppInspector() {
    return new Promise((resolve, reject) => {
        exec('cd source && find .', (err, stdout) => {
            console.log(err, stdout)
            let data = ""
            const p = spawn('/opt/ApplicationInspector/ApplicationInspector.CLI', ['analyze', '-x', 'Fatal', '-S', '-c', 'Medium,High,Low', '-f', 'json', '-s', 'source', '-N'])
            p.stdout.on('data', d => data += d.toString())
            p.on('close', () => {
                // console.log(data)
                resolve(JSON.parse(data))
            })
        })
    })
}

function mapper(output) {
    const mappedOut = {
        dynamicExecution: 0,
        crytpography: 0,
        networkCalls: 0,
        cryptocurrency: 0,
        fileio: 0,
        os: 0
    }
    const checks = output.metaData.detailedMatchList ?? []
    console.log(checks)
    for ( const check of checks ) {
        Object.keys(ruleCodes).some(rule => {
            const codes = ruleCodes[rule]
            console.log(check.ruleId)
            if ( codes.includes(check.ruleId) ) {
                mappedOut[rule]++;
                return true;
            }
            return false;
        })
    }
    
    return mappedOut
}

async function execute() {
    const data = await checkWithAppInspector()
    return mapper(data)
}

export default {
    execute
}