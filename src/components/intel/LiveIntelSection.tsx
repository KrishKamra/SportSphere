import { SectionHead } from '@/components/layout/SectionHead';
import { PowerRankChart } from './PowerRankChart';
import { MomentumRadial } from './MomentumRadial';
import { SignalBoard } from './SignalBoard';
import { ScoutSpotlight } from './ScoutSpotlight';

export function LiveIntelSection() {
  return (
    <section id="intel" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <SectionHead
          eyebrow="Command Surface"
          title={
            <>
              Live <span className="text-gradient">Intelligence</span>
            </>
          }
          description="Bento-style analytics modules engineered for rapid signal scanning — ready for JSON hydration from the scraper pipeline."
        />

        <div className="bento">
          <PowerRankChart />
          <MomentumRadial />
          <SignalBoard />
          <ScoutSpotlight />
        </div>
      </div>
    </section>
  );
}
