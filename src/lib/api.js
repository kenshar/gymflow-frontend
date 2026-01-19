const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to make authenticated requests
const makeRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Network error' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Auth API
export const authAPI = {
  login: (credentials) => makeRequest('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),

  register: (userData) => makeRequest('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),

  getCurrentUser: () => makeRequest('/api/auth/me'),
  refreshToken: () => makeRequest('/api/auth/refresh', { method: 'POST' }),
  verifyToken: () => makeRequest('/api/auth/verify'),
};

// Members API
export const membersAPI = {
  getAll: () => makeRequest('/api/members'),
  getById: (id) => makeRequest(`/api/members/${id}`),
  create: (memberData) => makeRequest('/api/members', {
    method: 'POST',
    body: JSON.stringify(memberData),
  }),
  update: (id, memberData) => makeRequest(`/api/members/${id}`, {
    method: 'PUT',
    body: JSON.stringify(memberData),
  }),
  delete: (id) => makeRequest(`/api/members/${id}`, {
    method: 'DELETE',
  }),
};

// Attendance API
export const attendanceAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/api/attendance?${queryString}`);
  },
  checkIn: (memberId, notes = null) => makeRequest('/api/attendance', {
    method: 'POST',
    body: JSON.stringify({ member_id: memberId, notes }),
  }),
  checkOut: (attendanceId) => makeRequest(`/api/attendance/${attendanceId}/checkout`, {
    method: 'PUT',
  }),
  getToday: () => makeRequest('/api/attendance/today'),
};

// Memberships API
export const membershipsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/api/memberships?${queryString}`);
  },
  getPlans: () => makeRequest('/api/memberships/plans'),
  createPlan: (planData) => makeRequest('/api/memberships/plans', {
    method: 'POST',
    body: JSON.stringify(planData),
  }),
  create: (membershipData) => makeRequest('/api/memberships', {
    method: 'POST',
    body: JSON.stringify(membershipData),
  }),
  update: (id, membershipData) => makeRequest(`/api/memberships/${id}`, {
    method: 'PUT',
    body: JSON.stringify(membershipData),
  }),
  delete: (id) => makeRequest(`/api/memberships/${id}`, {
    method: 'DELETE',
  }),
};

// Workouts API
export const workoutsAPI = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return makeRequest(`/api/workouts?${queryString}`);
  },
  create: (workoutData) => makeRequest('/api/workouts', {
    method: 'POST',
    body: JSON.stringify(workoutData),
  }),
  getById: (id) => makeRequest(`/api/workouts/${id}`),
  update: (id, workoutData) => makeRequest(`/api/workouts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(workoutData),
  }),
  delete: (id) => makeRequest(`/api/workouts/${id}`, {
    method: 'DELETE',
  }),
};

// Utility functions
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
