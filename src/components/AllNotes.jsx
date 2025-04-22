function AllNotesDialog({ notes, onClose }) {
  return (
    <div className="dialog-backdrop">
      <div className="dialog-box">
        <h2>All Mood Notes</h2>
        <ul>
          {notes.length === 0 ? (
            <li>No notes found.</li>
          ) : (
            notes.map((note, index) => (
              <li key={index}>
                <strong>{note.date}</strong>: {note.mood} {note.emoji} <br />
                <p>{note.note}</p>
              </li>
            ))
          )}
        </ul>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default AllNotesDialog;
