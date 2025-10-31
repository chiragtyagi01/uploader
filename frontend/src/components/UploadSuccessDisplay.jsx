import React, { useRef } from 'react';
import { Copy, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';

/**
 * A component to display the success URL with Copy and Open buttons.
 */
const UploadSuccessDisplay = ({ fileUrl }) => {
  const urlInputRef = useRef(null);

  // Handles copying the URL to the clipboard
  const handleCopy = () => {
    if (urlInputRef.current) {
      urlInputRef.current.select();
      try {
        // Use document.execCommand for broad browser/iFrame compatibility
        document.execCommand('copy');
        toast.success('Link copied to clipboard!');
      } catch (err) {
        console.log(err);
        toast.error('Failed to copy link.');
      }
      // Deselect the text
      window.getSelection().removeAllRanges();
    }
  };

  if (!fileUrl) {
    return null;
  }

  return (
    <div className="p-4 mt-6 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg shadow-sm">
      <p className="text-sm font-medium text-green-800 dark:text-green-200">Upload Successful!</p>
      <div className="flex items-center space-x-2 mt-2">
        <input
          type="text"
          ref={urlInputRef}
          value={fileUrl}
          readOnly
          className="flex-1 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none"
        />
        <button
          onClick={handleCopy}
          title="Copy link"
          className="p-2 text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Copy size={18} />
        </button>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
          className="p-2 flex-shrink-0 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
};

export default UploadSuccessDisplay;