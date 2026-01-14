import mongoose, { Schema, Document } from "mongoose";

/* Interface for Signup Document */
export interface ISignup extends Document
{
    name: string;
    phone: string;
    email: string;
    rollno: string;
    password: string;
    semester: string;
    department: string;
    usertype: string;
    actstatus: boolean;
    token: string;
    googleId?: string;
}

const SignupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    semester: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    usertype: {
        type: String,
        required: true,
    },
    actstatus: {
        type: Boolean,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: false,
    },
},
    { versionKey: false }
);

const SignupModel = mongoose.model("signup", SignupSchema, "signup");

export default SignupModel;
