import { Request, Response } from "express";
import SignupModel from "../models/signupmodel";
import { sendMail } from "../utils/mailer";
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');


export const signup = async (req: Request, res: Response) => 
{
    try 
    {
        const acttoken = crypto.randomUUID();
        console.log(acttoken)

        const encryp_pass = bcrypt.hashSync(req.body.pass, 10)

        const newrecord = new SignupModel({ name: req.body.name, phone: req.body.phone, email: req.body.email, rollno: req.body.rollno, password: encryp_pass, department: req.body.dep, semester: req.body.sem, usertype: "normal", actstatus: false, token: acttoken, googleId: "" })
        const result = await newrecord.save();  // it will save the record into real collection

        if (result) 
        {
            const mailOptions = {
                from: 'sameerwalia13@gmail.com', // transporter username email
                to: req.body.email,             // user's email id
                subject: 'Activation Mail from TeacherFeedback.com',
                html: `Dear ${req.body.name}<br/><br/>Thanks for signing up on our website.<br/><br/>Click on the following link to activate your account.<br/><br/><a href='http://localhost:3000/activateaccount?code=${acttoken}'>Activate Account<a/>`
            };

            const mailresp = await sendMail(mailOptions);
            if (mailresp === true)
            {
                res.send({ statuscode: 1 })
            }
            else
            {
                res.send({ statuscode: 2 })
            }

        }
        else 
        {
            res.send({ statuscode: 0, msg: "Error while Signing Up , try again" })
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}


export const activateuseraccount = async (req: Request, res: Response) => 
{
    try
    {
        const updateresult = await SignupModel.updateOne({ token: req.body.code }, { $set: { actstatus: true } });
        if (updateresult.modifiedCount === 1)
        {
            res.send({ statuscode: 1 })
        }
        else
        {
            res.send({ statuscode: 0 })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}


export const resendmail = async (req: Request, res: Response) => 
{
    try 
    {
        const user = await SignupModel.findOne({ email: req.body.email });
        if (user === null) 
        {
            res.send({ statuscode: 0, msg: "User not found with given email " });
        }
        else
        {
            const updatetoken = await SignupModel.updateOne({ email: req.body.email }, { $set: { actstatus: false } })
            if (updatetoken.modifiedCount === 1) 
            {
                const mailOptions = {
                    from: 'sameerwalia13@gmail.com', // transporter username email
                    to: req.body.email,             // user's email id
                    subject: 'Activation Mail from Teacher Website.com',
                    html: `Dear ${user.name}<br/><br/>Thanks for signing up on our website.<br/><br/>Click on the following link to activate your account.<br/><br/><a href='http://localhost:3000/activateaccount?code=${user.token}'>Activate Account<a/>`
                };

                const mailresp = await sendMail(mailOptions);
                if (mailresp === true)
                {
                    res.send({ statuscode: 1 })
                }
                else
                {
                    res.send({ statuscode: 2 })
                }
            }
            else
            {
                const mailOptions = {
                    from: 'sameerwalia13@gmail.com',
                    to: req.body.email,
                    subject: 'Activation Mail from Teacher Website.com',
                    html: `Dear ${user.name}<br/><br/>Thanks for signing up on our website.<br/><br/>Click on the following link to activate your account.<br/><br/><a href='http://localhost:3000/activateaccount?code=${user.token}'>Activate Account<a/>`
                };

                const mailresp = await sendMail(mailOptions);
                if (mailresp === true)
                {
                    res.send({ statuscode: 1 })
                }
                else
                {
                    res.send({ statuscode: 2 })
                }
            }
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const login = async (req: Request, res: Response) => 
{
    try 
    {

        const result = await SignupModel.findOne({ email: req.body.email })
        console.log(result)

        if (result === null) 
        {
            res.send({ statuscode: 0 })
        }
        else 
        {
            if (bcrypt.compareSync(req.body.pass, result.password))
            {
                const jsontoken = jwt.sign({ id: result._id, role: result.usertype }, process.env.JWT_SKEY as string, { expiresIn: "15m" })
                const refreshjsontoken = jwt.sign({ id: result._id, role: result.usertype }, process.env.JWT_REFRESH_SKEY as string, { expiresIn: "7d" })

                res.cookie("authToken", jsontoken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 15 * 60 * 1000,
                });

                res.cookie("refreshToken", refreshjsontoken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });

                const respdata = { _id: result._id, name: result.name, phone: result.phone, email: result.email, usertype: result.usertype, rollno: result.rollno, semester: result.semester, department: result.department, actstatus: result.actstatus, googleId: result.googleId }

                res.send({ statuscode: 1, userdata: respdata })
            }
            else
            {
                res.send({ statuscode: 0 })
            }
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const google_login = async (req: Request, res: Response) => 
{
    try
    {
        const { email, name, googleId } = req.body;

        let user = await SignupModel.findOne({ email: email });

        if (user === null)
        {
            // create new Google user
            const newrecord = new SignupModel({
                name, email, phone: "", rollno: "", password: "", semester: "", department: "", usertype: "normal",
                actstatus: true,  // GOOGLE EMAIL IS ALREADY VERIFIED
                token: "", googleId: googleId
            });

            user = await newrecord.save();
        }

        // create JWT cookies like normal login
        const jsontoken = jwt.sign({ id: user._id, role: user.usertype }, process.env.JWT_SKEY, { expiresIn: "15min" });
        const refreshjsontoken = jwt.sign({ id: user._id, role: user.usertype }, process.env.JWT_REFRESH_SKEY, { expiresIn: "7d" });

        // set cookies
        res.cookie("authToken", jsontoken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 15 * 60 * 1000
        });

        res.cookie("refreshToken", refreshjsontoken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        const respdata = { _id: user._id, name: user.name, phone: user.phone, email: user.email, usertype: user.usertype, rollno: user.rollno, semester: user.semester, department: user.department, actstatus: user.actstatus, googleId: user.googleId }

        res.send({ statuscode: 1, userdata: respdata });

    }
    catch (e)
    {
        console.log(e);
        res.send({ statuscode: -1 });
    }
}

export const logout = (req: Request, res: Response) =>
{
    try
    {
        res.clearCookie("authToken");
        res.clearCookie("refreshToken");
        res.clearCookie("staysignin");
        res.send({ statuscode: 1 })
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const changepassword = async (req: Request, res: Response) => 
{
    try
    {
        const result = await SignupModel.findOne({ email: req.body.email })
        console.log(result)
        if (result === null)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            if (bcrypt.compareSync(req.body.currpass, result.password))
            {
                const encryp_newpass = bcrypt.hashSync(req.body.newpass, 10)
                const updatepass = await SignupModel.updateOne({ email: req.body.email }, { $set: { password: encryp_newpass } })
                if (updatepass.modifiedCount === 1) 
                {
                    res.clearCookie("authToken");
                    res.clearCookie("refreshToken");
                    res.clearCookie("staysignin");
                    res.send({ statuscode: 1 })
                }
                else 
                {
                    res.send({ statuscode: 0 })
                }
            }
            else
            {
                res.send({ statuscode: 0 })
            }
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}


export const fetchallusers = async (req: Request, res: Response) =>
{
    try
    {
        const result = await SignupModel.find()
        if (result.length === 0) 
        {
            res.send({ statuscode: 0 })
        }
        else 
        {
            res.send({ statuscode: 1, usersdata: result })
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}


export const deluser = async (req: Request, res: Response) =>
{
    try
    {
        const result = await SignupModel.deleteOne({ _id: req.query.id })
        if (result.deletedCount === 1)
        {
            res.send({ statuscode: 1 })
        }
        else
        {
            res.send({ statuscode: 0 })
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const fetchoneuserdata = async (req: Request, res: Response) =>
{
    try
    {
        const result = await SignupModel.findOne({ email: req.params.useremail })
        if (result === null) 
        {
            res.send({ statuscode: 0 })
        }
        else 
        {
            res.send({ statuscode: 1, oneuserdata: result })
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const updateuserprofile = async (req: Request, res: Response) =>
{
    try
    {
        const updateresult = await SignupModel.updateOne({ email: req.body.uemail }, { $set: { name: req.body.name, phone: req.body.phone, rollno: req.body.rollno, department: req.body.dep, semester: req.body.sem } });

        if (updateresult.modifiedCount === 1)
        {
            res.send({ statuscode: 1 })
        }
        else
        {
            res.send({ statuscode: 0 })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}