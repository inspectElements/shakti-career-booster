import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

const Resume = () => {
    const [file, setFile] = useState(null);
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
            uploadTask.on(
                "state_changed",
                (error) => {
                    alert(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            console.log(downloadURL);
                            alert(downloadURL);
                        }
                    );
                }
            );
        } catch (e) {}
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
        </section>
    );
};

export default Resume;
