import express from "express"
import controller from "../controller/index.js"
const router = express.Router()

router.get('/startTask', controller.startTask)

export default router