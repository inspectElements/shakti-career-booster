// OcrComponent.jsx
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";


pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const OcrComponent = ({ fileDownloadURL }) => {
    let navigate = useNavigate();
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [ocrText, setOcrText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const extractTextFromPage = async (page) => {
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map((item) => item.str);
        return textItems.join(" ");
    };

    const extractTextFromPdf = async (pdf) => {
        setIsLoading(true);
        let text = "";

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const pageText = await extractTextFromPage(page);
            text += pageText + "\n";
        }

        fetch("http://localhost:4000/ats-text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: "jdojdw-jdwijd", text }),
        })
            .then((res) => res.json())
            .then((data) => {
                navigate("/profile");
            });
        setOcrText(text);
    };

    useEffect(() => {
        if (!fileDownloadURL) {
            alert("No PDF file specified.");
            return;
        }

        setIsLoading(true);
        setError(null);

        const fetchFile = async () => {
            try {
                // setIsLoading(true);
                const response = await fetch(fileDownloadURL);
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch PDF. HTTP status: ${response.status}`
                    );
                }
                const pdfBlob = await response.blob();
                const dataBuffer = await pdfBlob.arrayBuffer();
                const pdf = await pdfjs.getDocument({ data: dataBuffer })
                    .promise;
                await extractTextFromPdf(pdf);
            } catch (err) {
                setError(err);
            }

        };
        fetchFile();
    }, [fileDownloadURL]);
    console.log(ocrText);
    return (
        <div className="mt-8">
            {isLoading ? (
                <div>
                    <ClipLoader color="#4A90E2" loading={isLoading} size={35} />
                    <p>Loading PDF...</p>
                </div>
            ) : error ? (
                <p className="text-red-500">{error.message}</p>
            ) : numPages ? (
                <>
                    <h2 className="text-2xl font-bold mb-4">OCR Result</h2>
                    <Document
                        file={fileDownloadURL}
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page
                            pageNumber={pageNumber}
                            onLoadSuccess={extractTextFromPdf}
                        />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                    <p className="whitespace-pre-wrap">{ocrText}</p>
                </>
            ) : null}
        </div>
    );
};

export default OcrComponent;
