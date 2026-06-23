import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";
import "./Archive.css";

const Archive = ({ showAlert, searchTerm }) => {
  const context = useContext(noteContext);

  const { notes, deleteNote, pinNote, archiveNote, editNote } = context;

  const archivedNotes = notes
    .filter((note) => note.archived)
    .sort((a, b) => b.pinned - a.pinned);

  const filteredArchivedNotes = archivedNotes.filter((note) =>
    note.title.toLowerCase().includes((searchTerm || "").toLowerCase()),
  );

  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const startEditing = (note) => {
    setEditingId(note._id);
    setTitle(note.title);
    setDescription(note.description);
    setTag(note.tag);
  };

  const saveEdit = async () => {
    await editNote(editingId, title, description, tag);
    setEditingId(null);
    // props.showAlert("Note Updated Successfully", "success");
    showAlert("Note Updated Successfully", "success");
  };
  const navigate = useNavigate();

  // const getDescriptionPreview = (text) => {
  //   const firstWord = text.trim().split(" ")[0];

  //   return firstWord.length > 20 ? firstWord.slice(0, 20) + "..." : firstWord;
  // };
  const getDescriptionPreview = (text) => {
    const words = text.trim().split(" ");
    const firstWord = words[0];

    if (firstWord.length > 20) {
      return firstWord.slice(0, 20) + "...";
    }

    return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="archive-page">
      <div className="archive-header">
        <h1>📦 Archived Notes</h1>
        <p>Notes you've archived for later.</p>
      </div>

      {/* {archivedNotes.length === 0 ? ( */}
      {filteredArchivedNotes.length === 0 ? (
        <div className="empty-archive">
          <h2>No Archived Notes</h2>
          <p>Archived notes will appear here.</p>
        </div>
      ) : (
        <div className="archive-grid">
          {/* {archivedNotes.map((note) => ( */}
          {filteredArchivedNotes.map((note) => (
            <div className="archive-card" key={note._id}>
              {editingId === note._id ? (
                <>
                  <input
                    className="edit-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <input
                    className="edit-input"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <input
                    className="edit-input"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />

                  <button className="save-btn" onClick={saveEdit}>
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  <div className="archive-top">
                    <h3 className="archive-title">{note.title}</h3>

                    <div className="archive-icons">
                      <i
                        className="fa-regular fa-trash-can archive-icon"
                        onClick={() => {
                          deleteNote(note._id);
                          // props.showAlert("Deleted successfully", "success");
                          showAlert("Deleted successfully", "success");
                        }}
                      ></i>

                      <i
                        className="fa-regular fa-pen-to-square archive-icon"
                        onClick={() => startEditing(note)}
                      ></i>

                      <i
                        className={`fa-solid fa-thumbtack archive-icon ${
                          note.pinned ? "pinned" : ""
                        }`}
                        onClick={() => pinNote(note._id)}
                      ></i>

                      <i
                        className="fa-solid fa-box-open archive-icon unarchive"
                        onClick={() => archiveNote(note._id)}
                      ></i>
                    </div>
                  </div>

                  {/* <p className="archive-description">{note.description}</p> */}
                  <p className="note-description">
                    {getDescriptionPreview(note.description)}
                  </p>

                  <span className="archive-tag">#{note.tag}</span>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
