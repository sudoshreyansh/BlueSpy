import StatusService from '../service/status.js'
import TaskService from '../service/task.js'

function startTask(req, res) {
    if ( StatusService.getTaskStatus() ) 
        return res.json({message: 'Task running', scheduled: false})


    const url = req.query.url
    const taskScheduled = TaskService.startTask(url)
    
    if ( !taskScheduled ) {
        return res.json({message: 'Invalid URL', scheduled: false})
    } else {
        return res.json({scheduled: true})
    }
}

function getTaskStatus(req, res) {
    res.json(StatusService.getTaskOutput())
}

export default {
    startTask,
    getTaskStatus
}