import "./DiscoverBooks.css";

function DiscoverBooks() {
  return (
    <div>
      <h1 className="page-title">Discover Books</h1>

      <div className="discover-card">
        <div className="discover-icon">🔭</div>
        <h2 className="discover-heading">Discover New Books</h2>
        <p className="discover-text">
          Explore books from a wider collection and find your next favourite read.
        </p>
        <span className="coming-soon-badge">Coming Soon</span>
        <p className="discover-note">
          Book search, author information, genres and automatic book details
          will be added in a future update.
        </p>
      </div>
    </div>
  );
}

export default DiscoverBooks;