import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
// We no longer need ProtectedRoute here
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ImageUpload from './pages/ImageUpload';
import VideoUpload from './pages/VideoUpload';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* The Login page is separate */}
            <Route path="/login" element={<Login />} />
            
            {/* UPDATED: The main layout is now public.
              It's no longer wrapped in <ProtectedRoute>.
              This lets guest users "explore" the app.
            */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="image-upload" element={<ImageUpload />} />
              <Route path="video-upload" element={<VideoUpload />} />
            </Route>

          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
