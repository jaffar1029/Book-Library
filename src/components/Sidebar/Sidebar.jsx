import "./Sidebar.css";

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">📚 Book Library</h2>
      <nav className="sidebar-nav">
        <button
          className={activePage === "collection" ? "nav-item active" : "nav-item"}
          onClick={() => onNavigate("collection")}
        >
          My Collection
        </button>
        <button
          className={activePage === "discover" ? "nav-item active" : "nav-item"}
          onClick={() => onNavigate("discover")}
        >
          Discover Books
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
