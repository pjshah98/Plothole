import { Link } from 'react-router-dom';

const SubmitFlaw = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <p className="text-5xl mb-4" aria-hidden>🕳️</p>
      <h1 className="font-display text-2xl font-bold text-white mb-2">
        Submit a plot hole
      </h1>
      <p className="text-slate-400 mb-8">
        Pick a movie from our cases, open it, and use the form on that page to describe the plot hole you found. You'll earn XP when you submit.
      </p>
      <Link
        to="/cases"
        className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl transition-colors"
      >
        Browse cases
      </Link>
    </div>
  );
};

export default SubmitFlaw;
