import { Request, Response } from "express";
import FeedbackModel from "../models/feedbackmodel";
import { sendMail } from "../utils/mailer";

export const submitfeedback = async (req: Request, res: Response) => 
{
    try 
    {
        const newrecord = new FeedbackModel({ name: req.body.name, thoughts: req.body.thoughts, rate1: req.body.rating1, rate2: req.body.rating2, rate3: req.body.rating3, rate4: req.body.rating4, rate5: req.body.rating5, rate6: req.body.rating6, rate7: req.body.rating7, rate8: req.body.rating8, rate9: req.body.rating9, rate10: req.body.rating10 })
        const result = await newrecord.save();  // it will save the record into real collection

        if (result) 
        {
            res.send({ statuscode: 1 })
        }
        else 
        {
            res.send({ statuscode: 0, msg: "Feedback Not Submitted" })
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}


export const uniquefeed = async (req: Request, res: Response) =>
{
    try
    {
        const result = await FeedbackModel.find({ name: req.params.name })
        if (result.length === 0)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            res.send({ statuscode: 1, uniquefeedback: result })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const getallfeedbacks = async (req: Request, res: Response) =>
{
    try
    {
        const result = await FeedbackModel.find()
        if (result.length === 0)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            res.send({ statuscode: 1, feedbacks: result })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}


export const ContactUs = async (req: Request, res: Response) =>
{
    try
    {

        const mailOptions = {
            from: 'sameerwalia13@gmail.com',
            to: 'sameerwalia13@gmail.com',
            replyTo: req.body.email,
            subject: 'Message from  Teacher Feedback website- Contact Us Page',
            html: `<b>Name:- </b>${req.body.name}<br/><b>Email:- </b>${req.body.email}<br/><b>Message:- </b>${req.body.message}`
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
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}