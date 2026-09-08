import { Sparkles } from 'lucide-react';

export default function VerseOfTheDay({ verse }) {
  return (
    <section className="verse-card">
      <div className="eyebrow"><Sparkles size={16} /> Verse of the Day</div>
      <blockquote>“{verse.text}”</blockquote>
      <p>{verse.reference}</p>
    </section>
  );
}
