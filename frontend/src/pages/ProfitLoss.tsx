function ProfitLoss() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>📊 Profit & Loss</h1>
          <p>Track the performance of our joint crypto investment.</p>
        </div>
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
          <span>Profit Percentage</span>
          <h2 className="profit">+17.5%</h2>
        </div>
      </section>

      <section className="members">
        <h2>Profit Breakdown</h2>

        <div className="member-grid">
          <div className="member-card">
            <h2>👤 You</h2>

            <p>Your Investment</p>
            <strong>KES 120,000</strong>

            <p>Your Ownership</p>
            <strong>60%</strong>

            <p>Your Profit</p>
            <strong className="profit">+KES 21,000</strong>

            <p>Your Current Value</p>
            <strong>KES 141,000</strong>
          </div>

          <div className="member-card">
            <h2>👨‍🦱 Bro</h2>

            <p>Bro's Investment</p>
            <strong>KES 80,000</strong>

            <p>Bro's Ownership</p>
            <strong>40%</strong>

            <p>Bro's Profit</p>
            <strong className="profit">+KES 14,000</strong>

            <p>Bro's Current Value</p>
            <strong>KES 94,000</strong>
          </div>
        </div>
      </section>

      <section className="loan-section">
        <h2>📈 Investment Performance</h2>

        <div className="loan-card">
          <div>
            <span>Investment Cost</span>
            <strong>KES 200,000</strong>
          </div>

          <div>
            <span>Current Value</span>
            <strong>KES 235,000</strong>
          </div>

          <div>
            <span>Profit</span>
            <strong className="profit">+KES 35,000</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProfitLoss;