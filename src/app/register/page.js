'use client';

import { useRouter } from 'next/navigation';
import './register.css';

export default function Register() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just redirect to dashboard
    router.push('/dashboard');
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="fullName" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" required />
          </div>
          <button type="submit" className="register-button">Create Account</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
} 