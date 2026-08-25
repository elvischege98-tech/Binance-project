function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>Joint Invest</h2>
        <span>Crypto Tracker</span>
      </div>

      <nav>
        <a href="#" className="active">🏠 Dashboard</a>
        <a href="#">🪙 Investments</a>
        <a href="#">👥 Members</a>
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