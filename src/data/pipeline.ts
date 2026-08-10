import type { PipelineStep } from '@/types';

export const pipelineSteps: PipelineStep[] = [
  {
    num: '01',
    title: 'Automated Extraction',
    description: 'BeautifulSoup + Selenium across FBref & NBA.com',
  },
  {
    num: '02',
    title: 'Headline Aggregation',
    description: 'Sky Sports RSS and team-specific news crawlers',
  },
  {
    num: '03',
    title: 'Data Hydration',
    description: 'Static mock → live JSON injection for every module',
  },
  {
    num: '04',
    title: 'Predictive Analytics',
    description: 'Linear regression win probabilities from historical form',
  },
];

export const pipelineNodes = ['Sources', 'Scraper', 'JSON', 'Model', 'UI'] as const;
