import React from 'react';
import { ChevronRight, Folder } from 'lucide-react';
import ExplorerWindow, { MetaTable, type ExplorerItem } from './ExplorerWindow';
import BrandIconSvg from '../BrandIcons';
import { SKILL_GROUPS, type SkillGroup } from '../../data/skills';

const slug = (category: SkillGroup['category']) => category.toLowerCase().replace(/\s+/g, '-');

function SkillFiles({ group }: { group: SkillGroup }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4" aria-label={`${group.category} skills`}>
      {group.skills.map((skill) => (
        <li
          key={skill.name}
          className="flex flex-col items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-5 text-center transition-colors hover:border-border-strong"
        >
          <span className="flex h-10 items-center gap-1.5">
            {skill.icons?.map((icon) => <BrandIconSvg key={icon} icon={icon} className="h-8 w-8" />)}
          </span>
          <span className="text-sm font-medium leading-snug">{skill.name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SkillsExplorer() {
  const folders: ExplorerItem[] = SKILL_GROUPS.map((group) => ({
    id: slug(group.category),
    label: `${slug(group.category)}/`,
    kind: 'folder',
    depth: 1,
    content: (
      <div>
        <h3 className="text-h3 font-semibold text-accent">{group.category}</h3>
        {group.category === 'Backend' && (
          <p className="mt-2 max-w-[60ch] text-fg-muted">Building efficient, scalable backend systems that solve real-world problems.</p>
        )}
        <div className="mt-6">
          <SkillFiles group={group} />
        </div>
        <MetaTable
          rows={[
            { label: 'Folder:', value: `skills/${slug(group.category)}` },
            { label: 'Items:', value: group.skills.length },
          ]}
        />
      </div>
    ),
  }));

  const root: ExplorerItem = { id: 'skills', label: 'skills/', kind: 'folder', depth: 0, content: null };

  return (
    <ExplorerWindow
      title="SKILLS.EXE"
      path={(item) => `C:/portfolio/${item.id === 'skills' ? '' : 'skills/'}${item.label}`}
      items={[root, ...folders]}
      label="Skill folders"
      minHeightClass="md:min-h-[28rem]"
      renderContent={(item, open) =>
        item.id !== 'skills' ? (
          item.content
        ) : (
          <div>
            <h3 className="text-h3 font-semibold text-accent">Skills</h3>
            <p className="mt-2 max-w-[60ch] text-fg-muted">Backend first, with the frontend, mobile and tooling range to ship complete products.</p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {SKILL_GROUPS.map((group) => (
                <li key={group.category}>
                  <button
                    type="button"
                    onClick={() => open(slug(group.category))}
                    className="group flex w-full items-center gap-3 rounded-lg border border-border bg-surface-2 p-4 text-left transition-colors hover:border-accent/50"
                  >
                    <Folder className="h-8 w-8 shrink-0 text-accent" aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-sm text-fg">{slug(group.category)}/</span>
                      <span className="mt-0.5 flex items-center gap-1">
                        {group.skills.slice(0, 4).map((s) => s.icons?.[0] && <BrandIconSvg key={s.name} icon={s.icons[0]} className="h-3.5 w-3.5" />)}
                        <span className="ml-1 font-mono text-xs text-fg-subtle">{group.skills.length} {group.skills.length === 1 ? 'item' : 'items'}</span>
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    />
  );
}
