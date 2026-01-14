import express from "express"
const router = express.Router()
import { addteacher, fetchallteachers, fetchoneteacher, updateteacher, fetchteachername, allteacherfeed, fetchoneteacher_sub_code } from '../controllers/teachercontroller'
import { verifyadmin, verifyjsontoken } from "../utils/auth"

router.post("/addteacher", addteacher)
router.get("/fetchallteachers", fetchallteachers)
router.get("/fetchoneteacher", fetchoneteacher)
router.put("/updateteacher", updateteacher)
router.get("/fetchteachername/:nid", fetchteachername)
router.get("/allteacherfeed", allteacherfeed)
router.get("/fetchoneteacher_sub_code/:name", fetchoneteacher_sub_code)

export default router