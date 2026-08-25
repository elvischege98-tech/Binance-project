function Records() {
  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>🧾 Records</h1>
          <p>Complete history of our joint investment activity.</p>
        </div>

        <button className="profile-button">
          + Add Record
        </button>
      </header>

      <section className="summary-cards">
        <div className="card">
          <span>Total Records</span>
          <h2>12</h2>
        </div>

        <div className="card">
          <span>Contributions</span>
          <h2>2</h2>
        </div>

        <div className="card">
          <span>Purchases</span>
          <h2>3</h2>
        </div>

        <div className="card">
          <span>Loan Payments</span>
          <h2>2</h2>
        </div>
      </section>

      <section className="records-section">
        <h2>Transaction History</h2>

        <div className="records-table-container">
          <table className="records-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Person</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>25 Aug 2026</td>
                <td>👤 You</td>
                <td>Contribution</td>
                <td>Initial investment contribution</td>
                <td>KES 120,000</td>
              </tr>

              <tr>
                <td>25 Aug 2026</td>
                <td>👨‍🦱 Bro</td>
                <td>Contribution</td>
                <td>Initial investment contribution</td>
                <td>KES 80,000</td>
              </tr>

              <tr>
                <td>25 Aug 2026</td>
                <td>Joint</td>
                <td>Purchase</td>
                <td>BTC purchase</td>
                <td>KES 200,000</td>
              </tr>

              <tr>
                <td>30 Aug 2026</td>
                <td>Joint</td>
                <td>Profit</td>
                <td>Monthly investment profit</td>
                <td className="profit">+KES 20,000</td>
              </tr>

              <tr>
                <td>30 Aug 2026</td>
                <td>Joint</td>
                <td>Loan Payment</td>
                <td>Umoja United SACCO</td>
                <td>KES 7,000</td>
              </tr>

              <tr>
                <td>30 Aug 2026</td>
                <td>Joint</td>
                <td>Reinvestment</td>
                <td>Added back to investment</td>
                <td>KES 7,800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Records;