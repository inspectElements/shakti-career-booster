import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

const OcrComponent = ({ fileDownloadURL }) => {
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
    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const pageText = await extractTextFromPage(page);
      text += pageText + "\n";
    }

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
        const pdfBlob = await fetch(fileDownloadURL).then((response) => response.blob());
        const dataBuffer = await pdfBlob.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: dataBuffer }).promise;

        await extractTextFromPdf(pdf);

        setIsLoading(false);
      } catch (err) {
        setError(err);
        console.error(err);
        setIsLoading(false);
      }
    };

    fetchFile();
  }, [fileDownloadURL]);

  return (
    <div className="mt-8">
      {isLoading ? (
        <PuffLoader color="#3498db" size={100} type="Puff" />
      ) : error ? (
        <p className="text-red-500">{error.message}</p>
      ) : numPages ? (
        <>
          <h2 className="text-2xl font-bold mb-4">OCR Result</h2>
          <Document file={fileDownloadURL} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} onLoadSuccess={extractTextFromPdf} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <pre className="whitespace-pre-wrap">{ocrText}</pre>
        </>
      ) : null}
    </div>
  );
};

export default OcrComponent;
