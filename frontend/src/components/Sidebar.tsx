import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>Joint Invest</h2>
        <span>Crypto Tracker</span>
      </div>

      <nav>
        <Link to="/">🏠 Dashboard</Link>
        <Link to="/investments">🪙 Investments</Link>
        <Link to="/members">👥 Members</Link>

        <a href="#">🏦 SACCO Loan</a>
        <a href="#">📊 Profit & Loss</a>
        <a href="#">💰 Distribution</a>
        <a href="#">🧾 Records</a>
        <a href="#">⚙️ Settings</a>
      </nav>
    </aside>
  );
}

export default Sidebar;