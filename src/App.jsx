import DisplayWeather from "./components/DisplayWeather.jsx";
import DisplayDate from "./components/DisplayDate.jsx";
import MoodForm from "./components/MoodForm.jsx";

function App() {
  return (
    <div className="main">
      <div className="header">
        <h1 id="app-title">Mood Journal</h1>
        <DisplayDate />
      </div>
      <div className="weather">
        <DisplayWeather />
        <MoodForm />
      </div>
    </div>
  );
}

export default App;
