import React, { useState, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set PDF.js worker path (update the path as needed)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Upload() {
  const [file, setFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="upload">
      <input
        ref={fileInputRef}
        type="file"
        className="upload__input"
        onChange={handleFileChange}
        accept="application/pdf"
      />
      {file && (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      )}
      {file && numPages && (
        <p>
          Page {pageNumber} of {numPages}
        </p>
      )}
    </div>
  );
}

export default Upload;
