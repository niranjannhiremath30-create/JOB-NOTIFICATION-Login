import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        <div className="login-card__top">
          <div className="login-card__brand-icon">J</div>
          <div>
            <p className="login-card__eyebrow">Log in with your work email</p>
            <h1>{isRegister ? 'Create account' : 'Sign in'}</h1>
            <p className="login-card__subtitle">
              {isRegister
                ? 'Create an account with your work email to get started.'
                : 'Use your work email to log in to the job notification portal.'}
            </p>
          </div>
        </div>

        {!isRegister && (
          <button
            type="button"
            className="btn btn-secondary login-google-btn"
            onClick={() => setError('Google sign-in is not configured yet. Please use email and password.')}
          >
            <span className="login-google-btn__icon">G</span>
            Log in with Google
          </button>
        )}

        {!isRegister && (
          <div className="login-divider">
            <span>OR</span>
          </div>
        )}

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

          <div className="login-aux">
            <div />
            {!isRegister && (
              <button
                type="button"
                className="login-forgot"
                onClick={() => setError('Password reset is not available in this demo.')}
              >
                Forgot password?
              </button>
            )}
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
                : 'Log in'}
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
