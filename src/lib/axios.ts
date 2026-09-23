import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api', // adjust to your NestJS port
  withCredentials: true, // IMPORTANT: automatically attaches & receives HttpOnly cookies
  headers: {
    'Content-Type': 'application/json',
  },
});