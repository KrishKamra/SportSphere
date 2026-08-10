import type { InsightOfDay, KpiItem } from '@/types';

export const insightOfDay: InsightOfDay = {
  title: 'Championship Weekend Pulse',
  homeTeamId: 'city-tigers',
  awayTeamId: 'river-hawks',
  homeScore: 3,
  awayScore: 2,
  homeFormLabel: 'W · W · D · W · W',
  awayFormLabel: 'W · L · W · W · D',
  stats: [
    {
      label: 'Possession',
      left: '58%',
      right: '42%',
      leftWidth: 58,
      rightWidth: 42,
    },
    {
      label: 'xG',
      left: '2.4',
      right: '1.6',
      leftWidth: 62,
      rightWidth: 38,
    },
    {
      label: 'Shots on target',
      left: '7',
      right: '5',
      leftWidth: 55,
      rightWidth: 45,
    },
  ],
  note: 'Tigers controlled midfield tempo after minute 62. Predictive model flags a 71% chance they hold the lead through full-time.',
  winProb: '71%',
  momentum: '+12',
  intensity: 'High',
};

export const heroKpis: KpiItem[] = [
  { value: 128, label: 'Matches tracked' },
  { value: 24, label: 'Active teams' },
  { value: 97, label: 'Model accuracy', suffix: '%' },
];
