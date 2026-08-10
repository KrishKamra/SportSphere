import type { PowerRankSeries, ScoutNote, SignalItem } from '@/types';

export const powerRankSeries: PowerRankSeries = {
  labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'],
  series: [
    {
      id: 'city-tigers',
      label: 'City Tigers',
      color: '#00d4ff',
      data: [78, 82, 85, 88, 91, 94],
      fill: true,
    },
    {
      id: 'river-hawks',
      label: 'River Hawks',
      color: '#ffc93c',
      data: [80, 84, 81, 86, 87, 88],
    },
    {
      id: 'mountain-bears',
      label: 'Mountain Bears',
      color: '#ff2d95',
      data: [70, 72, 76, 78, 80, 82],
    },
    {
      id: 'coastal-sharks',
      label: 'Coastal Sharks',
      color: '#39ff14',
      data: [74, 71, 73, 75, 74, 76],
    },
  ],
};

export const momentumIndex = 84;

export const signals: SignalItem[] = [
  { label: 'Home advantage', value: 78 },
  { label: 'Upset risk', value: 34, tone: 'warn' },
  { label: 'Injury impact', value: 22, tone: 'danger' },
  { label: 'Form volatility', value: 61 },
];

export const scoutNote: ScoutNote = {
  chip: 'Scout Note',
  title: 'Mountain Bears midfield overload is redrawing the map',
  body: 'Three consecutive matches with 65%+ possession. Their progressive carries sit 1.8σ above league mean — a prime feed for the upcoming regression model.',
  stats: [
    { value: '12.4', label: 'km avg distance' },
    { value: '89%', label: 'pass completion' },
    { value: '+1.8σ', label: 'carries vs mean' },
  ],
};
