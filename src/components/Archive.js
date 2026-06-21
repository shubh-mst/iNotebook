// import React, { useContext } from "react";
// import noteContext from "../context/notes/noteContext";

// const Archive = (props) => {
//   const context = useContext(noteContext);

//   const { notes, deleteNote, pinNote, archiveNote } = context;

//   // const archivedNotes = notes.filter((note) => note.archived);
//   const archivedNotes = notes
//     .filter((note) => note.archived)
//     .sort((a, b) => b.pinned - a.pinned);
//   return (
//     <div className="container my-3">
//       <h2>Archived Notes</h2>

//       {archivedNotes.length === 0 ? (
//         <h5>No Archived Notes</h5>
//       ) : (
//         <div className="row">
//           {archivedNotes.map((note) => (
//             <div className="col-md-3" key={note._id}>
//               <div className="card my-3">
//                 <div className="card-body">
//                   <div className="d-flex align-items-center">
//                     <h5 className="card-title">{note.title}</h5>

//                     {/* Delete */}
//                     <i
//                       className="fa-regular fa-trash-can mx-2"
//                       onClick={() => {
//                         deleteNote(note._id);
//                         props.showAlert("Deleted successfully", "success");
//                       }}
//                     ></i>

//                     {/* Edit */}
//                     {/* <i
//                       className="fa-regular fa-pen-to-square mx-2"
//                       onClick={() => props.updateNote(note)}
//                     ></i> */}

//                     {/* Pin */}
//                     <i
//                       className={`fa-solid fa-thumbtack mx-2 ${
//                         note.pinned ? "text-warning" : ""
//                       }`}
//                       onClick={() => pinNote(note._id)}
//                     ></i>

//                     {/* Unarchive */}
//                     <i
//                       className="fa-solid fa-box-open mx-2 text-success"
//                       onClick={() => archiveNote(note._id)}
//                     ></i>
//                   </div>

//                   <p className="card-text">{note.description}</p>

//                   <span className="badge bg-secondary">{note.tag}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Archive;

import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Archive = (props) => {
  const context = useContext(noteContext);

  const { notes, deleteNote, pinNote, archiveNote, editNote } = context;

  const archivedNotes = notes
    .filter((note) => note.archived)
    .sort((a, b) => b.pinned - a.pinned);

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
    props.showAlert("Note Updated Successfully", "success");
  };

  return (
    <div className="container my-3">
      <h2>Archived Notes</h2>

      {archivedNotes.length === 0 ? (
        <h5>No Archived Notes</h5>
      ) : (
        <div className="row">
          {archivedNotes.map((note) => (
            <div className="col-md-3" key={note._id}>
              <div className="card my-3">
                <div className="card-body">
                  {editingId === note._id ? (
                    <>
                      <input
                        className="form-control my-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />

                      <input
                        className="form-control my-1"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      <input
                        className="form-control my-1"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                      />

                      <button
                        className="btn btn-success btn-sm mt-2"
                        onClick={saveEdit}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>

                        {/* Delete */}
                        <i
                          className="fa-regular fa-trash-can mx-2"
                          onClick={() => {
                            deleteNote(note._id);
                            props.showAlert("Deleted successfully", "success");
                          }}
                        ></i>

                        {/* Edit */}
                        <i
                          className="fa-regular fa-pen-to-square mx-2"
                          onClick={() => startEditing(note)}
                        ></i>

                        {/* Pin */}
                        <i
                          className={`fa-solid fa-thumbtack mx-2 ${
                            note.pinned ? "text-warning" : ""
                          }`}
                          onClick={() => pinNote(note._id)}
                        ></i>

                        {/* Unarchive */}
                        <i
                          className="fa-solid fa-box-open mx-2 text-success"
                          onClick={() => archiveNote(note._id)}
                        ></i>
                      </div>

                      <p className="card-text">{note.description}</p>

                      <span className="badge bg-secondary">{note.tag}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;
