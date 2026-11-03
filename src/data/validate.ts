import type { Claim, Source, Story } from './types';

// Runs at build time. A claim that isn't cleared for the public breaks the build
// instead of slipping into the HTML.
export function validate(stories: Story[], sources: Source[]): void {
  const ids = new Set(sources.map((s) => s.id));
  const errors: string[] = [];
  const check = (c: Claim) => {
    if (!c.publicReady) errors.push(`${c.id}: not publicReady`);
    if (c.state === 'hold') errors.push(`${c.id}: state is hold`);
    if (c.sourceIds.length === 0) errors.push(`${c.id}: no source`);
    for (const s of c.sourceIds) if (!ids.has(s)) errors.push(`${c.id}: unknown source ${s}`);
    if (c.metric && !(c.metric.unit && c.metric.period && c.metric.scope))
      errors.push(`${c.id}: metric needs unit, period and scope`);
  };
  for (const st of stories) [...st.myPart, ...st.decisions, ...st.outcomes].forEach(check);
  if (errors.length) throw new Error(`Claim validation failed:\n${errors.join('\n')}`);
}
