import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import Archive from "./components/Archive";
import Contact from "./components/Contact";
function App() {
  const [alert, setAlert] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar setSearchTerm={setSearchTerm} />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={<Home showAlert={showAlert} searchTerm={searchTerm} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              <Route
                path="/archive"
                element={
                  <Archive showAlert={showAlert} searchTerm={searchTerm} />
                }
              />
              {/* <Route path="/archive" element={<h1>Archive Page</h1>} /> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
