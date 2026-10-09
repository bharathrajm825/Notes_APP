import React, { useState } from "react";
import Header from "./header";
import Input from "./InputForm";
import Notes from "./notes";
import Footer from "./footer";
import "../index.css";

function App() {
  const [reloadKey, setReloadKey] = useState(0);
  const [editingState, setEditingState] = useState(false);

  const onNewNote = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };
  const mkt = () => {
    setEditingState(true);
  }
  const mkf = () => {
    setEditingState(false);
  }

  return (
    <div className="app">
      <Header />
      {editingState ? null : <Input onNewNote={onNewNote} />}
      <Notes reloadKey={reloadKey} onNewNote={onNewNote} mkt={mkt} mkf={mkf} />
      <Footer />
    </div>
  );
}

export default App;