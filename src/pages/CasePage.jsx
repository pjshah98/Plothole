import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { allCases } from '../data/movieData';
import { getMovieImageUrl, getPlaceholderUrl } from '../utils/moviePoster';
import { useAuth } from '../context/AuthContext';
import FlawCard from '../components/FlawCard';
import DifficultyTag from '../components/DifficultyTag';
import { formatGenre } from '../utils/formatGenre';
import { getSubmissions, saveSubmissions } from '../utils/caseStorage';
import { getUserXP, addXP } from '../utils/xpStorage';

const getRankTitle = (xp) => {
  if (xp >= 500) return 'Master Sleuth 🧠';
  if (xp >= 300) return 'Plot Detective 🔍';
  if (xp >= 200) return 'Clue Hunter 🕵️';
  if (xp >= 100) return 'Case Solver 🧐';
  return 'New Recruit 🧢';
};

function scoreFromVotes(votes) {
  if (!votes || typeof votes !== 'object') return { up: 0, down: 0 };
  const list = Object.values(votes);
  return {
    up: list.filter((v) => v === 'up').length,
    down: list.filter((v) => v === 'down').length,
  };
}

const CasePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const movie = allCases.find((item) => item.id === id);

  const [plotHoles, setPlotHoles] = useState([]);
  const [XP, setXP] = useState(0);
  const [rank, setRank] = useState(getRankTitle(0));
  const [newPlotHole, setNewPlotHole] = useState('');
  const [commentByEntry, setCommentByEntry] = useState({});

  useEffect(() => {
    if (id) setPlotHoles(getSubmissions(id));
  }, [id]);

  useEffect(() => {
    if (user) setXP(getUserXP(user.id));
  }, [user]);

  useEffect(() => {
    setRank(getRankTitle(XP));
  }, [XP]);

  const persist = useCallback(
    (next) => {
      setPlotHoles(next);
      if (id) saveSubmissions(id, next);
    },
    [id]
  );

  const handleSubmit = () => {
    if (newPlotHole.trim() === '' || !user) return;
    const newEntry = {
      id: String(Date.now()),
      content: newPlotHole.trim(),
      userId: user.id,
      username: user.username,
      votes: {},
      comments: [],
    };
    persist([newEntry, ...plotHoles]);
    setXP(addXP(user.id, 10));
    setNewPlotHole('');
  };

  const handleVote = (entryId, direction) => {
    if (!user) return;
    const entry = plotHoles.find((e) => e.id === entryId);
    if (!entry) return;
    const votes = { ...(entry.votes || {}) };
    const current = votes[user.id];
    if (current === direction) delete votes[user.id];
    else votes[user.id] = direction;
    const next = plotHoles.map((e) =>
      e.id === entryId ? { ...e, votes } : e
    );
    persist(next);
  };

  const handleAddComment = (entryId, text) => {
    if (!user || !text.trim()) return;
    const entry = plotHoles.find((e) => e.id === entryId);
    if (!entry) return;
    const comment = {
      id: String(Date.now()),
      userId: user.id,
      username: user.username,
      content: text.trim(),
      createdAt: new Date().toISOString(),
    };
    const comments = [...(entry.comments || []), comment];
    const next = plotHoles.map((e) =>
      e.id === entryId ? { ...e, comments } : e
    );
    persist(next);
    setCommentByEntry((prev) => ({ ...prev, [entryId]: '' }));
  };

  if (!movie) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="font-display text-2xl font-bold text-white mb-2">
          Case not found
        </h1>
        <p className="text-slate-400 mb-6">We couldn't find the case you're looking for.</p>
        <Link
          to="/cases"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium"
        >
          ← Back to All Cases
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link
        to="/cases"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 text-sm font-medium mb-6 transition-colors"
      >
        ← All Cases
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-10 animate-fade-in-up">
        <div className="flex-shrink-0">
          <img
            className="w-full md:w-72 rounded-2xl shadow-xl object-cover aspect-[2/3] border border-slate-800/80"
            src={getMovieImageUrl(movie)}
            alt={movie.title}
            onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(movie.title); }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-cyan-400/90 text-sm font-medium uppercase tracking-wider">
              {formatGenre(movie.genre)}
            </p>
            <DifficultyTag difficulty={movie.difficulty} />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            {movie.title}
          </h1>
          <p className="text-slate-400 leading-relaxed">{movie.description}</p>
        </div>
      </div>

      {user && (
        <div className="grid grid-cols-2 gap-4 mb-10 animate-fade-in-up stagger-1">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5">
            <p className="text-slate-500 text-sm mb-0.5">Your XP</p>
            <p className="text-2xl font-bold text-amber-400">{XP} XP</p>
          </div>
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-5">
            <p className="text-slate-500 text-sm mb-0.5">Your rank</p>
            <p className="text-lg font-semibold text-emerald-400">{rank}</p>
          </div>
        </div>
      )}

      <section className="mb-10 animate-fade-in-up stagger-2 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6">
        <h2 className="font-display text-xl font-semibold text-white mb-3 flex items-center gap-2">
          🕳️ Submit a plot hole
        </h2>
        {user ? (
          <>
            <textarea
              rows={4}
              placeholder="Describe the inconsistency you found…"
              value={newPlotHole}
              onChange={(e) => setNewPlotHole(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-y min-h-[100px] transition-colors"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-5 py-2.5 rounded-xl transition-colors hover:scale-[1.02] active:scale-[0.98]"
            >
              Submit
            </button>
          </>
        ) : (
          <p className="text-slate-400">
            <Link to="/login" state={{ from: { pathname: `/cases/${id}` } }} className="text-cyan-400 hover:text-cyan-300 font-medium">
              Log in
            </Link>
            {' or '}
            <Link to="/signup" state={{ from: { pathname: `/cases/${id}` } }} className="text-cyan-400 hover:text-cyan-300 font-medium">
              sign up
            </Link>
            {' to submit plot holes and earn XP.'}
          </p>
        )}
      </section>

      <section className="animate-fade-in-up stagger-3">
        <h2 className="font-display text-xl font-semibold text-white mb-4 flex items-center gap-2">
          🌐 Community submissions
        </h2>
        <div className="space-y-4">
          {plotHoles.length === 0 ? (
            <p className="text-slate-500 py-8 text-center rounded-xl border border-dashed border-slate-700">
              No submissions yet. Be the first to spot a plot hole!
            </p>
          ) : (
            plotHoles.map((entry) => {
              const { up, down } = scoreFromVotes(entry.votes);
              const score = up - down;
              const myVote = user ? entry.votes?.[user.id] : null;
              const comments = entry.comments || [];
              const newComment = commentByEntry[entry.id] ?? '';

              return (
                <FlawCard
                  key={entry.id}
                  entry={entry}
                  score={score}
                  myVote={myVote}
                  comments={comments}
                  newComment={newComment}
                  isLoggedIn={!!user}
                  casePath={`/cases/${id}`}
                  onVote={handleVote}
                  onAddComment={handleAddComment}
                  onCommentChange={(entryId, value) =>
                    setCommentByEntry((prev) => ({ ...prev, [entryId]: value }))
                  }
                />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default CasePage;
