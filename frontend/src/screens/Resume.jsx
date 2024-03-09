import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { Spinner } from "@material-tailwind/react";
import OcrComponent from "../components/OcrComponent.jsx";

const Resume = () => {
    const [file, setFile] = useState(null);
    const [fileDownloadURL, setFileDownloadURL] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showImage, setShowImage] = useState(true);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setShowButton(true); 
        setShowImage(false); 
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }
        const unique_id = uuid();
        try {
            setUploading(true);
            const storageRef = ref(storage, `files/${unique_id + file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed", () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log(downloadURL);
                    setFileDownloadURL(downloadURL);
                });
                setTimeout(() => {
                    navigate("/profile");
                }, 5000); 
            });
        } catch (e) {
            console.log(e);
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="resume-bg ">
            {showImage && (
                <label htmlFor="resume">
                    <div
                        className="h-[275px] w-[425px] absolute top-[30%] left-[35%] object-cover object-center dropzone"
                        alt="nature image"
                    />
                </label>
            )}
            <input
                accept="application/pdf"
                style={{ display: "none" }}
                id="resume"
                type="file"
                onChange={handleFileChange}
                onClick={() => {
                    setShowSpinner(false);
                }}
            />
            {showButton && (
                <button
                    onClick={handleUpload}
                    className="absolute top-[45%] left-[39.5%] middle none rounded-lg bg-[#1F243E] py-3 px-6 text-center align-middle font-sans text-[1.05rem] font-bold border-[#3A4065] text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
                    data-ripple-light="true"
                >
                    Move to Authenticity Assessment
                </button>
            )}

            {showSpinner && <Spinner color="blue" size="large" />}
            {fileDownloadURL && (
                <OcrComponent fileDownloadURL={fileDownloadURL} />
            )}
        </section>
    );
};

export default Resume;
