import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <p className="text-6xl mb-4" aria-hidden>🕳️</p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
        Page not found
      </h1>
      <p className="text-slate-400 mb-8">
        This case might have been redacted. Try the home page or browse all cases.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          Home
        </Link>
        <Link
          to="/cases"
          className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-slate-300 font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          All cases
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
