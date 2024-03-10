import React from "react";
import { useLocation } from "react-router-dom";

export default function InterviewResult() {
    const container = React.useRef(null);
    const { state } = useLocation();
    React.useEffect(() => {
        if (container.current) {
            container.current.innerHTML = state;
        }
    }, [container, state]);
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="w-[40%] p-3 bg-[#47314a] rounded-xl text-center">
                Interview Result
            </h1>
            <div
                ref={container}
                className="w-[40%] h-[75vh] bg-[#302032] rounded-xl p-3 overflow-auto"
            ></div>
        </div>
    );
}
