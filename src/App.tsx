import { useLenis } from '@/hooks/useLenis';
import { SphereCanvas } from '@/components/atmosphere/SphereCanvas';
import { BgGrid } from '@/components/atmosphere/BgGrid';
import { BgVignette } from '@/components/atmosphere/BgVignette';
import { CursorGlow } from '@/components/atmosphere/CursorGlow';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/hero/HeroSection';
import { LiveTicker } from '@/components/ticker/LiveTicker';
import { LiveIntelSection } from '@/components/intel/LiveIntelSection';
import { TeamsSection } from '@/components/teams/TeamsSection';
import { ScheduleSection } from '@/components/fixtures/ScheduleSection';
import { PipelineSection } from '@/components/pipeline/PipelineSection';
import { ContactSection } from '@/components/contact/ContactSection';

export default function App() {
  useLenis();

  return (
    <>
      <SphereCanvas />
      <BgGrid />
      <BgVignette />
      <CursorGlow />

      <Header />

      <main id="main">
        <HeroSection />
        <LiveTicker />
        <LiveIntelSection />
        <TeamsSection />
        <ScheduleSection />
        <PipelineSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
