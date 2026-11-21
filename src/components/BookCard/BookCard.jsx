import "./BookCard.css";

function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="book-card">
      <div className="book-cover">📖</div>
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="badges">
          <span className={book.status === "Read" ? "badge read" : "badge unread"}>
            {book.status}
          </span>
          <span className="badge genre">{book.genre}</span>
        </div>
      </div>
      <div className="card-buttons">
        <button className="btn btn-primary" onClick={() => onEdit(book)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(book)}>Delete</button>
      </div>
    </div>
  );
}

export default BookCard;
