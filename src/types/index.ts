export type FormResult = 'W' | 'D' | 'L';
export type FixtureStatus = 'live' | 'upcoming' | 'completed';
export type FixtureFilter = 'all' | FixtureStatus;
export type SignalTone = 'default' | 'warn' | 'danger';

export interface Team {
  id: string;
  name: string;
  crest: string;
  crestClass: string;
  bgClass: string;
  rank: number;
  arena: string;
  capacityLabel: string;
  form: FormResult[];
  points: number;
  goalDiff: number;
  powerIndex: number;
  blurb: string;
}

export interface Fixture {
  id: string;
  status: FixtureStatus;
  dayLabel: string;
  hourLabel: string;
  zoneLabel: string;
  homeTeamId: string;
  awayTeamId: string;
  venue: string;
  scoreLabel?: string;
}

export interface DualBarStat {
  label: string;
  left: string;
  right: string;
  leftWidth: number;
  rightWidth: number;
}

export interface InsightOfDay {
  title: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  homeFormLabel: string;
  awayFormLabel: string;
  stats: DualBarStat[];
  note: string;
  winProb: string;
  momentum: string;
  intensity: string;
}

export interface KpiItem {
  value: number;
  label: string;
  suffix?: string;
}

export interface PowerRankSeries {
  labels: string[];
  series: {
    id: string;
    label: string;
    color: string;
    data: number[];
    fill?: boolean;
  }[];
}

export interface SignalItem {
  label: string;
  value: number;
  tone?: SignalTone;
}

export interface ScoutNote {
  chip: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
}

export interface TickerItem {
  id: string;
  text: string;
  emphasis?: string;
}

export interface PipelineStep {
  num: string;
  title: string;
  description: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
