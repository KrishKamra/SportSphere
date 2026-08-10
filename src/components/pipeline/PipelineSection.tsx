import { pipelineSteps } from '@/data/pipeline';
import { Reveal } from '@/components/ui/Reveal';
import { usePanelTilt } from '@/hooks/usePanelTilt';

export function PipelineSection() {
  const tilt = usePanelTilt();

  return (
    <section id="pipeline" className="section-pad">
      <div className="max-w-7xl mx-auto">
        <Reveal className="pipeline-shell glass-panel panel-3d" {...tilt}>
          <div className="pipeline-grid">
            <div className="pipeline-copy">
              <p className="section-eyebrow">Future Prospect</p>
              <h2 className="section-title font-display">
                Scraper <span className="text-gradient">Pipeline</span>
              </h2>
              <p className="section-desc left">
                The next phase wires this UI to a Python intelligence layer — automated
                extraction, headline aggregation, JSON hydration, and linear-regression
                win probabilities.
              </p>
              <ul className="pipeline-steps">
                {pipelineSteps.map((step) => (
                  <li key={step.num}>
                    <span className="step-num">{step.num}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pipeline-visual" aria-hidden="true">
              <div className="node-graph">
                <div className="node n1">
                  <span>Sources</span>
                </div>
                <div className="node n2">
                  <span>Scraper</span>
                </div>
                <div className="node n3">
                  <span>JSON</span>
                </div>
                <div className="node n4">
                  <span>Model</span>
                </div>
                <div className="node n5">
                  <span>UI</span>
                </div>
                <svg
                  className="node-lines"
                  viewBox="0 0 300 280"
                  preserveAspectRatio="none"
                >
                  <path d="M60 40 L150 100 L240 40" />
                  <path d="M150 100 L150 160" />
                  <path d="M150 160 L80 230" />
                  <path d="M150 160 L220 230" />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
