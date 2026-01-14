import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

const cors = require("cors");
const bcrypt = require("bcrypt");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const port = 8000;

mongoose.connect("mongodb://127.0.0.1:27017/teacherdb(typescript)").then(() => console.log("Connected to MongoDB on port " + port))


const cookieParser = require("cookie-parser")
app.use(cookieParser());


import signupRoutes from "./routes/signupRoutes";
import teacherroutes from "./routes/teacherroutes";
import feedbackroutes from "./routes/feedbackroutes";
import resetpassroutes from "./routes/resetpassroutes";

app.use("/api", signupRoutes);
app.use("/api", teacherroutes);
app.use("/api", feedbackroutes);
app.use("/api", resetpassroutes);



app.listen(port, () =>
{
    console.log(`Server is running on port ${port}`)
})