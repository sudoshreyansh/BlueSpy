let runningStatus = false       // false - completed, true - running
let completionTime = 0      // 1 minute buffer
let output = {}

function setTaskStatus(_status) {
    runningStatus = _status
    completionTime = 0

    if ( !runningStatus ) completionTime = Date.now()
    if ( runningStatus ) output = {}
}

function getTaskStatus() {
    return runningStatus || Date.now() - completionTime < 1000*60
}

function getTaskOutput() {
    return {
        data: output,
        status: runningStatus
    }
}

function addTaskOutput(task, result) {
    output[task] = result
}

export default {
    setTaskStatus,
    getTaskStatus,
    getTaskOutput,
    addTaskOutput
}