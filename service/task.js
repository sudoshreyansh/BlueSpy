import urlUtil from '../util/url.js'
import StatusService from './status.js'
import ScorecardService from './scorecard.js'

const Tasks = {
    'scorecard': ScorecardService
}

let parsedUrl

async function _taskManager() {
    for ( const task in Tasks ) {
        const result = await task.execute(parsedUrl)
        StatusService.addTaskOutput(task, result)
    }

    StatusService.setTaskStatus(false)
}

function startTask(url) {
    parsedUrl = urlUtil.parseUrl(url)
    if ( !parsedUrl ) return false

    StatusService.setTaskStatus(true)
    _taskManager(url)
    return true
}

export default {
    startTask
}