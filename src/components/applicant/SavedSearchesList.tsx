import { SavedSearch } from '../../hooks/useSavedSearches';

interface SavedSearchesListProps {
  searches: SavedSearch[];
  onApply: (filters: Record<string, any>) => void;
  onDelete: (id: string) => void;
}

export const SavedSearchesList = ({ searches, onApply, onDelete }: SavedSearchesListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-3">Saved Searches</h3>
      {searches.length === 0 ? (
        <p className="text-gray-500 text-sm">No saved searches</p>
      ) : (
        <div className="space-y-2">
          {searches.map(search => (
            <div key={search.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <button
                onClick={() => onApply(search.filters)}
                className="flex-1 text-left text-sm font-medium"
              >
                {search.name}
              </button>
              <button
                onClick={() => onDelete(search.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
