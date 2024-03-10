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
    let id = "jdojdw-jdwijd"
    return (
        <>
            <a href={"http://localhost:4000/interviews/interview_"+id+".json"}></a>
        </>
    );
}
