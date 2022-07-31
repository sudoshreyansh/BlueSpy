import urlUtil from '../util/url.js'
import StatusService from './status.js'
import ScorecardService from './tasks/scorecard.js'
import AppInspectorService from './tasks/appinspector.js'

const Tasks = {
    'scorecard': ScorecardService,
    'appinspector': AppInspectorService
}

let parsedUrl

async function _taskManager() {
    for ( const task in Tasks ) {
        const result = await Tasks[task].execute(parsedUrl)
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