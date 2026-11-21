import { useState,useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import BookForm from "./components/BookForm/BookForm";
import DiscoverBooks from "./components/DiscoverBooks/DiscoverBooks";
import Footer from "./components/Footer/Footer";
import "./App.css";

const sampleBooks = [
  { id: 1, title: "Atomic Habits", author: "James Clear", genre: "Self-help", status: "Read" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", status: "Unread" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", genre: "Technology", status: "Unread" },
];

function App() {
  const [activePage, setActivePage] = useState("collection");
  
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
const [selectedStatus, setSelectedStatus] = useState("All");
  const [books, setBooks] = useState(() => {
  try {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : sampleBooks;
  } catch (error) {
    return sampleBooks;
  }
});


  function handleOpenAddForm() {
    setSelectedBook(null);
    setShowForm(true);
  }

  function handleEdit(book) {
    setSelectedBook(book);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setSelectedBook(null);
  }

  function handleSaveBook(bookData) {
    if (selectedBook) {
      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id ? { ...book, ...bookData } : book
      );
      setBooks(updatedBooks);
    } else {
      const newBook = { id: Date.now(), ...bookData };
      setBooks([...books, newBook]);
    }
    handleCloseForm();
  }

  function handleDeleteBook(book) {
    const confirmed = window.confirm(`Delete "${book.title}" from your library?`);
    if (confirmed) {
      const remainingBooks = books.filter((b) => b.id !== book.id);
      setBooks(remainingBooks);
    }
  }

  const filteredBooks = books.filter((book) => {
  const search = searchInput.toLowerCase().trim();

  const matchesSearch =
    book.title.toLowerCase().includes(search) ||
    book.author.toLowerCase().includes(search);

  const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;

  const matchesStatus = selectedStatus === "All" || book.status === selectedStatus;

  return matchesSearch && matchesGenre && matchesStatus;
});
useEffect(() => {
  localStorage.setItem("books", JSON.stringify(books));
}, [books]);

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="main-content">
  <div className="page-content">
    {activePage === "collection" ? (
      <Dashboard
        books={books}
        filteredBooks={filteredBooks}
        searchInput={searchInput}
        onSearchChange={setSearchInput}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        onAddClick={handleOpenAddForm}
        onEdit={handleEdit}
        onDelete={handleDeleteBook}
      />
    ) : (
      <DiscoverBooks />
    )}
  </div>

  <Footer />
</main>

      {showForm && (
        <BookForm
          bookToEdit={selectedBook}
          onSave={handleSaveBook}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
}

export default App;