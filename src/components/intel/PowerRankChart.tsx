import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { powerRankSeries } from '@/data/intel';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';
import { usePanelTilt } from '@/hooks/usePanelTilt';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

ChartJS.defaults.font.family = "'Outfit', system-ui, sans-serif";

const gridColor = 'rgba(255, 255, 255, 0.05)';
const tickColor = 'rgba(139, 149, 168, 0.8)';

export function PowerRankChart() {
  const tilt = usePanelTilt();
  const data = {
    labels: powerRankSeries.labels,
    datasets: powerRankSeries.series.map((s) => ({
      label: s.label,
      data: s.data,
      borderColor: s.color,
      backgroundColor: s.fill ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
      tension: 0.4,
      fill: Boolean(s.fill),
      pointRadius: 3,
      pointHoverRadius: 6,
      borderWidth: 2,
    })),
  };

  return (
    <Reveal as="article" className="bento-card bento-lg glass-panel panel-3d" {...tilt}>
      <div className="bento-head">
        <h3>Power Rank Trajectory</h3>
        <Chip>Last 6 weeks</Chip>
      </div>
      <div className="chart-wrap">
        <Line
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
              legend: { display: false },
              tooltip: {
                backgroundColor: 'rgba(10, 14, 26, 0.95)',
                borderColor: 'rgba(0, 212, 255, 0.3)',
                borderWidth: 1,
                titleColor: '#e8edf7',
                bodyColor: '#8b95a8',
                padding: 12,
                cornerRadius: 10,
              },
            },
            scales: {
              x: {
                grid: { color: gridColor },
                ticks: { color: tickColor, font: { size: 11 } },
                border: { display: false },
              },
              y: {
                min: 60,
                max: 100,
                grid: { color: gridColor },
                ticks: { color: tickColor, font: { size: 11 } },
                border: { display: false },
              },
            },
          }}
        />
      </div>
      <div className="chart-legend">
        {powerRankSeries.series.map((s) => (
          <span key={s.id}>
            <i
              className="dot"
              style={{
                background: s.color,
                boxShadow: `0 0 8px ${s.color}`,
              }}
            />{' '}
            {s.label}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
