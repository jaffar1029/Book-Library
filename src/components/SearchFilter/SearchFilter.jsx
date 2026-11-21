import "./SearchFilter.css";
import { genres } from "../../constants";

function SearchFilter({
  searchInput,
  onSearchChange,
  selectedGenre,
  onGenreChange,
  selectedStatus,
  onStatusChange,
}) {
  return (
    <div className="search-filter">
      <input
        className="search-input"
        type="text"
        placeholder="Search by title or author..."
        value={searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <select
        className="filter-select"
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
      >
        <option value="All">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>{g}</option>
        ))}
      </select>

      <select
        className="filter-select"
        value={selectedStatus}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="All">All Status</option>
        <option value="Read">Read</option>
        <option value="Unread">Unread</option>
      </select>
    </div>
  );
}

export default SearchFilter;