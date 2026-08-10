import { tickerItems } from '@/data/ticker';

function TickerSegment() {
  return (
    <>
      {tickerItems.map((item) => (
        <span className="ticker-item" key={item.id}>
          {item.emphasis && <em>{item.emphasis}</em>} {item.text}
        </span>
      ))}
    </>
  );
}

export function LiveTicker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      <div className="ticker-track" id="tickerTrack">
        <TickerSegment />
        <TickerSegment />
      </div>
    </div>
  );
}
