import { Request, Response } from "express";
import teachermodel from "../models/teachermodel";



export const addteacher = async (req: Request, res: Response) =>
{
    try
    {
        const teacher = new teachermodel({ name: req.body.name, email: req.body.email, phone: req.body.phone, department: req.body.dep, subject: req.body.subjectname, subjectcode: req.body.subjectcode })
        const result = await teacher.save();

        if (result) 
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

export const fetchallteachers = async (req: Request, res: Response) =>
{
    try
    {
        const result = await teachermodel.find()
        if (result.length == 0)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            res.send({ statuscode: 1, teacherdata: result })
        }
    }
    catch (e: any) 
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const fetchoneteacher = async (req: Request, res: Response) =>
{
    try
    {
        const result = await teachermodel.findOne({ _id: req.query.id })
        if (result === null)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            res.send({ statuscode: 1, oneteacherdata: result })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const updateteacher = async (req: Request, res: Response) =>
{
    try
    {
        const updateresult = await teachermodel.updateOne({ _id: req.body.tid }, { $set: { name: req.body.name, phone: req.body.phone, email: req.body.email, department: req.body.department, subject: req.body.subject, subjectcode: req.body.subjectcode } })
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

export const fetchteachername = async (req: Request, res: Response) =>
{
    try
    {
        const result = await teachermodel.findOne({ _id: req.params.nid })
        if (result === null)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            res.send({ statuscode: 1, teacherdata: result })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const allteacherfeed = async (req: Request, res: Response) =>
{
    try
    {
        const result = await teachermodel.find()
        if (result.length === 0)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            res.send({ statuscode: 1, teacherdata: result })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}

export const fetchoneteacher_sub_code = async (req: Request, res: Response) =>
{
    try
    {
        const result = await teachermodel.findOne({ name: req.params.name })
        if (result === null)
        {
            res.send({ statuscode: 0 })
        }
        else
        {
            res.send({ statuscode: 1, sub_subcode: result })
        }
    }
    catch (e: any)
    {
        res.send({ statuscode: -1 })
        console.log(e.message)
    }
}