// Lightweight local auth stub to replace Firebase for frontend-only deployments
import { setAuthToken, removeAuthToken } from './api';

let currentUser = null;
const subscribers = new Set();

export function onAuthStateChanged(cb) {
  // notify immediately with current user
  cb(currentUser);
  subscribers.add(cb);
  return () => subscribers.delete(cb);
}

export async function signIn(email, password) {
  // Simple mock: accept any non-empty credentials for demo purposes
  if (!email || !password) {
    const err = new Error('Invalid credentials');
    err.code = 'auth/invalid-credentials';
    throw err;
  }

  // Create a simple user object and set auth token
  currentUser = { uid: 'local-' + Date.now(), email };
  setAuthToken('demo-token-' + currentUser.uid);
  subscribers.forEach((cb) => cb(currentUser));
  return currentUser;
}

export async function signOut() {
  currentUser = null;
  removeAuthToken();
  subscribers.forEach((cb) => cb(null));
}

export default {
  onAuthStateChanged,
  signIn,
  signOut,
};
