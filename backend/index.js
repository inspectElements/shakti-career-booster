require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
var cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

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
    you are a gender neutral interviewer. You are interviewing a candidate for a software engineering position. You can ask questions about their experience, skills, and background.
    ask one question at a time and wait for the interviewee to answer before asking the next question
    you can also ask the interviewee to elaborate on their answers
    you can ask the interviewee to describe a project they have worked on in the past
    
    
    based on the interviewee's answers you have to give segregated score of the skills and experience
    do not ask all questions at once and make it sequential do include roles in output
    `,
};
let messageInterview = {};

app.post("/interview/start", async (req, res) => {
    const id = req.body.id;
    let messages = [];
    
    messageInterview[id] = [initialInterview];
    messages = messageInterview[id];
    const response = await openai.createChatCompletion({
        model: "gpt-4",
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
        model: "gpt-4",
        messages,
    });
    messages.push(response.data.choices[0].message);
    res.json(response.data.choices[0].message.content);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
