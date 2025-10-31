import React from 'react';
import { Link } from 'react-router-dom';
import { UploadCloud, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner (This is fine as-is) */}
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold">
          Welcome back, {user?.displayName || 'User'}!
        </h2>
        <p className="mt-2 text-lg text-indigo-100">
          Ready to upload some files? Get started by selecting an option below.
        </p>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Image Upload Card - UPDATED: shadow-sm, border, and hover state */}
          <Link 
            to="/image-upload" 
            className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 
                       hover:shadow-md hover:border-indigo-400 dark:hover:border-indigo-500 transition-all"
          >
            <div className="flex items-center space-x-4">
              {/* UPDATED: Softer icon background */}
              <div className="p-3 bg-indigo-50 dark:bg-gray-700 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-gray-600 transition-colors">
                <ImageIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Upload an Image</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Supports JPG, PNG, and GIF files.
                </p>
              </div>
            </div>
          </Link>

          {/* Video Upload Card - UPDATED: shadow-sm, border, and hover state */}
          <Link 
            to="/video-upload"
            className="group p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 
                       hover:shadow-md hover:border-purple-400 dark:hover:border-purple-500 transition-all"
          >
            <div className="flex items-center space-x-4">
              {/* UPDATED: Softer icon background */}
              <div className="p-3 bg-purple-50 dark:bg-gray-700 rounded-full group-hover:bg-purple-100 dark:group-hover:bg-gray-600 transition-colors">
                <VideoIcon className="w-6 h-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Upload a Video</h4>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  Supports MP4, WebM, and MOV files.
                </p>
              </div>
            </div>
          </Link>

        </div>
      </div>

      {/* Recent Uploads (Placeholder) - UPDATED: Removed shadow, made border cleaner */}
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Recent Uploads</h3>
        <div className="p-10 flex flex-col items-center justify-center bg-white dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
          <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          <p className="mt-4 text-lg font-medium text-gray-500 dark:text-gray-400">
            Your recent uploads will appear here.
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            (Feature coming soon!)
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
