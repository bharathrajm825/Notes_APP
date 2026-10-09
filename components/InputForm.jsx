import React, { useState } from "react";
import axios from "axios";

function Input({ onNewNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const normalizeText = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "";

    return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteText = normalizeText(content);
    const noteTitle = normalizeText(title);

    if (!noteText) {
      setError("Please enter a note before saving.");
      return;
    }

    if (!noteTitle) {
      setError("Please enter a title before saving.");
      return;
    }

    try {
      setError("");
      await axios.post("http://localhost:3000/", {
        content: noteText,
        title: noteTitle,
      });

      setContent("");
      setTitle("");
      onNewNote?.();
    } catch (err) {
      console.error("Error adding note:", err);
      setError("Could not add the note. Please try again.");
    }
  };

  return (
    <div className="newnote">
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="content"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit" className="add-note-btn">
          +
        </button>
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      </form>
    </div>
  );
}

export default Input;

