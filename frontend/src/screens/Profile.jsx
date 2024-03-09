import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="resume-bg"></section>
            <div
                className="main-content flex flex-row gap-5 yogyata-content"
                onClick={() => {
                    navigate("/skill-assesment");
                }}
            ></div>
        </>
    );
};

export default Profile;
