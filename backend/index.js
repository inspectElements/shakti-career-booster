require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
var cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");
var maskSensitiveContent = require("./src/utils/mask");
const text = `
    Kunal Chaturvedi  #   kunalmanu2468@gmail.com   H   +91 7999250587   ï   Linkedin   §   GitHub   q   Dribbble   Ð   LeetCode  EDUCATION  KJ Somaiya College of Engineering, Mumbai   Aug 2021 - May 2025 Bachelor of Technology (Major in Computer Science) CGPA - 8.6  •   Algorithms, Data Structures, Relational Database Management System, Soft Computing, Automata Compiler Design  •   Honors in Data Science and Analytic ( 2022-2025), OEHM in Product Management and OET in Cyber Security  EXPERIENCE  Computer Society of India - KJSCE - Mumbai   Nov 2022 - present Creative Head   (Jun 2023 - present)  •   Spearheaded and hosted impactful events, such as ”Road to Programming,” ”Fullstack Bootcamp,” and ”Dawn of AI,” captivating over 5000 participants and fostering a dynamic community of learning and engagement.  •   Part and design lead of Eventio   development team, An app for the college which helps to conduct, schedule and manage college events and fests.  Creative Team Member   (Nov 2022 - May 2023)  •   Developed and Designed official website for national level hackthon   Hackerstellar   conducted by the council which had 1500+ registrations and 200 participants from all over India.  •   Conducted workshops on topics like UI and UX, Machine Learning and AI with over 1000 attendees combined.  SMB Digital   - Dubai   Aug 2023 - Sep 2023 Software Developement Intern  •   Architected and deployed operational full-stack websites and platforms, coupled with hands-on experience in API inte- gration, service workers, and backend development. Currently used by over 5000 people.  •   Mastered a diverse tech toolkit encompassing Next.js, React.js, Tailwind CSS, Postman, Node.js, Express.js, showcasing versatility in creating modern and efficient digital solutions.  PROJECTS  Eventio :   Official Event/Fests management app for my college, the app allows you to host, promote and monitor any event with attendance record and ticket system to ensure security and maintenance. Live version  Tech Stack- React, React Native, Tailwind, Firebase Sanjeevni : A hackathon project, Sanjeevni redefines Indian healthcare with a unified digital platform. It centralizes health data, appointments, and analytics for streamlined processes and improved outcomes. Know More  Tech Stack- Typescript, React, Mongo, Node, Express Apni Bachat :   A decentralized bank on testnet cello and polygon. Streamlined interface for transparent money management and loans based on a fair credit score system, promoting financial inclusion. Know More  Tech Stack - Solidity, React, Typescript AudiLook :   A cli based Python music app that allowed you to upload, skip, play/pause, time leap, cut, merge and save your audio files. Based on several different python pakages. Know More  Tech Stack - Mutagen, Pydub, Pygame, FFMpeg ( Libraries ) GoSafe : GoSafe is a machine learning-based routing app that finds the most efficient and safe route for users, while also allowing them to report and track road maintenance in order to improve road safety in India. Know More  Tech Stack - Python, Sckitlearn, MongoDB, React KBlogs :   A blog website with authentic UI that lets you upload, write, edit and post your blogs. You can also create a personal dashboard and can also interact with different users using the community place. Know More  Tech Stack - Nextjs, Tailwind, Mongo Atlas  SKILLS  Languages   Python, C, Cpp, Javascript, Java, Typescript.  Development tech   ReactJs, NextJs, Firebase, APIs. Typescript, React-Native, Mongo, Node, PostgreSQL, MySQL  Designing Tools   Figma, Illustrator, Photoshop, Premiere Pro, Canva  Soft Skills   Detail Oriented, Management, Creative, Product management  ACHIEVEMENTS  •   Won First Prize at Ideate Hackathon as a team of 3 ( NIF mumbai )  •   Runner up at DotSlash 6.0 Hackathon as a part of a team of 3. ( SVNIT Surat)  •   Runner up at Clash of Codes Hackathon as a part of a team of 4. ( DJSCE )  •   Runner up Ideate Hackathon as a team of 3 ( UNL Global )
`;
let mask = maskSensitiveContent(text);
console.log(mask);

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

app.post("/interview/start", async (req, res) => {
    const id = req.body.id;
    let messages = [];

    messageInterview[id] = [initialInterview];
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
