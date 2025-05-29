import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    if (isLogin) {
      // Login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else {
        setMessage('Logged in successfully!');
        router.replace('/');
      }
    } else {
      // Sign Up
      if (!fullName.trim()) {
        setMessage('Full Name is required.');
        setLoading(false);
        return;
      }
      if (!phone.trim()) {
        setMessage('Phone Number is required.');
        setLoading(false);
        return;
      }
      if (!address.trim()) {
        setMessage('Address is required.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setMessage('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (!agreeTerms) {
        setMessage('You must agree to the Terms of Service.');
        setLoading(false);
        return;
      }
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }
      // Insert profile info if sign up succeeded
      if (data.user) {
        await supabase.from('profiles').insert([
          { id: data.user.id, full_name: fullName, email, phone, address }
        ]);
      }
      setMessage('Check your email for a confirmation link!');
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetMessage('');
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail);
    if (error) setResetMessage(error.message);
    else setResetMessage('Password reset email sent! Check your inbox.');
    setLoading(false);
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        {/* Brand/Logo */}
        <div className="auth-brand">
          <div className="auth-logo">
            <span className="text-3xl text-white font-bold">GE</span>
          </div>
          <span className="auth-brand-name font-pixel">Gawad Electronics</span>
        </div>
        <h2 className="auth-title font-pixel">
          {isLogin ? 'Sign In to Your Account' : 'Create Your Account'}
        </h2>
        <div className="auth-toggle">
          <button
            className={`auth-toggle-btn font-pixel${isLogin ? ' active' : ''}`}
            onClick={() => { setIsLogin(true); setMessage(''); setShowForgot(false); }}
            disabled={isLogin}
          >
            Login
          </button>
          <button
            className={`auth-toggle-btn font-pixel${!isLogin ? ' active' : ''}`}
            onClick={() => { setIsLogin(false); setMessage(''); setShowForgot(false); }}
            disabled={!isLogin}
          >
            Sign Up
          </button>
        </div>
        {showForgot ? (
          <form onSubmit={handleForgotPassword} className="auth-form auth-forgot-form animate-fadein">
            <label className="auth-label">Reset your password</label>
            <div className="auth-input-group">
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
              />
              <span className="auth-input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.591 7.591a2.25 2.25 0 01-3.182 0L2.909 8.584A2.25 2.25 0 012.25 6.993V6.75" /></svg>
              </span>
            </div>
            <button
              type="submit"
              className="auth-btn font-pixel"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>
            <button
              type="button"
              className="auth-link font-pixel"
              onClick={() => { setShowForgot(false); setResetMessage(''); }}
            >
              Back to Login
            </button>
            {resetMessage && <div className="auth-message success font-pixel">{resetMessage}</div>}
          </form>
        ) : (
          <form onSubmit={handleAuth} className="auth-form animate-fadein">
            {!isLogin && (
              <div>
                <label className="auth-label">Full Name</label>
                <div className="auth-input-group">
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    required
                  />
                  <span className="auth-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  </span>
                </div>
              </div>
            )}
            {!isLogin && (
              <div>
                <label className="auth-label">Phone Number</label>
                <div className="auth-input-group">
                  <input
                    type="tel"
                    className="auth-input"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                  />
                  <span className="auth-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25m-19.5 0v.243a2.25 2.25 0 00.659 1.591l7.591 7.591a2.25 2.25 0 003.182 0l7.591-7.591a2.25 2.25 0 00.659-1.591V6.75" /></svg>
                  </span>
                </div>
              </div>
            )}
            {!isLogin && (
              <div>
                <label className="auth-label">Address</label>
                <div className="auth-input-group">
                  <input
                    type="text"
                    className="auth-input"
                    placeholder="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                  />
                  <span className="auth-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0v6.75A2.25 2.25 0 0114.25 19.5h-4.5A2.25 2.25 0 017.5 17.25V10.5m9 0H7.5" /></svg>
                  </span>
                </div>
              </div>
            )}
            <div>
              <label className="auth-label">Email</label>
              <div className="auth-input-group">
                <input
                  type="email"
                  className="auth-input"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
                <span className="auth-input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.591 7.591a2.25 2.25 0 01-3.182 0L2.909 8.584A2.25 2.25 0 012.25 6.993V6.75" /></svg>
                </span>
              </div>
            </div>
            <div>
              <label className="auth-label">Password</label>
              <div className="auth-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                />
                <span className="auth-input-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0v6.75A2.25 2.25 0 0114.25 19.5h-4.5A2.25 2.25 0 017.5 17.25V10.5m9 0H7.5" /></svg>
                </span>
                <button
                  type="button"
                  className="auth-show-btn font-pixel"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {!isLogin && (
                <div style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem'}} className="font-pixel">Password must be at least 6 characters.</div>
              )}
            </div>
            {!isLogin && (
              <div>
                <label className="auth-label">Confirm Password</label>
                <div className="auth-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="auth-input"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <span className="auth-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0V6.75A2.25 2.25 0 0014.25 4.5h-4.5A2.25 2.25 0 007.5 6.75v3.75m9 0v6.75A2.25 2.25 0 0114.25 19.5h-4.5A2.25 2.25 0 017.5 17.25V10.5m9 0H7.5" /></svg>
                  </span>
                </div>
              </div>
            )}
            {!isLogin && (
              <div style={{width: '100%', textAlign: 'left', marginTop: '-0.5rem'}}>
                <label style={{fontSize: '0.95rem', display: 'flex', alignItems: 'center'}}>
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    style={{marginRight: '0.5rem'}}
                  />
                  I agree to the <a href="#" style={{color: '#6366f1', textDecoration: 'underline', marginLeft: '0.2rem'}}>Terms of Service</a>
                </label>
              </div>
            )}
            {isLogin && (
              <button
                type="button"
                className="auth-link font-pixel"
                onClick={() => { setShowForgot(true); setResetEmail(''); setResetMessage(''); }}
              >
                Forgot password?
              </button>
            )}
            <button
              type="submit"
              className="auth-btn font-pixel"
              disabled={loading}
            >
              {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'Login' : 'Sign Up')}
            </button>
            {message && (
              <div className={`auth-message font-pixel ${message.toLowerCase().includes('success') || message.toLowerCase().includes('check your email') ? 'success' : 'error'}`}>{message}</div>
            )}
          </form>
        )}
      </div>
    </div>
  );
} 