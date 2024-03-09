import React from "react";
import { useNavigate } from "react-router-dom";

const Resume = () => {
    const navigate = useNavigate();
    return (
        <section className="resume-bg ">
            <label htmlFor="resume">
                <div
                    className="h-[275px] w-[425px] absolute top-[30%] left-[35%] object-cover object-center dropzone"
                    alt="nature image"
                />
            </label>
            <input
                accept="application/pdf"
                style={{ display: "none" }}
                id="resume"
                type="file"
                onChange={() => navigate("/landing")}
            />
        </section>
    );
};

export default Resume;
