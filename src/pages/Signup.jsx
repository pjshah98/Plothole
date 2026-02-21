import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MIN_USERNAME = 2;
const MIN_PASSWORD = 4;

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/cases';

  const passwordsMatch = !confirmPassword || password === confirmPassword;
  const passwordLongEnough = !password || password.length >= MIN_PASSWORD;
  const usernameLongEnough = !username.trim() || username.trim().length >= MIN_USERNAME;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please check and try again.');
      return;
    }
    setLoading(true);
    try {
      const result = await signup(username, password);
      if (result.ok) {
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    } catch (_) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-500/20 text-cyan-400 text-2xl mb-4" aria-hidden>
            🕳️
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Create your account
          </h1>
          <p className="text-slate-400 mt-2">
            Join Plothole to submit plot holes, comment, and vote. It's free.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
              >
                <span className="flex-shrink-0" aria-hidden>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="signup-username" className="block text-sm font-medium text-slate-300 mb-1.5">
                Username
              </label>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                disabled={loading}
                className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 disabled:opacity-60 transition-colors"
                placeholder="e.g. detective_alice"
                required
                minLength={MIN_USERNAME}
              />
              {username.trim() && !usernameLongEnough && (
                <p className="mt-1 text-amber-400/90 text-xs">
                  Use at least {MIN_USERNAME} characters
                </p>
              )}
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  disabled={loading}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 disabled:opacity-60 transition-colors"
                  placeholder={`At least ${MIN_PASSWORD} characters`}
                  required
                  minLength={MIN_PASSWORD}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 text-sm font-medium"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {password && !passwordLongEnough && (
                <p className="mt-1 text-amber-400/90 text-xs">
                  Use at least {MIN_PASSWORD} characters
                </p>
              )}
            </div>

            <div>
              <label htmlFor="signup-confirm" className="block text-sm font-medium text-slate-300 mb-1.5">
                Confirm password
              </label>
              <input
                id="signup-confirm"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                disabled={loading}
                className={`w-full px-4 py-3 rounded-xl border bg-slate-800/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-60 transition-colors ${
                  confirmPassword && !passwordsMatch
                    ? 'border-red-500/50 focus:border-red-500/50'
                    : 'border-slate-700 focus:border-cyan-500/50'
                }`}
                placeholder="Type your password again"
                required
              />
              {confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-red-400/90 text-xs">
                  Passwords don't match
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !passwordsMatch || !passwordLongEnough || !usernameLongEnough}
              className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-500/60 disabled:cursor-not-allowed text-slate-950 font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" aria-hidden />
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-400 text-sm">
            Already have an account?{' '}
            <Link
              to="/login"
              state={location.state}
              className="text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
