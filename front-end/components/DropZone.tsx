import React, { useState, ChangeEvent, DragEvent } from "react";
import Image from "next/image";

type DropZoneProps = {
  handleFileSelect: (files: FileList) => void;
  errorMessage: string | undefined;
};

const DropZone: React.FC<DropZoneProps> = ({ handleFileSelect, errorMessage }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
    
      <input
        id="fileSelect"
        type="file"
        multiple
        onChange={handleFileInputChange}
      />
      <label htmlFor="fileSelect">Select Files</label>
      {isDragActive && <h3>Drop your files here</h3>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default DropZone;
