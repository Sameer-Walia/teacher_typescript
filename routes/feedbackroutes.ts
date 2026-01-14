import express from 'express'
import { submitfeedback, uniquefeed, getallfeedbacks, ContactUs } from '../controllers/feedbackcontroller'
const router = express.Router()

router.post("/submitfeedback", submitfeedback)
router.get("/uniquefeed/:name", uniquefeed)
router.get("/getallfeedbacks", getallfeedbacks)
router.post("/ContactUs", ContactUs)

export default router