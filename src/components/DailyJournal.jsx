import JournalPrompt from './JournalPrompt.jsx';

export default function DailyJournal({ entry, onChange }) {
  const setField = (field, value) => onChange({ ...entry, [field]: value });
  const gratitude = entry.gratitude || ['', '', ''];

  const setGratitude = (index, value) => {
    const next = [...gratitude];
    next[index] = value;
    setField('gratitude', next);
  };

  return (
    <section className="journal-stack">
      <JournalPrompt
        label="How did God show up yesterday?"
        value={entry.godShowedUp}
        onChange={(v) => setField('godShowedUp', v)}
      />

      <JournalPrompt
        label="How did I feel encouraged?"
        value={entry.encouraged}
        onChange={(v) => setField('encouraged', v)}
      />

      <JournalPrompt
        label="What can I work on / need prayer for?"
        value={entry.prayer}
        onChange={(v) => setField('prayer', v)}
      />

      <div className="prompt-card gratitude-card">
        <span>What are 3 things I’m grateful for?</span>
        {gratitude.map((item, index) => (
          <input
            key={index}
            value={item}
            onChange={(e) => setGratitude(index, e.target.value)}
            placeholder={`${index + 1}.`}
          />
        ))}
      </div>

      <JournalPrompt
        label="What is one thing I absolutely love about Casey?"
        value={entry.loveAboutCasey || ''}
        onChange={(v) => setField('loveAboutCasey', v)}
      />

      <JournalPrompt
        label="What is one kind thing I can do for someone today?"
        value={entry.kindThingToday}
        onChange={(v) => setField('kindThingToday', v)}
      />

      <div className="prompt-card">
        <span>Did I do the kind thing yesterday?</span>
        <div className="segmented">
          {['Yes', 'No', 'Not applicable'].map((option) => (
            <button
              key={option}
              type="button"
              className={entry.didKindThing === option ? 'active' : ''}
              onClick={() => setField('didKindThing', option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
