import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/cases', label: 'All Cases' },
  { to: '/about', label: 'About' },
];

const Layout = ({ children }) => {
  const location = useLocation();
  const { user, loading, logout } = useAuth();

  return (
    <div className="min-h-screen min-w-0 w-full max-w-[100vw] overflow-x-hidden bg-slate-950 text-slate-100 flex flex-col pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-cyan-500 bg-slate-900 text-white font-medium"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-2 min-h-14 sm:min-h-16 py-2 flex-wrap sm:flex-nowrap" aria-label="Main navigation">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight text-white hover:text-cyan-400 transition-colors flex-shrink-0"
          >
            <span className="text-2xl" aria-hidden>🕳️</span>
            <span>Plothole</span>
          </Link>
          <div className="flex items-center gap-1 sm:gap-2 min-w-0 flex-shrink flex-wrap justify-end">
            {navLinks.map(({ to, label }) => {
              const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
              return (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            {loading ? (
              <span className="pl-2 border-l border-slate-700 text-slate-500 text-sm">
                …
              </span>
            ) : user ? (
              <span className="flex items-center gap-2 pl-2 border-l border-slate-700">
                <span className="text-slate-400 text-sm hidden sm:inline">Hi, {user.username}</span>
                <button
                  type="button"
                  onClick={logout}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all"
                >
                  Log out
                </button>
              </span>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === '/login' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <footer className="border-t border-slate-800/80 py-8 mt-auto" role="contentinfo">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-slate-500 text-sm">
            <span>Spot the plot holes. Earn XP. Climb the ranks.</span>
            <nav className="flex items-center gap-6" aria-label="Footer">
              <Link to="/about" className="hover:text-cyan-400 transition-colors">About</Link>
              <Link to="/cases" className="hover:text-cyan-400 transition-colors">All Cases</Link>
              <Link to="/submit" className="hover:text-cyan-400 transition-colors">Submit a flaw</Link>
            </nav>
          </div>
          <p className="text-center text-slate-600 text-xs mt-4">— Plothole</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
