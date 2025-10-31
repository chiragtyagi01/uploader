import React, { useState } from 'react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { Mail, Lock, User } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // State for the form
  const [isSignUp, setIsSignUp] = useState(false); // Toggles between Sign In and Sign Up
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // 1. Google Login Handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to dashboard after login
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      setError(getFriendlyErrorMessage(error.code));
    }
    setLoading(false);
  };

  // 2. Email/Password Form Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp) {
      // --- SIGN UP ---
      if (!name) {
        setError('Please enter your name.');
        setLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set the user's display name
        await updateProfile(userCredential.user, {
          displayName: name
        });
        navigate('/'); // Redirect to dashboard
      } catch (error) {
        console.error("Error signing up: ", error);
        setError(getFriendlyErrorMessage(error.code));
      }
    } else {
      // --- SIGN IN ---
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); // Redirect to dashboard
      } catch (error) {
        console.error("Error signing in: ", error);
        setError(getFriendlyErrorMessage(error.code));
      }
    }
    setLoading(false);
  };

  // 3. Toggle Mode
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };
  
  // 4. Friendly Error Messages
  const getFriendlyErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password. Please try again.';
      case 'auth/email-already-in-use':
        return 'This email is already in use. Please sign in.';
      case 'auth/weak-password':
        return 'Password is too weak. Must be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      default:
        return 'An error occurred. Please try again.';
    }
  };

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {isSignUp ? 'Sign up to start uploading' : 'Sign in to your account'}
          </p>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <User size={20} />
              </span>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 font-semibold text-lg text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 transition-all disabled:bg-gray-400 dark:disabled:bg-gray-600"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        {/* "OR" Divider */}
        <div className="flex items-center justify-center space-x-2">
          <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
          <span className="text-sm text-gray-500 dark:text-gray-400">OR</span>
          <span className="h-px w-full bg-gray-300 dark:bg-gray-600"></span>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center px-4 py-3 font-semibold text-lg text-gray-700 dark:text-gray-200 
                     bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm 
                     hover:bg-gray-50 dark:hover:bg-gray-600 transition-all disabled:opacity-50"
        >
          <FcGoogle className="w-6 h-6 mr-3" />
          {isSignUp ? 'Sign up with Google' : 'Sign in with Google'}
        </button>

        {/* Toggle Button */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={toggleMode}
            className="ml-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

