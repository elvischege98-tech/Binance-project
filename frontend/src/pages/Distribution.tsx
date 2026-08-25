function Distribution() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>💰 Profit Distribution</h1>
          <p>Decide where our investment profit goes.</p>
        </div>
      </header>

      <section className="summary-cards">
        <div className="card">
          <span>Monthly Profit</span>
          <h2>KES 20,000</h2>
        </div>

        <div className="card">
          <span>Loan Payment</span>
          <h2>KES 7,000</h2>
        </div>

        <div className="card">
          <span>Reinvestment</span>
          <h2>KES 7,800</h2>
        </div>

        <div className="card">
          <span>Take-home</span>
          <h2>KES 5,200</h2>
        </div>
      </section>

      <section className="loan-section">
        <h2>🏦 Mandatory Loan Payment</h2>

        <div className="loan-card">
          <div>
            <span>Monthly Profit</span>
            <strong>KES 20,000</strong>
          </div>

          <div>
            <span>Required Payment</span>
            <strong>KES 7,000</strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="status">Required</strong>
          </div>
        </div>
      </section>

      <section className="members">
        <h2>📊 Remaining Profit Allocation</h2>

        <div className="member-grid">
          <div className="member-card">
            <h2>📈 Reinvestment</h2>

            <p>Percentage</p>
            <strong>60%</strong>

            <p>Amount</p>
            <strong>KES 7,800</strong>

            <p>
              Money used to increase our crypto investment.
            </p>
          </div>

          <div className="member-card">
            <h2>💵 Take-home</h2>

            <p>Percentage</p>
            <strong>40%</strong>

            <p>Amount</p>
            <strong>KES 5,200</strong>

            <p>
              Money available for you and your bro.
            </p>
          </div>
        </div>
      </section>

      <section className="loan-section">
        <h2>👥 Take-home Breakdown</h2>

        <div className="loan-card">
          <div>
            <span>👤 You — 60%</span>
            <strong>KES 3,120</strong>
          </div>

          <div>
            <span>👨‍🦱 Bro — 40%</span>
            <strong>KES 2,080</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>KES 5,200</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Distribution;