import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { KpiStrip } from './KpiStrip';
import { InsightPanel } from './InsightPanel';
import { scrollToHash } from '@/hooks/useLenis';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function HeroSection() {
  const [insightOpen, setInsightOpen] = useState(true);
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || reduced) return;

    // gsap.context + revert restores inline styles (opacity/transform) on cleanup,
    // which is required under React StrictMode double-mount.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-copy .eyebrow', { y: 20, opacity: 0, duration: 0.6 })
        .from('.hero-title', { y: 40, opacity: 0, duration: 0.8 }, '-=0.3')
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.6 }, '-=0.4')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.kpi-strip', { y: 16, opacity: 0, duration: 0.5 }, '-=0.2')
        .from('.hero-panel', { y: 50, opacity: 0, duration: 0.9 }, '-=0.6');
    }, root);

    return () => {
      ctx.revert();
    };
  }, [reduced]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && insightOpen) setInsightOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [insightOpen]);

  return (
    <section id="home" className="hero section-pad" ref={sectionRef}>
      <div className="hero-grid max-w-7xl mx-auto">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-chip">v3.0 Command Center</span>
            <span className="eyebrow-line" />
            <span className="eyebrow-meta">Real-time sports intelligence</span>
          </div>

          <h1 className="hero-title font-display">
            Decode the game
            <br />
            <span className="text-gradient">before it happens</span>
          </h1>

          <p className="hero-sub">
            SportSphere fuses live performance signals, power rankings, and predictive
            fixtures into a single 3D command surface — built for scouts, analysts, and
            die-hard fans.
          </p>

          <div className="hero-cta">
            <button
              id="highlightBtn"
              type="button"
              className="btn-neon"
              onClick={() => setInsightOpen((o) => !o)}
            >
              <span className="btn-neon-glow" />
              <span className="btn-neon-label">
                {insightOpen ? (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                    Hide Insight
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Today&apos;s Insight
                  </>
                )}
              </span>
            </button>
            <a
              href="#teams"
              className="btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToHash('#teams');
              }}
            >
              Explore Teams
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>

          <KpiStrip />
        </div>

        <InsightPanel open={insightOpen} />
      </div>

      <div className="scroll-hint" aria-hidden="true">
        <span>Scroll to explore</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
