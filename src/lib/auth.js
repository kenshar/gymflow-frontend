// Auth module that uses the backend API for authentication
import { authAPI, setAuthToken, removeAuthToken } from './api';

let currentUser = null;
const subscribers = new Set();

export function onAuthStateChanged(cb) {
  // notify immediately with current user
  cb(currentUser);
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export async function signIn(email, password) {
  if (!email || !password) {
    const err = new Error('Invalid credentials');
    err.code = 'auth/invalid-credentials';
    throw err;
  }

  try {
    // Call the backend login API
    const response = await authAPI.login({ email, password });

    // Store the JWT token
    if (response.access_token) {
      setAuthToken(response.access_token);
    }

    // Set current user from response
    currentUser = {
      uid: response.member?.id || response.user?.id,
      email: response.member?.email || response.user?.email || email,
      role: response.member?.role || response.user?.role || 'member',
      ...response.member,
      ...response.user,
    };

    // Store user info in localStorage for persistence
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    subscribers.forEach((cb) => cb(currentUser));
    return currentUser;
  } catch (error) {
    console.error('Login API error:', error);
    const err = new Error(error.message || 'Login failed');
    err.code = 'auth/invalid-credentials';
    throw err;
  }
}

export async function signOut() {
  currentUser = null;
  removeAuthToken();
  localStorage.removeItem('currentUser');
  subscribers.forEach((cb) => cb(null));
}

// Restore user from localStorage on page load
export function initAuth() {
  const token = localStorage.getItem('authToken');
  const storedUser = localStorage.getItem('currentUser');

  if (token && storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
      subscribers.forEach((cb) => cb(currentUser));
    } catch (e) {
      // Invalid stored user, clear everything
      signOut();
    }
  }
}

// Initialize auth on module load
initAuth();

export default {
  onAuthStateChanged,
  signIn,
  signOut,
  initAuth,
};
