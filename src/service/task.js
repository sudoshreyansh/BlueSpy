import urlUtil from '../util/url.js'
import StatusService from './status.js'
import ScorecardService from './tasks/scorecard.js'
import AppInspectorService from './tasks/appinspector.js'
import MetadataService from './tasks/metadata.js'
import SourceDownloadService from './tasks/sourcedownload.js'

const Tasks = {
    'scorecard': ScorecardService,
    'sourcedownload': SourceDownloadService,
    'appinspector': AppInspectorService,
    'metadata': MetadataService
}

let parsedUrl

async function _taskManager() {
    for ( const task in Tasks ) {
        console.log(task)
        const result = await Tasks[task].execute(parsedUrl)
        if ( result ) StatusService.addTaskOutput(task, result)
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