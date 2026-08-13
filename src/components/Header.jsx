import {
  Bell,
  Search
} from "lucide-react";

function Header() {
  return (
    <header className="top-header">

      {/* Search */}

      <div className="header-search">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search students..."
        />

      </div>

      {/* Right Side */}

      <div className="header-actions">

        <button className="notification-btn">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>

        <div className="header-user">

          <div className="header-avatar">
            A
          </div>

          <div>
            <strong>Akshu</strong>
            <span>Admin</span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;