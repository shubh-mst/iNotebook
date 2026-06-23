import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import "./Noteitem.css";
const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, pinNote, archiveNote } = context;
  const { note, updateNote } = props;
  const getDescriptionPreview = (text) => {
    const words = text.trim().split(" ");
    const firstWord = words[0];

    if (firstWord.length > 20) {
      return firstWord.slice(0, 20) + "...";
    }

    return words.slice(0, 3).join(" ") + (words.length > 3 ? "..." : "");
  };
  const truncateTitle = (text, limit) => {
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  return (
    <div className="note-card">
      <div className="note-card-body">
        <div className="note-header">
          <h5 className="note-title">{truncateTitle(note.title, 10)}</h5>

          <i
            className="fa-regular fa-trash-can icon"
            title="Delete Note"
            onClick={() => {
              deleteNote(note._id);
              props.showAlert("Deleted successfully", "success");
            }}
          ></i>

          <i
            className="fa-regular fa-pen-to-square icon"
            title="Edit Note"
            onClick={() => {
              updateNote(note);
            }}
          ></i>

          <i
            className={`fa-solid fa-thumbtack icon ${
              note.pinned ? "pinned" : ""
            }`}
            title={note.pinned ? "Unpin Note" : "Pin Note"}
            onClick={() => pinNote(note._id)}
          ></i>

          <i
            className={`fa-solid fa-box-archive icon ${
              note.archived ? "archived" : ""
            }`}
            title={note.archived ? "Unarchive Note" : "Archive Note"}
            onClick={() => archiveNote(note._id)}
          ></i>
        </div>

        <p className="note-description">
          {getDescriptionPreview(note.description)}
        </p>
        <div className="note-footer">
          <small>
            Updated on{" "}
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
