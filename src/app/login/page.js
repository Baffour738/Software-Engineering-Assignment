'use client';

import { useRouter } from 'next/navigation';
import './login.css';

export default function Login() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Student Management System</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="register-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
} 