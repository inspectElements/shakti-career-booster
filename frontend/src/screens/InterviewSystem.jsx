import "regenerator-runtime/runtime";
import { useState } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import { Power, Mic } from "lucide-react";

const AiChat = (props) => {
    return (
        <>
            <div className="h-auto my-2 flex justify-start items-end">
                <div className="">
                    <img
                        className="h-10 w-10 mr-4"
                        src={
                            "https://png.pngtree.com/png-vector/20230104/ourmid/pngtree-chatbot-customer-service-clipart-element-png-image_6551134.png"
                        }
                    ></img>
                </div>
                <div className="h-auto w-[90%] my-2 rounded-lg py-3 px-6 text-lg bg-[#060A1E] border-[#FF6FA6] border-2 border-solid mr-2">
                    {props.msg}
                </div>
            </div>
        </>
    );
};

// const MyChat = (props) => {
//     return (
//         <>
//             <>
//                 <div className="h-auto my-2 mr-2 w-full flex justify-end items-end">
//                     <div className="h-auto w-[65%] my-2 rounded-lg py-3 px-6 text-lg bg-[#060A1E] border-[#FF6FA6] border-2 border-solid ">
//                         {props.msg}
//                     </div>
//                 </div>
//             </>
//         </>
//     );
// };

const InterviewSystem = () => {
    const { transcript } = useSpeechRecognition();
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
    const updateTime = () => {
        let t = time++;
        setTime(t);
        setTimeout(updateTime, 1000);
    };
    return (
        <>
            <section className="background h-screen w-screen flex justify-center items-center">
                <div className="h-[90vh] w-[90vw] flex flex-row gap-4 justify-center items-center">
                    <div className="h-full w-[25%] flex flex-col gap-4">
                        <div className="h-[75%] w-full bg-[#0E1121] border-[#3A4065] border-2 border-solid rounded-md flex flex-col gap-4 justify-start items-center pt-10">
                            <div className="h-[80%] w-[80%] bg-white"></div>
                            <h1 className="text-white ">
                                Hello, Eshan Trivedi.
                            </h1>
                        </div>
                        <div className="h-[23%] w-full bg-[#0E1121] border-[#3A4065] border-2 border-solid rounded-md flex flex-col justify-center items-center">
                            <h3 className="text-white m-0">
                                {state === -1
                                    ? "Start Interview"
                                    : "Interview in progress"}
                            </h3>
                            <h1 className="text-white text-8xl m-0 spacing tracking-wide">{`${Math.floor(
                                time / 60
                            )}:${
                                time % 60 < 10 ? `0${time % 60}` : time % 60
                            }`}</h1>
                        </div>
                    </div>
                    <div className="h-full w-[80%] bg-[#0E1121] border-[#3A4065] border-2 border-solid rounded-md flex flex-col justify-start items-center">
                        <div className="interview-header"></div>
                        <div className="w-full h-[2px] mt-1 !bg-[#3A4065]" />
                        <div className="h-[75%] w-[95%] flex flex-col justify-start items-start gap-1 mt-10">
                            {/* <h1 className="text-white ">All the Best Eshan.</h1> */}
                            <AiChat
                                msg={
                                    "hi hello how are you hi hello how are you hi hello how are you hi hello how are you hi hello how are you hi hello how are you hi hello how are you hi hello how are you"
                                }
                            />
                        </div>
                        <div className="w-full h-[2px] mt-1 !bg-[#3A4065]" />
                        <div className="h-[5%] w-full flex flex-row justify-center items-center my-6 gap-4">
                            <input className="w-[75%] bg-[#3A4065] border-none outline-none h-full text-xl text-white rounded-lg px-4"></input>
                            <div className="w-[15%]">
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
                                    className={`cursor-pointer h-[50%] w-full border-none rounded-lg shadow-2xl transition duration-700 ease flex items-center justify-center
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
                                        <Power color="#fff" className="h-9" />
                                    ) : state === 0 ? (
                                        <Mic color="#fff" className="h-9" />
                                    ) : (
                                        <div className="h-9 flex items-center justify-center">
                                            <div className="h-2 w-2 bg-white rounded-full animate-ping mx-1"></div>
                                            <div className="h-2 w-2 bg-white rounded-full animate-ping mx-1"></div>
                                            <div className="h-2 w-2 bg-white rounded-full animate-ping mx-1"></div>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default InterviewSystem;
