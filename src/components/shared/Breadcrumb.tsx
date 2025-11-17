import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => (
  <nav aria-label="Breadcrumb" className={className}>
    <ol className="flex items-center gap-2 mb-4">
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          {idx > 0 && (
              <span className="mx-1 text-neutral-100 flex items-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
          )}
          {item.active ? (
            <span
              className={`px-3 py-1 rounded-lg border border-neutral-50 bg-neutral-30 text-neutral-100 font-semibold text-sm ${item.className || ''}`}
              aria-current="page"
            >
              {item.label}
            </span>
          ) : item.href ? (
            <a
              href={item.href}
              className={`px-3 py-1 rounded-lg border border-neutral-40 bg-neutral-10 text-neutral-100 font-medium text-sm hover:bg-neutral-30 ${item.className || ''}`}
              onClick={item.onClick}
            >
              {item.label}
            </a>
          ) : (
            <button
              type="button"
              className={`px-3 py-1 rounded-lg border border-neutral-40 bg-neutral-10 text-neutral-100 font-medium text-sm hover:bg-neutral-30 ${item.className || ''}`}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </ol>
  </nav>
);