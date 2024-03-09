import "regenerator-runtime/runtime";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";

const AiInterview = ()=> {
    const { transcript } = useSpeechRecognition();
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
    };
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
        <div>
            <p>{transcript}</p>
            <button onClick={startInterview}>Start Interview</button>
            <button
                onClick={() => {
                    SpeechRecognition.startListening({
                        continuous: true,
                        interimResults: true,
                    });
                }}
            >
                Start
            </button>
            <button onClick={stop}>Stop</button>
        </div>
    );
}

export default AiInterview
