import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="resume-bg"></section>
            <button
                onClick={() => {
                    navigate("/");
                }}
                className="z-10 absolute top-[6%] right-[10%] middle none rounded-lg bg-[#1F243E] py-2 px-6 text-center align-middle font-sans text-[1.05rem] font-bold border-[#3A4065] text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                data-ripple-light="true"
            >
                Move ahead
            </button>
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
