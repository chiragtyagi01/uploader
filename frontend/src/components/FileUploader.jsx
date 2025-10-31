// src/components/FileUploader.jsx
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, File as FileIcon, X } from 'lucide-react';

const FileUploader = ({ onFileAccepted, accept, fileType }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const acceptedFile = acceptedFiles[0];
      setFile(acceptedFile);
      
      // Create preview
      if (acceptedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target.result);
        reader.readAsDataURL(acceptedFile);
      } else if (acceptedFile.type.startsWith('video/')) {
        setPreview(URL.createObjectURL(acceptedFile));
      } else {
        setPreview(null); // No preview for other file types
      }

      onFileAccepted(acceptedFile);
    }
  }, [onFileAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    onFileAccepted(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer
            ${isDragActive ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10' : 'border-gray-300 dark:border-gray-600'}
            hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors`}
        >
          <input {...getInputProps()} />
          <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            {isDragActive ? 'Drop the file here ...' : `Drag & drop ${fileType} here, or click to select`}
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Single file only. Max 50MB.
          </p>
        </div>
      ) : (
        <div className="p-6 border rounded-lg relative bg-white dark:bg-gray-800 shadow-sm">
          <button
            onClick={removeFile}
            className="absolute -top-3 -right-3 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
          >
            <X size={18} />
          </button>
          
          <div className="flex items-center space-x-4">
            {preview && file.type.startsWith('image/') ? (
              <img src={preview} alt="Preview" className="w-24 h-24 rounded-lg object-cover" />
            ) : preview && file.type.startsWith('video/') ? (
              <video src={preview} className="w-24 h-24 rounded-lg object-cover" controls />
            ) : (
              <FileIcon className="w-16 h-16 text-gray-400" />
            )}
            <div className="flex-1">
              <p className="font-medium text-lg truncate">{file.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;