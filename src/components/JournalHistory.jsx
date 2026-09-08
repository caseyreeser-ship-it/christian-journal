import { ChevronRight } from 'lucide-react';

export default function JournalHistory({ entries, onOpen }) {
  const dates = Object.keys(entries).sort().reverse();

  if (!dates.length) {
    return <div className="empty-state">Your saved journal entries will appear here.</div>;
  }

  return (
    <div className="history-list">
      {dates.map((dateKey) => {
        const date = new Date(`${dateKey}T12:00:00`);
        return (
          <button className="history-row" key={dateKey} onClick={() => onOpen(dateKey)}>
            <div>
              <strong>{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' }).format(date)}</strong>
              <span>{date.getFullYear()}</span>
            </div>
            <ChevronRight size={20} />
          </button>
        );
      })}
    </div>
  );
}
