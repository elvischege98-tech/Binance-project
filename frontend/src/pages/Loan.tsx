function Loan() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>🏦 Umoja United SACCO</h1>
          <p>Manage our joint loan and repayment records.</p>
        </div>
      </header>

      <section className="summary-cards">
        <div className="card">
          <span>Original Loan</span>
          <h2>KES 200,000</h2>
        </div>

        <div className="card">
          <span>Amount Paid</span>
          <h2>KES 50,000</h2>
        </div>

        <div className="card">
          <span>Remaining Balance</span>
          <h2>KES 150,000</h2>
        </div>

        <div className="card">
          <span>Monthly Target</span>
          <h2>KES 7,000</h2>
        </div>
      </section>

      <section className="members">
        <h2>Loan Responsibility</h2>

        <div className="member-grid">
          <div className="member-card">
            <h2>👤 You</h2>

            <p>Loan Responsibility</p>
            <strong>KES 120,000</strong>

            <p>Amount Paid</p>
            <strong>KES 30,000</strong>

            <p>Remaining</p>
            <strong>KES 90,000</strong>
          </div>

          <div className="member-card">
            <h2>👨‍🦱 Bro</h2>

            <p>Loan Responsibility</p>
            <strong>KES 80,000</strong>

            <p>Amount Paid</p>
            <strong>KES 20,000</strong>

            <p>Remaining</p>
            <strong>KES 60,000</strong>
          </div>
        </div>
      </section>

      <section className="loan-section">
        <h2>💰 Monthly Repayment Rule</h2>

        <div className="loan-card">
          <div>
            <span>Minimum Monthly Payment</span>
            <strong>KES 7,000</strong>
          </div>

          <div>
            <span>Rule</span>
            <strong>Mandatory when profit ≥ KES 7,000</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="status">Active</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Loan;