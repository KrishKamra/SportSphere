import type { Team } from '@/types';

export const teams: Team[] = [
  {
    id: 'city-tigers',
    name: 'City Tigers',
    crest: '🐯',
    crestClass: 'crest-tigers',
    bgClass: 'crest-tigers-bg',
    rank: 1,
    arena: 'Apex Stadium',
    capacityLabel: 'Capacity 62k',
    form: ['W', 'W', 'D', 'W', 'W'],
    points: 48,
    goalDiff: 19,
    powerIndex: 94,
    blurb:
      'Dominant defensive structure with elite transition speed. League-leading expected points.',
  },
  {
    id: 'river-hawks',
    name: 'River Hawks',
    crest: '🦅',
    crestClass: 'crest-hawks',
    bgClass: 'crest-hawks-bg',
    rank: 2,
    arena: 'Skyline Arena',
    capacityLabel: 'Capacity 48k',
    form: ['W', 'L', 'W', 'W', 'D'],
    points: 44,
    goalDiff: 11,
    powerIndex: 88,
    blurb:
      'High-tempo counters and precision wide play. Dangerous on the break after turnovers.',
  },
  {
    id: 'mountain-bears',
    name: 'Mountain Bears',
    crest: '🐻',
    crestClass: 'crest-bears',
    bgClass: 'crest-bears-bg',
    rank: 3,
    arena: 'Summit Dome',
    capacityLabel: 'Capacity 55k',
    form: ['D', 'W', 'W', 'L', 'W'],
    points: 41,
    goalDiff: 8,
    powerIndex: 82,
    blurb:
      'Physical midfield engine room. Progressive carries redefining possession football.',
  },
  {
    id: 'coastal-sharks',
    name: 'Coastal Sharks',
    crest: '🦈',
    crestClass: 'crest-sharks',
    bgClass: 'crest-sharks-bg',
    rank: 4,
    arena: 'Harbor Park',
    capacityLabel: 'Capacity 41k',
    form: ['L', 'W', 'D', 'W', 'L'],
    points: 36,
    goalDiff: 3,
    powerIndex: 76,
    blurb:
      'Fluid systems football — tactical flexibility and creative overloads in the final third.',
  },
];

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getTeamByName(name: string): Team | undefined {
  return teams.find((t) => t.name === name);
}

export function formatForm(form: Team['form']): string {
  return form.join(' · ');
}

export function formatFormCompact(form: Team['form']): string {
  // Match original card labels like "WW D WW" / "W L WW D"
  const s = form.join('');
  if (s === 'WWDWW') return 'WW D WW';
  if (s === 'WLWWD') return 'W L WW D';
  if (s === 'DWWLW') return 'D W W L W';
  if (s === 'LWDWL') return 'L W D W L';
  return form.join(' ');
}
