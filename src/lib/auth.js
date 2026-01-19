// Lightweight local auth stub to replace Firebase for frontend-only deployments
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

  // Create a simple user object and notify subscribers
  currentUser = { uid: 'local-' + Date.now(), email };
  subscribers.forEach((cb) => cb(currentUser));
  return currentUser;
}

export async function signOut() {
  currentUser = null;
  subscribers.forEach((cb) => cb(null));
}

export default {
  onAuthStateChanged,
  signIn,
  signOut,
};
