import "./Dashboard.css";
import StatsCards from "../StatsCards/StatsCards";
import SearchFilter from "../SearchFilter/SearchFilter";
import BookList from "../BookList/BookList";

function Dashboard({
  books,
  filteredBooks,
  searchInput,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedStatus,
  onStatusChange,
  onAddClick,
  onEdit,
  onDelete,
}) {
  return (
    <div>
      <div className="dashboard-header">
        <h1 className="page-title">My Collection</h1>
        <button className="btn btn-primary" onClick={onAddClick}>
          + Add Book
        </button>
      </div>

      <StatsCards books={books} />

      <SearchFilter
        searchInput={searchInput}
        onSearchChange={onSearchChange}
        selectedGenre={selectedGenre}
        onGenreChange={onGenreChange}
        selectedStatus={selectedStatus}
        onStatusChange={onStatusChange}
      />

      <BookList
  books={filteredBooks}
  isLibraryEmpty={books.length === 0}
  onEdit={onEdit}
  onDelete={onDelete}
/>
    </div>
  );
}

export default Dashboard;