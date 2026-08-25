function Settings() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>⚙️ Settings</h1>
          <p>Manage our investment rules and account preferences.</p>
        </div>
      </header>

      <section className="loan-section">
        <h2>💰 Profit Allocation Rules</h2>

        <div className="settings-card">
          <div className="setting-row">
            <div>
              <h3>🏦 Loan Repayment</h3>
              <p>Mandatory monthly repayment when profit reaches the target.</p>
            </div>

            <input type="number" value="7000" readOnly />
          </div>

          <div className="setting-row">
            <div>
              <h3>📈 Reinvestment</h3>
              <p>Percentage of remaining profit added back to the investment.</p>
            </div>

            <input type="number" value="60" readOnly />
          </div>

          <div className="setting-row">
            <div>
              <h3>💵 Take-home</h3>
              <p>Percentage of remaining profit available to you and your bro.</p>
            </div>

            <input type="number" value="40" readOnly />
          </div>

          <div className="total-row">
            <span>Total Allocation</span>
            <strong>100%</strong>
          </div>
        </div>
      </section>

      <section className="loan-section">
        <h2>🏦 Loan Settings</h2>

        <div className="settings-card">
          <div className="setting-row">
            <div>
              <h3>Monthly Loan Target</h3>
              <p>Minimum amount required for the monthly SACCO repayment.</p>
            </div>

            <strong>KES 7,000</strong>
          </div>

          <div className="setting-row">
            <div>
              <h3>Mandatory Repayment</h3>
              <p>
                Require repayment when monthly profit is at least KES 7,000.
              </p>
            </div>

            <strong className="status">ACTIVE</strong>
          </div>
        </div>
      </section>

      <section className="loan-section">
        <h2>👥 Member Settings</h2>

        <div className="settings-card">
          <div className="setting-row">
            <div>
              <h3>👤 You</h3>
              <p>Ownership percentage</p>
            </div>

            <strong>60%</strong>
          </div>

          <div className="setting-row">
            <div>
              <h3>👨‍🦱 Bro</h3>
              <p>Ownership percentage</p>
            </div>

            <strong>40%</strong>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Settings;