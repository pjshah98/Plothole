import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CaseCard from '../components/CaseCard';
import { formatGenre } from '../utils/formatGenre';
import { allCases } from '../data/movieData';

const PER_PAGE = 24;
const allGenres = ['', ...[...new Set(allCases.map((m) => m.genre).filter(Boolean))].sort()];

const SORT_OPTIONS = [
  { value: '', label: 'Default order' },
  { value: 'a-z', label: 'A–Z' },
  { value: 'z-a', label: 'Z–A' },
  { value: 'year-desc', label: 'Year: newest first' },
  { value: 'year-asc', label: 'Year: oldest first' },
];

const AllCases = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromUrl = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [currentPage, setCurrentPage] = useState(pageFromUrl);

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl]);

  const filteredCases = useMemo(() => {
    return allCases.filter((movie) => {
      const matchesGenre =
        selectedGenre === '' || movie.genre.toLowerCase() === selectedGenre.toLowerCase();
      const matchesSearch =
        searchTerm === '' || movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGenre && matchesSearch;
    });
  }, [searchTerm, selectedGenre]);

  const sortedCases = useMemo(() => {
    const list = [...filteredCases];
    if (selectedSort === 'a-z') {
      return list.sort((a, b) =>
        (a.title || '').localeCompare(b.title || '', undefined, { sensitivity: 'base' })
      );
    }
    if (selectedSort === 'z-a') {
      return list.sort((a, b) =>
        (b.title || '').localeCompare(a.title || '', undefined, { sensitivity: 'base' })
      );
    }
    if (selectedSort === 'year-desc') {
      return list.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
    }
    if (selectedSort === 'year-asc') {
      return list.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
    }
    return filteredCases;
  }, [filteredCases, selectedSort]);

  const totalPages = Math.max(1, Math.ceil(sortedCases.length / PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PER_PAGE;
  const paginatedCases = useMemo(
    () => sortedCases.slice(start, start + PER_PAGE),
    [sortedCases, start]
  );

  const setSearchAndResetPage = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.set('page', '1');
      return next;
    });
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev.toString());
      next.set('page', '1');
      return next;
    });
  };

  const goToPage = (p) => {
    const next = Math.max(1, Math.min(p, totalPages));
    setCurrentPage(next);
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev.toString());
      nextParams.set('page', String(next));
      return nextParams;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showCount = sortedCases.length;
  const rangeStart = showCount === 0 ? 0 : start + 1;
  const rangeEnd = Math.min(start + PER_PAGE, showCount);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-2">
        🗂️ All Cases
      </h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8">
        <input
          type="text"
          placeholder="Search cases…"
          value={searchTerm}
          onChange={(e) => setSearchAndResetPage(setSearchTerm)(e.target.value)}
          className="flex-1 min-w-0 px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors"
        />
        <select
          value={selectedGenre}
          onChange={(e) => setSearchAndResetPage(setSelectedGenre)(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors sm:w-44"
        >
          <option value="">All genres</option>
          {allGenres.filter(Boolean).map((g) => (
            <option key={g} value={g}>
              {formatGenre(g)}
            </option>
          ))}
        </select>
        <select
          value={selectedSort}
          onChange={handleSortChange}
          className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-colors sm:w-44"
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value || 'default'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {filteredCases.length === 0 ? (
        <p className="text-slate-500 text-center py-12">
          No cases match your filters. Try a different search or genre.
        </p>
      ) : (
        <>
          <p className="text-slate-400 text-sm mb-4">
            Showing {rangeStart}–{rangeEnd} of {showCount} cases
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0 m-0">
            {paginatedCases.map((movie, i) => (
              <li
                key={movie.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <CaseCard
                  id={movie.id}
                  title={movie.title}
                  description={movie.description}
                  image={movie.image}
                  genre={movie.genre}
                  difficulty={movie.difficulty}
                  tmdbPosterPath={movie.tmdbPosterPath}
                />
              </li>
            ))}
          </ul>

          {totalPages > 1 && (
            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2"
              aria-label="Pagination"
            >
              <button
                type="button"
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage <= 1}
                className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    if (totalPages <= 7) return true;
                    if (p === 1 || p === totalPages) return true;
                    if (Math.abs(p - safePage) <= 2) return true;
                    return false;
                  })
                  .reduce((acc, p, i, arr) => {
                    const prev = arr[i - 1];
                    if (prev !== undefined && p - prev > 1) acc.push('…');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === '…' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-slate-500">
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        type="button"
                        onClick={() => goToPage(item)}
                        className={`min-w-[2.5rem] py-2 rounded-lg border transition-colors ${
                          item === safePage
                            ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400'
                            : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {item}
                      </button>
                    )
                  )}
              </div>
              <button
                type="button"
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages}
                className="px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                Next
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default AllCases;
