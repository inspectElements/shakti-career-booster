require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
var cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
var maskSensitiveContent = require("./src/utils/mask");

app.use(express.json());
app.use(express.static("public", { maxAge: 3600000 }));
app.use(function (req, res, next) {
    res.setHeader("x-powered-by", "sanjeevni@1.1");
    res.setHeader("x-original-host", "ngrok.io");
    next();
});

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:5173",
        ],
        credentials: true,
    })
);

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey,
});
const openai = new OpenAIApi(configuration);

const initialInterview = {
    role: "system",
    // You are an AI interviewer. You are conducting an interview for a software engineering position. Ask questions about the candidate's experience, skills, and background. The interviewee will answer your questions. You can ask follow-up questions based on their answers.
    // Start by telling me about your experience and skills relevant to the software engineering role.
    content: `
    you are a gender neutral interviewer. You are interviewing a candidate for a software engineering position. You can ask questions about their skills and experience.
    ask one question at a time and wait for the interviewee to answer before asking the next question
    you can also ask the interviewee to elaborate on their answers
    you can ask the interviewee to describe a project they have worked on in the past
    you can ask the interviewee about some coding questions to check there logic building skills
    
    based on the interviewee's answers you have to give segregated score of the skills and experience
    do not ask all questions at once and make it sequential do include roles in output
    `,
};
let messageInterview = {};
let ats = {};
app.post("/interview/start", async (req, res) => {
    const id = req.body.id;
    let messages = [];

    messageInterview[id] = [
        initialInterview,
        {
            role: "assistant",
            content: "interviewee's resume" + JSON.stringify(ats),
        },
    ];
    messages = messageInterview[id];
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
    });
    messages.push(response.data.choices[0].message);
    res.json(response.data.choices[0].message.content);
});

app.post("/interview/answer", async (req, res) => {
    const msg = req.body.message;
    const id = req.body.id;
    const prePrompt = "";
    const fullPrompt = prePrompt + msg;
    let prompt = {
        role: "user",
        content: fullPrompt,
    };
    let messages = [];
    try {
        messages = messageInterview[id];
        messages.push(prompt);
    } catch (e) {
        res.json("Interview not started");
    }
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
    });
    messages.push(response.data.choices[0].message);
    res.json(response.data.choices[0].message.content);
});

app.post("/ats-text", async (req, res) => {
    let text = req.body.text;
    let id = req.body.id;
    text = maskSensitiveContent(text);
    const response = await openai.createChatCompletion({
        model: "gpt-4-turbo-preview",
        messages: [
            {
                role: "system",
                content:
                    "you are an ats. you have to parse the resume and give the details of the candidate in form of raw json only with keys as experience, projects, skills, job_titles_suitable and achievements very concisely and not catagorised",
            },
            {
                role: "user",
                content: text,
            },
        ],
    });
    // console.log(response.data.choices[0].message.content);
    let jsonString = response.data.choices[0].message.content.slice(7, -3);
    ats[id] = JSON.parse(jsonString);
    console.log(jsonString);
    res.json({ text: JSON.parse(jsonString) });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
