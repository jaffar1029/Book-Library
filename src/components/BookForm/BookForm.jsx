import { useState } from "react";
import "./BookForm.css";
import { genres } from "../../constants";

function BookForm({ bookToEdit, onSave, onCancel }) {
  const isEditing = bookToEdit !== null;

  const [title, setTitle] = useState(isEditing ? bookToEdit.title : "");
  const [author, setAuthor] = useState(isEditing ? bookToEdit.author : "");
  const [genre, setGenre] = useState(isEditing ? bookToEdit.genre : genres[0]);
  const [status, setStatus] = useState(isEditing ? bookToEdit.status : "Unread");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page

    const cleanTitle = title.trim();
    const cleanAuthor = author.trim();

    if (cleanTitle === "" || cleanAuthor === "") {
      setError("Please enter both a title and an author.");
      return;
    }

    onSave({ title: cleanTitle, author: cleanAuthor, genre, status });
  }

  return (
    <div className="form-overlay">
      <form className="book-form" onSubmit={handleSubmit}>
        <h2 className="form-title">{isEditing ? "Edit Book" : "Add New Book"}</h2>

        <label className="form-label">
          Book title
          <input
            className="form-input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="form-label">
          Author
          <input
            className="form-input"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>

        <label className="form-label">
          Genre
          <select
            className="form-input"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          >
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>

        <label className="form-label">
          Reading status
          <select
            className="form-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Unread">Unread</option>
            <option value="Read">Read</option>
          </select>
        </label>

        {error && <p className="form-error">{error}</p>}

        <div className="form-buttons">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;