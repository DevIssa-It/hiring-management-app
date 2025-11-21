interface BulkActionsBarProps {
  selectedCount: number;
  onDelete: () => void;
  onStatusChange: (status: string) => void;
  onClear: () => void;
}

export const BulkActionsBar = ({ selectedCount, onDelete, onStatusChange, onClear }: BulkActionsBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
      <span className="font-medium">{selectedCount} selected</span>
      
      <select
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-1 rounded bg-white text-gray-900"
        defaultValue=""
      >
        <option value="" disabled>Change Status</option>
        <option value="reviewed">Reviewed</option>
        <option value="shortlisted">Shortlisted</option>
        <option value="rejected">Rejected</option>
      </select>

      <button onClick={onDelete} className="px-3 py-1 bg-red-500 rounded hover:bg-red-600">
        Delete
      </button>

      <button onClick={onClear} className="px-3 py-1 bg-gray-500 rounded hover:bg-gray-600">
        Clear
      </button>
    </div>
  );
};
