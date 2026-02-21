import { Link } from 'react-router-dom';

const FlawCard = ({
  entry,
  score,
  myVote,
  comments,
  newComment,
  isLoggedIn,
  casePath,
  onVote,
  onAddComment,
  onCommentChange,
}) => {
  return (
    <article
      className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-colors hover:border-slate-700/80"
      aria-labelledby={`flaw-${entry.id}-title`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1 min-w-0">
          <p id={`flaw-${entry.id}-title`} className="text-slate-200">
            {entry.content}
          </p>
          <p className="text-slate-500 text-sm mt-2">— {entry.username}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => onVote(entry.id, 'up')}
            className={`p-2 rounded-lg transition-colors ${
              myVote === 'up'
                ? 'text-emerald-400 bg-emerald-500/20'
                : 'text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/20'
            }`}
            aria-label="Upvote"
            title={isLoggedIn ? 'Upvote' : 'Log in to vote'}
          >
            ▲
          </button>
          <span className="min-w-[2rem] text-center font-semibold text-white tabular-nums" aria-live="polite">
            {score}
          </span>
          <button
            type="button"
            onClick={() => onVote(entry.id, 'down')}
            className={`p-2 rounded-lg transition-colors ${
              myVote === 'down'
                ? 'text-red-400 bg-red-500/20'
                : 'text-slate-400 hover:text-red-400 hover:bg-red-500/20'
            }`}
            aria-label="Downvote"
            title={isLoggedIn ? 'Downvote' : 'Log in to vote'}
          >
            ▼
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800/80">
        <p className="text-slate-500 text-sm font-medium mb-2">
          Comments ({comments.length})
        </p>
        {comments.length > 0 && (
          <ul className="space-y-2 mb-3">
            {comments.map((c) => (
              <li key={c.id} className="text-sm">
                <span className="text-cyan-400/90 font-medium">{c.username}</span>
                <span className="text-slate-500 mx-1">·</span>
                <span className="text-slate-300">{c.content}</span>
              </li>
            ))}
          </ul>
        )}
        {isLoggedIn ? (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add a comment…"
              value={newComment}
              onChange={(e) => onCommentChange(entry.id, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onAddComment(entry.id, newComment);
                }
              }}
              className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              aria-label="Comment on this submission"
            />
            <button
              type="button"
              onClick={() => onAddComment(entry.id, newComment)}
              className="px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium transition-colors"
            >
              Comment
            </button>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">
            <Link to="/login" state={{ from: { pathname: casePath } }} className="text-cyan-400 hover:text-cyan-300">
              Log in
            </Link>
            {' to comment.'}
          </p>
        )}
      </div>
    </article>
  );
};

export default FlawCard;
