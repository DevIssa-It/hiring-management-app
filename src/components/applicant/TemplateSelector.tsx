import { ApplicationTemplate } from '../../types/template';

interface TemplateSelectorProps {
  templates: ApplicationTemplate[];
  onSelect: (template: ApplicationTemplate) => void;
  onDelete: (id: string) => void;
}

export const TemplateSelector = ({ templates, onSelect, onDelete }: TemplateSelectorProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-semibold mb-3">Use Template</h3>
      {templates.length === 0 ? (
        <p className="text-gray-500 text-xs">No saved templates</p>
      ) : (
        <div className="space-y-2">
          {templates.map(template => (
            <div key={template.id} className="flex items-center gap-2">
              <button
                onClick={() => onSelect(template)}
                className="flex-1 px-3 py-2 text-left text-sm bg-gray-50 hover:bg-gray-100 rounded"
              >
                {template.name}
              </button>
              <button
                onClick={() => onDelete(template.id)}
                className="text-red-500 hover:text-red-700"
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
