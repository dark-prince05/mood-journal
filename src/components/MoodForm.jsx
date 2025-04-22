import React, { useState } from "react";

const moodOptions = [
  { icon: "😄", label: "Happy" },
  { icon: "😐", label: "Neutral" },
  { icon: "😢", label: "Sad" },
  { icon: "😠", label: "Angry" },
  { icon: "🤩", label: "Excited" },
];

export default function MoodForm({ onSubmit }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood) {
      alert("Please select a mood!");
      return;
    }

    const info = {
      mood: selectedMood,
      note: note.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    alert("Saved");
    onSubmit(info);
    setSelectedMood(null);
    setNote("");
  };

  return (
    <form className="mood-form" onSubmit={handleSubmit}>
      <h2>How are you feeling today?</h2>
      <div className="mood-options">
        {moodOptions.map((mood) => (
          <button
            key={mood.label}
            type="button"
            className={`mood-btn ${selectedMood === mood.label ? "selected" : ""}`}
            onClick={() => setSelectedMood(mood.label)}
          >
            <span>{mood.icon}</span>
          </button>
        ))}
      </div>

      <textarea
        placeholder="Write something about your day..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <button type="submit" className="save-btn">
        Save Entry
      </button>
    </form>
  );
}
