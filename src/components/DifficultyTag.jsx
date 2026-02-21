const levels = {
  easy: { label: 'Easy', className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' },
  medium: { label: 'Medium', className: 'bg-amber-500/20 text-amber-400 border-amber-500/40' },
  hard: { label: 'Hard', className: 'bg-red-500/20 text-red-400 border-red-500/40' },
};

const DifficultyTag = ({ difficulty }) => {
  const config = levels[difficulty?.toLowerCase()];
  if (!config) return null;
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default DifficultyTag;
