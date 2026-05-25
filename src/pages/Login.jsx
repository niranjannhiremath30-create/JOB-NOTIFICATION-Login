import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../design-system';
import { useAuth } from '../AuthContext';

export default function Login() {
  const { user, loading, login, signup } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [loading, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (isRegister) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard', { replace: true });
    } catch (authError) {
      const message = authError?.code
        ? authError.code.replace('auth/', '').replace(/-/g, ' ')
        : authError?.message || 'Unable to sign in';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page-center">
        <div className="login-card card">
          <p>Checking authentication…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="login-card card">
        <TopBar />
        <h1>{isRegister ? 'Create account' : 'Login'}</h1>
        <p className="login-help">
          {isRegister
            ? 'Register a new account using your email and a secure password.'
            : 'Sign in with your registered email and password to access the job portal.'}
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__field">
            <label htmlFor="email" className="login-form__label">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="login-form__field">
            <label htmlFor="password" className="login-form__label">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <div className="login-form__actions">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting
                ? isRegister
                  ? 'Creating account…'
                  : 'Signing in…'
                : isRegister
                ? 'Sign up'
                : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="login-switch">
          {isRegister ? (
            <>
              <span>Already have an account?</span>
              <button
                type="button"
                className="btn btn-secondary login-switch__button"
                onClick={() => {
                  setIsRegister(false);
                  setError('');
                }}
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              <span>New here?</span>
              <button
                type="button"
                className="btn btn-secondary login-switch__button"
                onClick={() => {
                  setIsRegister(true);
                  setError('');
                }}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
