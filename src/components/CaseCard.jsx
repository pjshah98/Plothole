import { Link } from 'react-router-dom';
import { getMovieImageUrl, getPlaceholderUrl } from '../utils/moviePoster';
import { formatGenre } from '../utils/formatGenre';
import DifficultyTag from './DifficultyTag';

const CaseCard = ({ title, description, image, id, genre, difficulty, tmdbPosterPath }) => {
  const shortDesc = description.length > 100 ? description.slice(0, 100) + '…' : description;
  const genreLabel = formatGenre(genre);
  const posterUrl = getMovieImageUrl({ image, tmdbPosterPath, title });

  return (
    <Link
      to={`/cases/${id}`}
      className="group block rounded-2xl border border-slate-800/80 bg-slate-900/60 overflow-hidden shadow-lg hover:border-cyan-500/40 hover:shadow-cyan-500/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={posterUrl}
          alt={title}
          onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(title); }}
        />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {genreLabel && (
            <p className="text-cyan-400/90 text-xs font-medium uppercase tracking-wider">
              {genreLabel}
            </p>
          )}
          <DifficultyTag difficulty={difficulty} />
        </div>
        <h2 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h2>
        <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {shortDesc}
        </p>
        <span className="inline-flex items-center gap-1 mt-3 text-cyan-400 text-sm font-medium group-hover:gap-2 transition-all">
          Investigate
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  );
};

export default CaseCard;
