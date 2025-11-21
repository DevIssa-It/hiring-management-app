import { useState, useEffect } from 'react';
import { ApplicationTemplate } from '../types/template';
import { ApplicationData } from '../types';

export const useApplicationTemplates = (userId: string) => {
  const [templates, setTemplates] = useState<ApplicationTemplate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`app_templates_${userId}`);
    if (stored) {
      setTemplates(JSON.parse(stored));
    }
  }, [userId]);

  const saveTemplate = (name: string, data: Partial<ApplicationData>) => {
    const newTemplate: ApplicationTemplate = {
      id: Date.now().toString(),
      name,
      data,
      userId,
      createdAt: new Date(),
    };
    const updated = [...templates, newTemplate];
    setTemplates(updated);
    localStorage.setItem(`app_templates_${userId}`, JSON.stringify(updated));
  };

  const deleteTemplate = (id: string) => {
    const updated = templates.filter(t => t.id !== id);
    setTemplates(updated);
    localStorage.setItem(`app_templates_${userId}`, JSON.stringify(updated));
  };

  return { templates, saveTemplate, deleteTemplate };
};
