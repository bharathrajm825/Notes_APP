import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import WestIcon from "@mui/icons-material/West";
import axios from "axios";

function Notes({ reloadKey, onNewNote, mkt, mkf }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const normalizeText = (value) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) return "";

    return trimmedValue.charAt(0).toUpperCase() + trimmedValue.slice(1);
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error("Failed to load notes");
      }

      const jsonData = await response.json();
      setItems(jsonData);
      setError("");
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Could not load notes.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [reloadKey]);

  const handleEdit = (id) => {
    const selectedNote = items.find((item) => item.noteid === id);

    if (!selectedNote) {
      setError("Could not find the note you want to edit.");
      return;
    }

    setContent(selectedNote.content ?? "");
    setTitle(selectedNote.title ?? "");
    setEditing(true);
    setEditingId(id);
    setError("");
    mkt();
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const noteText = normalizeText(content);
    if (!noteText) {
      setError("Please enter a note before saving.");
      return;
    }

    const noteTitle = normalizeText(title);
    if (!noteTitle) {
      setError("Please enter a title before saving.");
      return;
    }

    try {
      setError("");
      await axios.patch(`http://localhost:3000/${editingId}`, {
        content: noteText,
        title: noteTitle,
      });

      setContent("");
      setTitle("");
      setEditing(false);
      setEditingId(null);
      mkf();
      onNewNote?.();
    } catch (err) {
      console.error("Error saving note:", err);
      setError("Could not save the note. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      setItems((prevItems) => prevItems.filter((item) => item.noteid !== id));
      if (editingId === id) {
        setEditing(false);
        setEditingId(null);
        setContent("");
        setTitle("");
      }
      setError("");
    } catch (err) {
      console.error("Error deleting note:", err);
      setError("Could not delete the note.");
    }
  };

  const resetEditState = () => {
    setEditing(false);
    setEditingId(null);
    setContent("");
    setTitle("");
    setError("");
    mkf();
  };

  return editing ? (
    <div>
      <form onSubmit={handleSave}>
        <input
          name="title"
          placeholder="Edit title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          name="content"
          placeholder="Edit note"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div style={{ textAlign: "center" }}>
          <button type="submit" className="save-note-btn">
            Save
          </button>
        </div>
        {error && <p style={{ color: "red", marginTop: "8px" }}>{error}</p>}
      </form>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "8px",
        }}
      >
        <button
          type="button"
          onClick={resetEditState}
          style={{
            marginTop: "8px",
            marginLeft: "8px",
            color: "red",
            cursor: "pointer",
            border: "none",
            background: "#AEEED3",
            borderRadius: "10px",
            padding: "8px",
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            gap: "6px",
          }}
        >
          <WestIcon />
          <span>Cancel</span>
        </button>
      </div>
    </div>
  ) : (
    <div className="notes" style={{ height: "auto" }}>
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          color: "#FFF8B0",
          marginTop: "60px",
        }}
      >
        Notes
      </h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {items.length === 0 ? (
        <p
          style={{
            fontSize: "2em",
            color: "#FFF8B0",
            display: "flex",
            justifyContent: "center",
            marginTop: "55px",
          }}
        >
          No notes yet.
        </p>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ul style={{ display: "flex", flexWrap: "wrap", flex: "1 0" }}>
            {items.map((item) => (
              <li style={{ listStyleType: "none", width: "20%" }} key={item.noteid}>
                <div
                  style={{
                    display: "block",
                    fontSize: "1.5em",
                    color: "#010127",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    display: "block",
                    color: "#010127",
                    marginTop: "13px",
                    overflowWrap: "break-word",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                  }}
                >
                  {item.content}
                </div>
                <div style={{ display: "flex", justifyContent: "right" }}>
                  <button
                    type="button"
                    onClick={() => handleEdit(item.noteid)}
                    style={{
                      alignItems: "center",
                      color: "blue",
                      gap: "8px",
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                    }}
                    aria-label="Edit note"
                  >
                    <EditIcon style={{ color: "orange" }} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.noteid)}
                    style={{
                      alignItems: "center",
                      color: "red",
                      gap: "8px",
                      cursor: "pointer",
                      border: "none",
                      background: "transparent",
                    }}
                    aria-label="Delete note"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Notes;