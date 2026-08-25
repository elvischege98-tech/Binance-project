function Members() {
  return (
    <main className="dashboard">
      <h1>Members</h1>
      <p>Manage you and your bro's investment information.</p>

      <section className="member-grid">
        <div className="member-card">
          <h2>👤 You</h2>

          <p>Contribution</p>
          <strong>KES 120,000</strong>

          <p>Ownership</p>
          <strong>60%</strong>

          <p>Investment Value</p>
          <strong>KES 141,000</strong>

          <p>Profit</p>
          <strong className="profit">+KES 21,000</strong>
        </div>

        <div className="member-card">
          <h2>👨‍🦱 Bro</h2>

          <p>Contribution</p>
          <strong>KES 80,000</strong>

          <p>Ownership</p>
          <strong>40%</strong>

          <p>Investment Value</p>
          <strong>KES 94,000</strong>

          <p>Profit</p>
          <strong className="profit">+KES 14,000</strong>
        </div>
      </section>
    </main>
  );
}

export default Members;