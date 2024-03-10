import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function InterviewResult() {
    const navigate = useNavigate();
    const container = React.useRef(null);
    const { state } = useLocation();
    React.useEffect(() => {
        if (container.current) {
            container.current.innerHTML = state;
        }
    }, [container, state]);
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
            <div className="sahayak-content flex flex-col justify-start items-center gap-5 bg-[#0E1121] border-[#3A4065] border-2 border-solid"></div>
        </>
        // <div className="flex flex-col justify-center items-center h-screen">
        //     <h1 className="w-[40%] p-3 bg-[#47314a] rounded-xl text-center">
        //         Interview Result
        //     </h1>
        //     <div
        //         ref={container}
        //         className="w-[40%] h-[75vh] bg-[#302032] rounded-xl p-3 overflow-auto"
        //     ></div>
        // </div>
    );
}
