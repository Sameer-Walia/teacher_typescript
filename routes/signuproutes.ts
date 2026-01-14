import express from "express";
import { verifyadmin, verifyjsontoken } from "../utils/auth";
import { activateuseraccount, changepassword, deluser, fetchallusers, fetchoneuserdata, google_login, login, logout, resendmail, signup, updateuserprofile } from "../controllers/signupcontroller";

const router = express.Router();

router.post("/signup", signup)
router.put("/activateuseraccount", activateuseraccount)
router.post("/resendmail", resendmail)
router.post("/login", login)
router.post("/google_login", google_login)
router.post("/logout", logout)
router.put("/changepassword", changepassword)
router.get("/fetchallusers", fetchallusers)
router.delete("/deluser", deluser)
router.get("/fetchoneuserdata/:useremail", fetchoneuserdata)
router.put("/updateuserprofile", updateuserprofile)

export default router;