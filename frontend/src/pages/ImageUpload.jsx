import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import FileUploader from '../components/FileUploader';
import UploadSuccessDisplay from '../components/UploadSuccessDisplay';
import { useNavigate } from 'react-router-dom'; // <-- 1. Import useNavigate

const ImageUpload = () => {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const navigate = useNavigate(); // <-- 2. Get navigate function

  const handleFileAccepted = (acceptedFile) => {
    setFile(acceptedFile);
    setUploadedFileUrl(null); // Clear previous success link when new file is staged
  };

  const handleUpload = async () => {
    // --- 3. THIS IS THE NEW LOGIN CHECK ---
    if (!user) {
      toast.error('You must be logged in to upload files!');
      navigate('/login'); // Redirect to login page
      return;
    }
    // ----------------------------------------

    if (!file) {
      toast.error('Please select a file first!');
      return;
    }

    setUploading(true);
    setUploadedFileUrl(null); // Clear previous success link
    const loadingToast = toast.loading('Uploading image...');

    try {
      const idToken = await user.getIdToken();
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('tags', tags);
      formData.append('email', user.email);

      const res = await axios.post(
        'http://localhost:4000/api/v1/imageupload', // Make sure this port is correct
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${idToken}`
          },
        }
      );

      toast.success('Image uploaded successfully!', { id: loadingToast });
      setUploadedFileUrl(res.data.data.url); // Show the success component
      
      setFile(null); // Clear the file input (handled by FileUploader's state)
      setTags('');

    } catch (error) {
      console.error('Upload failed:', error);
      toast.error(error.response?.data?.message || 'Upload failed!', { id: loadingToast });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Upload Image</h2>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
        <FileUploader
          onFileAccepted={handleFileAccepted}
          accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] }}
          fileType="an image"
        />

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags (optional)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)} // <-- Typo fixed here
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                       focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                       bg-white dark:bg-gray-700"
            placeholder="e.g., nature, tech, travel"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading} // No need to check for !file, handleUpload does it
          className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm
                     text-white bg-indigo-600 hover:bg-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                     disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
        >
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {/* This component will only appear when uploadedFileUrl is set */}
        <UploadSuccessDisplay fileUrl={uploadedFileUrl} />
      </div>
    </div>
  );
};

export default ImageUpload;

