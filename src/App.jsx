import DisplayWeather from "./components/DisplayWeather.jsx";
import DisplayDate from "./components/DisplayDate.jsx";
import MoodForm from "./components/MoodForm.jsx";
import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import AllNotesDialog from "./components/AllNotes.jsx";

function App() {
  const [notes, setNotes] = useState(() => {
    const moods = localStorage.getItem("moods");
    return moods ? JSON.parse(moods) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  function toggleDarkMode() {
    setDarkMode((prev) => !prev);
  }

  const showAllNotes = () => {
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  const emojies = {
    Happy: "😄",
    Neutral: "😐",
    Sad: "😢",
    Angry: "😠",
    Excited: "🤩",
  };

  function handleSubmit(info) {
    const storedMoods = JSON.parse(localStorage.getItem("moods")) || [];
    const index = storedMoods.findIndex((mood) => mood.date === info.date);

    let updatedMoods;
    if (index !== -1) {
      updatedMoods = [...storedMoods];
      updatedMoods[index] = info;
    } else {
      updatedMoods = [...storedMoods, info];
    }
    localStorage.setItem("moods", JSON.stringify(updatedMoods));
    setNotes(updatedMoods);
  }

  return (
    <div>
      <div className="header">
        <h1 id="app-title">Mood Journal</h1>
        <DisplayDate />
      </div>
      <div className="main">
        <div className="calender">
          <Calendar
            tileContent={({ date, view }) => {
              if (view === "month") {
                const formattedDate = date.toISOString().split("T")[0];
                const moodObj = notes.find(
                  (note) => note.date === formattedDate,
                );
                return moodObj ? <span>{emojies[moodObj.mood]}</span> : null;
              }
            }}
          />
          <div>
            <button className="all-notes" onClick={showAllNotes}>
              All Notes
            </button>
            {showDialog && (
              <AllNotesDialog notes={notes} onClose={closeDialog} />
            )}
          </div>
        </div>
        <div className="weather">
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? "☀️" : "🌙 "}
          </button>
          <DisplayWeather />
          <MoodForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default App;
