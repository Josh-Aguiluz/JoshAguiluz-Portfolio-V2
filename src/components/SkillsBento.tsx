import React from 'react';
import { Code2, Server, Smartphone, Users, Wrench, Database } from 'lucide-react';
import { SKILL_GROUPS, type SkillGroup } from '../data/skills';
import BrandIconSvg from './BrandIcons';
import SpotlightCard from './SpotlightCard';
import Reveal from './Reveal';

const CATEGORY_ICON: Record<SkillGroup['category'], React.ComponentType<{ className?: string }>> = {
  Backend: Server,
  Frontend: Code2,
  Database: Database,
  Mobile: Smartphone,
  'Dev Tools': Wrench,
  'Soft Skills': Users,
};

const SPAN: Record<SkillGroup['span'], string> = {
  lg: 'sm:col-span-2 lg:row-span-2',
  wide: 'sm:col-span-2',
  sm: '',
};

export default function SkillsBento() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(10.5rem,auto)]">
      {SKILL_GROUPS.map((group, i) => {
        const Icon = CATEGORY_ICON[group.category];
        const large = group.span === 'lg';
        const single = group.skills.length === 1;
        return (
          <Reveal as="li" key={group.category} delay={Math.min(i * 0.05, 0.3)} className={SPAN[group.span]}>
            <SpotlightCard className="flex h-full flex-col p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xs font-normal tracking-wide text-fg-subtle">{group.category}</h3>
                <Icon className="h-4 w-4 text-fg-subtle" aria-hidden="true" />
              </div>

              {large && (
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
                  Building efficient, scalable backend systems that solve real-world problems.
                </p>
              )}

              {single ? (
                <div className="mt-auto flex items-center gap-3 pt-6">
                  {group.skills[0].icons?.map((icon) => <BrandIconSvg key={icon} icon={icon} className="h-8 w-8" />)}
                  <span className="text-xl font-semibold tracking-tight">{group.skills[0].name}</span>
                </div>
              ) : (
                <ul
                  className={`mt-auto flex flex-wrap gap-2 pt-6 ${large ? 'lg:grid lg:grid-cols-2 lg:gap-3' : ''}`}
                  aria-label={`${group.category} skills`}
                >
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className={
                        large
                          ? 'flex items-center gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-[0.9375rem] font-medium lg:px-4 lg:py-4 lg:text-lg'
                          : 'inline-flex items-center gap-2 rounded-md border border-border bg-surface-2 px-2.5 py-1.5 text-sm text-fg'
                      }
                    >
                      {skill.icons && (
                        <span className="flex shrink-0 items-center gap-1">
                          {skill.icons.map((icon) => (
                            <BrandIconSvg key={icon} icon={icon} className={large ? 'h-5 w-5 lg:h-6 lg:w-6' : 'h-4 w-4'} />
                          ))}
                        </span>
                      )}
                      {skill.name}
                    </li>
                  ))}
                </ul>
              )}
            </SpotlightCard>
          </Reveal>
        );
      })}
    </ul>
  );
}
