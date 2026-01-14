import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document
{
    name: string;
    thoughts: string;
    rate1: number;
    rate2: number;
    rate3: number;
    rate4: number;
    rate5: number;
    rate6: number;
    rate7: number;
    rate8: number;
    rate9: number;
    rate10: number;
}

const FeedbackSchema = new Schema(
    {
        name: { type: String, required: true },
        thoughts: { type: String, required: true },

        rate1: { type: Number, required: true },
        rate2: { type: Number, required: true },
        rate3: { type: Number, required: true },
        rate4: { type: Number, required: true },
        rate5: { type: Number, required: true },
        rate6: { type: Number, required: true },
        rate7: { type: Number, required: true },
        rate8: { type: Number, required: true },
        rate9: { type: Number, required: true },
        rate10: { type: Number, required: true },
    },
    {
        versionKey: false,
    }
);

const FeedbackModel = mongoose.model("Feedback", FeedbackSchema, "feedback");

export default FeedbackModel;
