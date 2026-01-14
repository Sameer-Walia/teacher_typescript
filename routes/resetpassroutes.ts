import express from 'express'
import { forgotpassword, checktoken, resetpassword } from '../controllers/resetpasscontroller'

const router = express.Router()

router.get("/forgotpassword", forgotpassword)
router.get("/checktoken", checktoken)
router.put("/resetpassword", resetpassword)

export default router