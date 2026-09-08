export default function JournalPrompt({ label, value, onChange, rows = 4 }) {
  return (
    <label className="prompt-card">
      <span>{label}</span>
      <textarea
        rows={rows}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write here..."
      />
    </label>
  );
}
