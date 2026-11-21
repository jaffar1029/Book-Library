import "./BookList.css";
import BookCard from "../BookCard/BookCard";

function BookList({ books, isLibraryEmpty, onEdit, onDelete }) {
  if (isLibraryEmpty) {
    return (
      <p className="empty-message">
        Your library is empty. Click "+ Add Book" to add your first book.
      </p>
    );
  }

  if (books.length === 0) {
    return (
      <p className="empty-message">
        No books match your search or filters. Try changing them.
      </p>
    );
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default BookList;