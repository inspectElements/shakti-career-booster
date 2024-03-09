import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import OcrComponent from "../components/OcrComponent.jsx";


const Resume = () => {
    const [file, setFile] = useState(null);
    const [fileDownloadURL, setFileDownloadURL] = useState(null);
    const [uploading, setUploading] = useState(false);

    const navigate = useNavigate();
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        const unique_id = uuid();
        try {
            setUploading(true);
            const storageRef = ref(storage, `files/${unique_id + file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on("state_changed",
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log(downloadURL)
                        setFileDownloadURL(downloadURL);
                        alert(downloadURL)
                    });
                    alert("Uploaded successfully");
                },
            );

        } catch (e) {
            console.log(e);
        } finally {
            setUploading(false);
        }

    };

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
                onChange={() => {
                    handleFileChange, navigate("/landing");
                }}
            />
            <button 
            onClick={handleUpload}
            className="absolute top-[75%] left-[48%] middle none rounded-lg bg-[#1F243E] py-3 px-6 text-center align-middle font-sans text-[1.05rem] font-bold border-[#3A4065] text-white transition-all focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer"
            data-ripple-light="true"
            >
                Done
            </button>



            {fileDownloadURL && <OcrComponent fileDownloadURL={fileDownloadURL} />}
        </section>
    );
};

export default Resume;
