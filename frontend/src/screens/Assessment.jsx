import React from "react";
import "regenerator-runtime/runtime";
import { useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import { Power, Mic } from "lucide-react";

const Assessment = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(-1);
    const startInterview = () => {
        fetch("http://localhost:4000/interview/start", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: "jdojdw-jdwijd" }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
        setTime(new Date().getTime());
    };

    let [time, setTime] = useState(0);
    const stop = () => {
        SpeechRecognition.stopListening();
        fetch("http://localhost:4000/interview/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: "jdojdw-jdwijd", message: transcript }),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };
    return (
        <>
            <section className="resume-bg"></section>
            <button
                onClick={() => {
                    navigate("/");
                }}
                className="z-10 absolute top-[6%] right-[10%] middle none rounded-lg bg-[#1F243E] py-2 px-6 text-center align-middle font-sans text-[1.05rem] font-bold border-[#3A4065] text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                data-ripple-light="true"
            >
                Complete Assessment
            </button>
            <div
                className="main-content flex flex-row gap-5 assessment-content"
                onClick={() => {
                    navigate("/skill-assesment");
                }}
            >
                <div className="h-10 w-10 z-2 absolute top-[16.5rem] right-[4.5rem]">
                    <button
                        onClick={() => {
                            if (state === -1) {
                                setState(0);
                                startInterview();
                                updateTime();
                            }
                            if (state === 0) {
                                setState(1);
                                SpeechRecognition.startListening({
                                    continuous: true,
                                    interimResults: true,
                                });
                            }
                            if (state === 1) {
                                setState(0);
                                stop();
                            }
                        }}
                        className={`cursor-pointer h-full w-full border-none rounded-full shadow-2xl transition duration-700 ease flex items-center justify-center
                        ${
                            state === -1
                                ? "bg-[#571b4b] shadow-[#571b4bcb]"
                                : state === 0
                                ? "bg-[#f443368b] shadow-[#f443366e] backdrop-blur-3xl"
                                : "bg-[#4caf4fc5] shadow-[#4caf4f94]"
                        }
                    `}
                    >
                        {state === -1 ? (
                            <Power color="#fff" className="h-[75%] w-[75%]" />
                        ) : state === 0 ? (
                            <Mic color="#fff" className="h-[75%] w-[75%]" />
                        ) : (
                            <div className="h-[75%] w-[75%] flex items-center justify-center">
                                <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                                <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                                <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default Assessment;
