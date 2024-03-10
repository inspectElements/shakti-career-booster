import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="resume-bg"></section>
            <div className="main-content flex flex-row gap-5 dashboard-content">
                <div
                    className="community-blob z-10"
                    onClick={() => {
                        navigate("/community");
                    }}
                ></div>
                <div
                    className="interview-blob z-10"
                    onClick={() => {
                        navigate("/company-ranking");
                    }}
                ></div>
                <div
                    className="samarthya-blob z-10"
                    onClick={() => {
                        navigate("/interview-system");
                    }}
                ></div>
                <div
                    className="sahayak-blob z-10"
                    onClick={() => {
                        navigate("/sahayak");
                    }}
                ></div>
            </div>
        </>
    );
};

export default Dashboard;
