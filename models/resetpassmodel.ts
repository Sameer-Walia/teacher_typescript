import mongoose, { Document, Schema } from 'mongoose'

export interface IResetPass extends Document
{
    email: string;
    exptime: Date;
    token: string;
}

const ResetPassSchema = new Schema(
    {
        email: { type: String, required: true },
        exptime: { type: Date, required: true },
        token: { type: String, required: true },
    },
    {
        versionKey: false,
    }
);
const restPassModel = mongoose.model("resetpass", ResetPassSchema, "resetpass");
export default restPassModel






