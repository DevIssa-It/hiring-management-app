import { Shortcut } from '../../hooks/useKeyboardShortcuts';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shortcuts: Shortcut[];
}

export const ShortcutsModal = ({ isOpen, onClose, shortcuts }: ShortcutsModalProps) => {
  if (!isOpen) return null;

  const formatKey = (shortcut: Shortcut) => {
    const keys = [];
    if (shortcut.ctrl) keys.push('Ctrl');
    if (shortcut.shift) keys.push('Shift');
    keys.push(shortcut.key.toUpperCase());
    return keys.join(' + ');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </div>
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-gray-700">{shortcut.description}</span>
              <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                {formatKey(shortcut)}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
