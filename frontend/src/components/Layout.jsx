import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Image, Video, LogOut, Home } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

const Layout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Image Upload', href: '/image-upload', icon: Image },
    { name: 'Video Upload', href: '/video-upload', icon: Video },
  ];

  return (
    // UPDATED: Set the base background for light mode
    <div className="flex h-screen bg-slate-50 dark:bg-gray-900">
      {/* Sidebar - UPDATED: Made white, with a subtle border */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="h-full flex flex-col">
          {/* UPDATED: Subtle border */}
          <div className="p-5 h-16 flex items-center border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Uploader</h1>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 rounded-lg transition-colors
                  ${
                    isActive
                      // UPDATED: Softer active state
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-gray-700 dark:text-indigo-300'
                      // UPDATED: Cleaner hover state
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
                end 
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
          </nav>
          {/* UPDATED: Subtle border */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              // UPDATED: Cleaner hover state
              className="w-full flex items-center px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar - UPDATED: Made white with a subtle border */}
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Welcome, {user?.displayName || 'User'}!</h2>
          <ThemeToggle />
        </header>

        {/* Content Area - Will now have the slate-50 background from body */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
