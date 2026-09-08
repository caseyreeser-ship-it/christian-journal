import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CalendarDays, Home, Check } from 'lucide-react';
import DailyJournal from './components/DailyJournal.jsx';
import JournalHistory from './components/JournalHistory.jsx';
import VerseOfTheDay from './components/VerseOfTheDay.jsx';
import { verses } from './data/verses.js';
import { formatLongDate, getDateKey, loadEntries, saveEntries } from './utils/storage.js';

const blankEntry = {
  godShowedUp: '',
  encouraged: '',
  prayer: '',
  gratitude: ['', '', ''],
  kindThingToday: '',
  didKindThing: ''
};

function getVerseForDate(dateKey) {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i += 1) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  return verses[hash % verses.length];
}

export default function App() {
  const todayKey = getDateKey();
  const [view, setView] = useState('today');
  const [entries, setEntries] = useState(() => loadEntries());
  const [selectedDateKey, setSelectedDateKey] = useState(todayKey);
  const [savedPulse, setSavedPulse] = useState(false);

  const selectedDate = useMemo(() => new Date(`${selectedDateKey}T12:00:00`), [selectedDateKey]);
  const verse = useMemo(() => getVerseForDate(selectedDateKey), [selectedDateKey]);
  const entry = entries[selectedDateKey] || blankEntry;

  useEffect(() => {
    saveEntries(entries);
    setSavedPulse(true);
    const timer = setTimeout(() => setSavedPulse(false), 900);
    return () => clearTimeout(timer);
  }, [entries]);

  const updateEntry = (nextEntry) => {
    setEntries((current) => ({
      ...current,
      [selectedDateKey]: { ...nextEntry, updatedAt: new Date().toISOString() }
    }));
  };

  const openToday = () => {
    setSelectedDateKey(todayKey);
    setView('today');
  };

  const openHistoryEntry = (dateKey) => {
    setSelectedDateKey(dateKey);
    setView('entry');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand"><BookOpen size={21} /> Daily Grace</div>
          <p>A year of prayer, gratitude & reflection</p>
        </div>
        <div className={`save-status ${savedPulse ? 'show' : ''}`}><Check size={15} /> Saved</div>
      </header>

      <main>
        {(view === 'today' || view === 'entry') && (
          <>
            <div className="date-heading">
              <span>{selectedDateKey === todayKey ? 'Today' : 'Journal Entry'}</span>
              <h1>{formatLongDate(selectedDate)}</h1>
            </div>
            <VerseOfTheDay verse={verse} />
            <DailyJournal entry={entry} onChange={updateEntry} />
          </>
        )}

        {view === 'journal' && (
          <>
            <div className="date-heading">
              <span>Your year</span>
              <h1>Journal</h1>
            </div>
            <JournalHistory entries={entries} onOpen={openHistoryEntry} />
          </>
        )}
      </main>

      <nav className="bottom-nav">
        <button className={view === 'today' ? 'active' : ''} onClick={openToday}>
          <Home size={20} />
          <span>Today</span>
        </button>
        <button className={view === 'journal' || view === 'entry' ? 'active' : ''} onClick={() => setView('journal')}>
          <CalendarDays size={20} />
          <span>Journal</span>
        </button>
      </nav>
    </div>
  );
}
