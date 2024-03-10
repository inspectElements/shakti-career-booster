import React from "react";

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
    return (
        <>
            <section className="resume-bg"></section>
            <div className="sahayak-content flex flex-col justify-start items-center gap-5 bg-[#0E1121] border-[#3A4065] border-2 border-solid">
                <h2 className="text-white m-0 !mt-6">
                    <span className="text-[#FF5093]">Sahayak</span> Career
                    Counsellor
                </h2>
                <div className="w-full h-[2px] !bg-[#3A4065]" />
                <div className="h-[75%] w-[95%] flex flex-col justify-start items-start gap-1 mt-10 !overflow-y-scroll overflow-hidden no-scrollbar">
                    <AiChat
                        msg={
                            "hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi"
                        }
                    />
                    <MyChat
                        msg={
                            "hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi hi"
                        }
                    />
                </div>
                <div className="w-full h-[2px] mt-1 !bg-[#3A4065]" />
                <div className="h-[5%] w-full flex flex-row justify-center items-center gap-4">
                    <input className="w-[75%] bg-[#3A4065] border-none outline-none h-[34px] text-xl text-white rounded-lg px-4"></input>
                    <button
                        className="h-9 none rounded-lg bg-[#FF5093] px-6 text-center align-middle font-sans text-[1.05rem] font-bold text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        data-ripple-light="true"
                    >
                        Ask Question
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sahayak;
