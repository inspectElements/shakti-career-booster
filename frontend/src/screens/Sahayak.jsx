import { useRef, useState } from "react";

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

const MyChat = (props) => {
    return (
        <>
            <>
                <div className="h-auto my-2 mr-2 w-full flex justify-end items-end">
                    <div className="h-auto w-[65%] my-2 rounded-lg py-3 px-6 text-lg bg-[#060A1E] border-[#FF6FA6] border-2 border-solid ">
                        {props.msg}
                    </div>
                </div>
            </>
        </>
    );
};

const Sahayak = () => {
    const navigate = useNavigate();
    let [chats, setChats] = useState([
        {
            role: "bot",
            content:
                "Hello, I am Sahayak, your career counsellor. How can I help you today?",
        },
    ]);
    let inputRef = useRef(null);
    return (
        <>
            <section className="resume-bg"></section>
            <button
                onClick={() => {
                    navigate("/dashboard");
                }}
                className="z-10 absolute top-[6%] right-[10%] middle none rounded-lg bg-[#1F243E] py-2 px-6 text-center align-middle font-sans text-[1.05rem] font-bold border-[#3A4065] text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                data-ripple-light="true"
            >
                Dashboard
            </button>
            <div className="sahayak-content flex flex-col justify-start items-center gap-5 bg-[#0E1121] border-[#3A4065] border-2 border-solid">
                <h2 className="text-white m-0 !mt-6">
                    <span className="text-[#FF5093]">Sahayak</span> Career
                    Counsellor
                </h2>
                <div className="w-full h-[2px] !bg-[#3A4065]" />
                <div className="h-[75%] w-[95%] flex flex-col justify-start items-start gap-1 mt-10 !overflow-y-scroll overflow-hidden no-scrollbar">
                    {chats.map((chat, index) => {
                        if (chat.role === "bot") {
                            return <AiChat msg={chat.content} key={index} />;
                        } else {
                            return <MyChat msg={chat.content} key={index} />;
                        }
                    })}
                </div>
                <div className="w-full h-[2px] mt-1 !bg-[#3A4065]" />
                <div className="h-[5%] w-full flex flex-row justify-center items-center gap-4">
                    <input
                        ref={inputRef}
                        className="w-[75%] bg-[#3A4065] border-none outline-none h-[34px] text-xl text-white rounded-lg px-4"
                    ></input>
                    <button
                        className="h-9 none rounded-lg bg-[#FF5093] px-6 text-center align-middle font-sans text-[1.05rem] font-bold text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                        onClick={() => {
                            let newChats = [...chats];
                            newChats.push({
                                role: "user",
                                content: inputRef.current.value,
                            });
                            fetch("http://localhost:4000/sahayak-ask", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    message: inputRef.current.value,
                                }),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    newChats.push({
                                        role: "bot",
                                        content: data,
                                    });
                                    setChats(newChats);
                                });
                            inputRef.current.value = "";
                        }}
                    >
                        Ask Question
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sahayak;
