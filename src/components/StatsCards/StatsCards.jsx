import "./StatsCards.css";

function StatsCards({ books }) {
  const totalBooks = books.length;
  const readBooks = books.filter((book) => book.status === "Read").length;
  const unreadBooks = books.filter((book) => book.status === "Unread").length;

  return (
    <div className="stats">
      <div className="stat-card">
        <span className="stat-number">{totalBooks}</span>
        <span className="stat-label">Total Books</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{readBooks}</span>
        <span className="stat-label">Read Books</span>
      </div>
      <div className="stat-card">
        <span className="stat-number">{unreadBooks}</span>
        <span className="stat-label">Unread Books</span>
      </div>
    </div>
  );
}

export default StatsCards;
