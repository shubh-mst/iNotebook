import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import "./EditNote.css";
import "./Notes.css";

// const Notes = (props) => {
const Notes = ({ showAlert, searchTerm }) => {
  const [showModal, setShowModal] = useState(false);

  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [navigate]);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    setShowModal(true);

    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleClick = () => {
    editNote(note.id, note.etitle, note.edescription, note.etag);

    setShowModal(false);

    // props.showAlert("Updated successfully", "success");
    showAlert("Updated successfully", "success");
  };

  const onChange = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const visibleNotes = notes.filter((note) => !note.archived);

  const sortedNotes = [...visibleNotes].sort((a, b) => b.pinned - a.pinned);

  const filteredNotes = sortedNotes.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const pinnedNotes = notes.filter((note) => note.pinned);

  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <>
      {/* EDIT MODAL */}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Edit Note</h2>

              <button className="close-btn" onClick={() => setShowModal(false)}>
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>

                <input
                  type="text"
                  name="etitle"
                  value={note.etitle}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label>Description</label>

                <input
                  type="text"
                  name="edescription"
                  value={note.edescription}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label>Tag</label>

                <input
                  type="text"
                  name="etag"
                  value={note.etag}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>

              <button
                className="update-btn"
                disabled={
                  note.etitle.length < 3 || note.edescription.length < 3
                }
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE */}

      <div className="notes-page">
        {/* HERO SECTION */}

        <div className="hero-section">
          <div>
            <h1>✨ Welcome Back</h1>

            <p>
              Capture ideas, organize thoughts and stay productive every day.
            </p>
          </div>
        </div>

        {/* STATS */}

        <div className="stats-container">
          <div className="stat-card">
            <h2>{notes.length}</h2>
            <p>Total Notes</p>
          </div>

          <div className="stat-card">
            <h2>{pinnedNotes.length}</h2>
            <p>Pinned Notes</p>
          </div>

          <div className="stat-card">
            <h2>{archivedNotes.length}</h2>
            <p>Archived Notes</p>
          </div>

          <div className="stat-card">
            <h2>{visibleNotes.length}</h2>
            <p>Active Notes</p>
          </div>
        </div>

        {/* ADD NOTE */}

        <div className="addnote-wrapper">
          {/* <AddNote showAlert={props.showAlert} /> */}
          <AddNote showAlert={showAlert} />
        </div>

        {/* NOTES HEADER */}

        <div className="notes-header">
          <h2>Your Notes</h2>

          {/* <span>{visibleNotes.length} Notes</span> */}
          <span>{filteredNotes.length} Notes</span>
        </div>

        {/* EMPTY STATE */}

        {/* {visibleNotes.length === 0 ? ( */}
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <h3>No Notes Yet</h3>

            <p>Create your first note and start organizing your ideas.</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <Noteitem
                key={note._id}
                note={note}
                updateNote={updateNote}
                // showAlert={props.showAlert}
                showAlert={showAlert}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Notes;
