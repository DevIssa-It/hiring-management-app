import { useState } from 'react';
import { ApplicationNote } from '../../types/note';

interface ApplicationNotesProps {
  applicationId: string;
  notes: ApplicationNote[];
  onAddNote: (content: string, isPrivate: boolean) => void;
}

export const ApplicationNotes = ({ applicationId, notes, onAddNote }: ApplicationNotesProps) => {
  const [newNote, setNewNote] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote, isPrivate);
      setNewNote('');
      setIsPrivate(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h3 className="text-lg font-semibold">Notes</h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
        
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-600">Private note (only visible to admins)</span>
          </label>
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Note
          </button>
        </div>
      </form>

      <div className="space-y-3 mt-6">
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No notes yet</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">{note.authorName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
                {note.isPrivate && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    Private
                  </span>
                )}
              </div>
              <p className="text-gray-700">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
