function Dashboard() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your joint investment tracker.</p>
        </div>

        <button className="profile-button">
          👤 You & Bro
        </button>
      </header>

      <section className="summary-cards">
        <div className="card">
          <span>Total Invested</span>
          <h2>KES 200,000</h2>
        </div>

        <div className="card">
          <span>Current Value</span>
          <h2>KES 235,000</h2>
        </div>

        <div className="card">
          <span>Total Profit</span>
          <h2 className="profit">+KES 35,000</h2>
        </div>

        <div className="card">
          <span>Loan Remaining</span>
          <h2>KES 150,000</h2>
        </div>
      </section>

      <section className="members">
        <h2>Our Investment</h2>

        <div className="member-grid">
          <div className="member-card">
            <h3>👤 You</h3>
            <p>Contribution</p>
            <strong>KES 120,000</strong>
            <p>Ownership: 60%</p>
          </div>

          <div className="member-card">
            <h3>👨‍🦱 Bro</h3>
            <p>Contribution</p>
            <strong>KES 80,000</strong>
            <p>Ownership: 40%</p>
          </div>
        </div>
      </section>

      <section className="loan-section">
        <h2>🏦 Umoja United SACCO</h2>

        <div className="loan-card">
          <div>
            <span>Monthly Repayment</span>
            <strong>KES 7,000</strong>
          </div>

          <div>
            <span>Remaining Loan</span>
            <strong>KES 150,000</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="status">On Track</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;