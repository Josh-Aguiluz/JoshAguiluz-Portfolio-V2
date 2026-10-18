import React, { useId, useRef, useState } from 'react';
import { FileText, Folder, FolderOpen } from 'lucide-react';

export interface ExplorerItem {
  id: string;
  /** Sidebar label, e.g. "bio.md" or "backend/". */
  label: string;
  kind: 'file' | 'folder';
  /** Indent level in the sidebar tree (0 = top level). */
  depth?: number;
  content: React.ReactNode;
}

interface ExplorerWindowProps {
  /** Title bar text, e.g. "ABOUT_ME.EXE". */
  title: string;
  /** Path shown in the path bar; `{label}` is replaced with the active item's label. */
  path: string | ((item: ExplorerItem) => string);
  /** Sidebar heading. */
  sidebarTitle?: string;
  items: ExplorerItem[];
  /** Accessible name for the sidebar list. */
  label: string;
  /** Minimum content height, so switching files doesn't make the page jump. */
  minHeightClass?: string;
  /** Lets content open another item (e.g. a folder tile opening that folder). */
  renderContent?: (item: ExplorerItem, open: (id: string) => void) => React.ReactNode;
}

/**
 * Desktop-style file explorer: title bar, path bar, a sidebar of files/folders and a content pane.
 * The sidebar is an accessible tablist (arrow keys, Home/End); each item's content is a tabpanel.
 */
export default function ExplorerWindow({
  title,
  path,
  sidebarTitle = 'Directories',
  items,
  label,
  minHeightClass = 'md:min-h-[26rem]',
  renderContent,
}: ExplorerWindowProps) {
  const [activeId, setActiveId] = useState(items[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const active = items.find((i) => i.id === activeId) ?? items[0];

  const open = (id: string) => setActiveId(id);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (index + 1) % items.length;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (index - 1 + items.length) % items.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="surface overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-border bg-surface-2 px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <p className="truncate font-mono text-xs tracking-wide text-fg-muted sm:text-sm">
          {title} <span className="text-fg-subtle">—</span> {active.label.replace(/\/$/, '').toUpperCase()}
        </p>
      </div>

      {/* Path bar */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-2.5">
        <span className="font-mono text-xs text-fg-subtle">Path:</span>
        <code className="truncate rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-xs text-fg">
          {typeof path === 'function' ? path(active) : path.replace('{label}', active.label)}
        </code>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[15rem_minmax(0,1fr)]">
        {/* Sidebar */}
        <nav className="min-w-0 border-b border-border p-3 md:border-b-0 md:border-r md:p-4" aria-label={label}>
          <p className="mb-3 hidden px-2 font-mono text-xs uppercase tracking-wider text-fg-subtle md:block">{sidebarTitle}</p>
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={label}
            className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible"
          >
            {items.map((item, i) => {
              const selected = item.id === activeId;
              const Icon = item.kind === 'file' ? FileText : selected ? FolderOpen : Folder;
              return (
                <button
                  key={item.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  id={`${uid}-tab-${item.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  style={{ paddingLeft: `${0.625 + (item.depth ?? 0) * 1}rem` }}
                  className={`flex shrink-0 items-center gap-2 rounded-md border py-2 pr-3 text-left font-mono text-sm transition-colors md:w-full ${
                    selected
                      ? 'border-accent/50 bg-accent-soft text-fg'
                      : 'border-transparent text-fg-muted hover:bg-surface-2 hover:text-fg'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${item.kind === 'folder' ? 'text-accent' : ''}`} aria-hidden="true" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Content */}
        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active.id}`}
          tabIndex={0}
          className={`min-w-0 p-5 outline-none sm:p-8 ${minHeightClass}`}
        >
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-fg-subtle">
            {`// Active ${active.kind === 'file' ? 'file' : 'dir'}: ${active.label}`}
          </p>
          {renderContent ? renderContent(active, open) : active.content}
        </div>
      </div>
    </div>
  );
}

/** Two-column metadata table used inside explorer files. */
export function MetaTable({ rows }: { rows: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="mt-6 overflow-hidden rounded-lg border border-border text-sm">
      {rows.map((row, i) => (
        <div key={row.label} className={`grid grid-cols-[7.5rem_1fr] sm:grid-cols-[9rem_1fr] ${i > 0 ? 'border-t border-border' : ''}`}>
          <dt className="bg-surface-2 px-3 py-2.5 font-mono text-xs text-fg-subtle sm:text-sm">{row.label}</dt>
          <dd className="px-3 py-2.5 font-medium text-fg">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
