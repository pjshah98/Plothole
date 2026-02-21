import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-6">
        About Plothole
      </h1>
      <div className="prose prose-invert prose-slate max-w-none space-y-6 text-slate-300">
        <p className="text-lg leading-relaxed">
          Plothole is a community where you spot plot holes, continuity errors, and logic gaps in movies and TV. 
          Share what you find, vote on others’ investigations, and earn XP as you climb the ranks.
        </p>
        <section>
          <h2 className="font-display text-xl font-semibold text-white mt-8 mb-3">How it works</h2>
          <ul className="space-y-2 list-disc list-inside text-slate-400">
            <li><strong className="text-slate-300">Pick a case</strong> — Choose a movie from our catalog.</li>
            <li><strong className="text-slate-300">Spot the flaw</strong> — Find inconsistencies, contradictions, or impossible events.</li>
            <li><strong className="text-slate-300">Submit your take</strong> — Describe the plot hole and earn XP when you submit.</li>
            <li><strong className="text-slate-300">Vote & comment</strong> — Upvote strong investigations and join the discussion.</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white mt-8 mb-3">Ranks</h2>
          <p className="text-slate-400 mb-2">
            Your XP total unlocks ranks:
          </p>
          <ul className="space-y-1 text-slate-400">
            <li>0+ — New Recruit 🧢</li>
            <li>100+ — Case Solver 🧐</li>
            <li>200+ — Clue Hunter 🕵️</li>
            <li>300+ — Plot Detective 🔍</li>
            <li>500+ — Master Sleuth 🧠</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl font-semibold text-white mt-8 mb-3">Posters</h2>
          <p className="text-slate-400">
            Movie posters are provided by The Movie Database (TMDB). You can add more via our script — see <code className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-400 text-sm">docs/MOVIE_POSTERS.md</code>.
          </p>
        </section>
      </div>
      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          to="/cases"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          Browse cases
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 border border-slate-600 hover:border-slate-500 text-slate-300 font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default About;
