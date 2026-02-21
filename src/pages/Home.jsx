import { Link } from 'react-router-dom';
import { allCases } from '../data/movieData';
import { getMovieImageUrl, getPlaceholderUrl } from '../utils/moviePoster';
import DifficultyTag from '../components/DifficultyTag';

// Case of the day: use first case (F1) or rotate by day of year for variety
function getCaseOfTheDay() {
  const day = Math.floor(Date.now() / 86400000) % Math.max(1, allCases.length);
  return allCases[day] ?? allCases[0];
}

const Home = () => {
  const featured = getCaseOfTheDay();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <section className="text-center mb-14 sm:mb-18 animate-fade-in-up">
        <p className="text-cyan-400/90 text-sm font-medium uppercase tracking-widest mb-2">
          Plot Hole Detective
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight mb-4">
          Welcome, Detective
        </h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          A new mystery awaits your sharp mind. Spot inconsistencies, submit your theories, and earn XP.
        </p>
      </section>

      {/* Case of the day */}
      <section
        id="featured-case"
        className="mb-12 animate-fade-in-up stagger-1"
      >
        <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span>🧩</span> Case of the Day
        </h2>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden shadow-xl hover:border-cyan-500/30 transition-colors duration-300">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-80 flex-shrink-0">
              <img
                className="w-full h-72 md:h-full object-cover"
                src={getMovieImageUrl(featured)}
                alt={`${featured.title} poster`}
                onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(featured.title); }}
              />
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
                  🎬 {featured.title}
                </h3>
                <DifficultyTag difficulty={featured.difficulty} />
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 line-clamp-4">
                {featured.description}
              </p>
              <Link
                to={`/cases/${featured.id}`}
                className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl w-fit transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Investigation
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="mb-12 animate-fade-in-up stagger-2 rounded-2xl border border-slate-800/80 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-purple-500/10 p-6 sm:p-8"
      >
        <h4 className="font-display text-xl sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
          <span>🔍</span> How It Works
        </h4>
        <div className="grid sm:grid-cols-3 gap-6 text-slate-300">
          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">🧠</span>
            <div>
              <p className="font-semibold text-white mb-1">Read the case</p>
              <p className="text-sm">You'll get a short movie scene or plot summary.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">🕵️</span>
            <div>
              <p className="font-semibold text-white mb-1">Spot the flaw</p>
              <p className="text-sm">Find inconsistencies, contradictions, or logic holes.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl flex-shrink-0">🚀</span>
            <div>
              <p className="font-semibold text-white mb-1">Submit your theory</p>
              <p className="text-sm">Explain your observation and earn XP to climb the ranks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center animate-fade-in-up stagger-3">
        <Link
          to="/cases"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 hover:from-indigo-500 hover:via-purple-500 hover:to-violet-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-purple-500/30 active:scale-[0.98]"
        >
          🗂️ Explore All Cases
        </Link>
      </section>
    </div>
  );
};

export default Home;
