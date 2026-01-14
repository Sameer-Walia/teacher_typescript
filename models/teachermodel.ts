import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITeacher extends Document
{
    name: string;
    phone: string;
    email: string;
    department: string;
    subject: string;
    subjectcode: string;
}

const TeacherSchema = new Schema(
    {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        department: { type: String, required: true },
        subject: { type: String, required: true },
        subjectcode: { type: String, required: true },
    },
    { versionKey: false }
);

const TeacherModel = mongoose.model("teacher", TeacherSchema, "teacher");

export default TeacherModel;
