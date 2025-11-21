interface QuickFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  counts: Record<string, number>;
}

export const QuickFilters = ({ activeFilter, onFilterChange, counts }: QuickFiltersProps) => {
  const filters = [
    { key: 'all', label: 'All', count: counts.all || 0 },
    { key: 'submitted', label: 'New', count: counts.submitted || 0 },
    { key: 'reviewed', label: 'Reviewed', count: counts.reviewed || 0 },
    { key: 'shortlisted', label: 'Shortlisted', count: counts.shortlisted || 0 },
    { key: 'accepted', label: 'Accepted', count: counts.accepted || 0 },
    { key: 'rejected', label: 'Rejected', count: counts.rejected || 0 },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeFilter === filter.key
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label} ({filter.count})
        </button>
      ))}
    </div>
  );
};
