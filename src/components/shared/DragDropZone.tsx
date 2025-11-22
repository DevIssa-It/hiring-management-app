import { useDragDrop } from '../../hooks/useDragDrop';

interface DragDropZoneProps {
  onFilesDropped: (files: File[]) => void;
  accept?: string;
  children?: React.ReactNode;
}

export const DragDropZone = ({ onFilesDropped, accept, children }: DragDropZoneProps) => {
  const { isDragging, dragHandlers } = useDragDrop(onFilesDropped);

  return (
    <div
      {...dragHandlers}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      {children || (
        <div>
          <p className="text-gray-600 mb-2">📁 Drag & drop files here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
          {accept && <p className="text-xs text-gray-400 mt-2">Accepted: {accept}</p>}
        </div>
      )}
    </div>
  );
};
