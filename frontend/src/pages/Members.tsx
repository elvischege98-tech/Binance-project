import {
  getRecords,
  getSettings,
  getMemberContribution,
  getTotalProfit,
  getTotalContributions,
} from "../data/investmentData";

function Members() {
  const records = getRecords();
  const settings = getSettings();

  // ==========================================
  // CONTRIBUTIONS FROM RECORDS
  // ==========================================

  const yourContribution = getMemberContribution(
    records,
    "You"
  );

  const broContribution = getMemberContribution(
    records,
    "Bro"
  );

  const totalContributions = getTotalContributions(records);

  // ==========================================
  // PROFIT FROM RECORDS
  // ==========================================

  const totalProfit = getTotalProfit(records);

  const yourProfit =
    totalProfit * (settings.youSplit / 100);

  const broProfit =
    totalProfit * (settings.broSplit / 100);

  // ==========================================
  // INVESTMENT VALUE
  // ==========================================

  const yourInvestmentValue =
    yourContribution + yourProfit;

  const broInvestmentValue =
    broContribution + broProfit;

  return (
    <main className="dashboard">
      <h1>Members</h1>

      <p>
        View each member's contribution, ownership,
        investment value and profit.
      </p>

      <section className="member-grid">

        {/* YOU */}
        <div className="member-card">
          <h2>Elvis</h2>

          <p>Contribution</p>
          <strong>
            KES {yourContribution.toLocaleString()}
          </strong>

          <p>Ownership</p>
          <strong>
            {settings.youSplit}%
          </strong>

          <p>Investment Value</p>
          <strong>
            KES {yourInvestmentValue.toLocaleString()}
          </strong>

          <p>Profit</p>
          <strong className="profit">
            +KES {yourProfit.toLocaleString()}
          </strong>
        </div>

        {/* BRO */}
        <div className="member-card">
          <h2>Mark</h2>

          <p>Contribution</p>
          <strong>
            KES {broContribution.toLocaleString()}
          </strong>

          <p>Ownership</p>
          <strong>
            {settings.broSplit}%
          </strong>

          <p>Investment Value</p>
          <strong>
            KES {broInvestmentValue.toLocaleString()}
          </strong>

          <p>Profit</p>
          <strong className="profit">
            +KES {broProfit.toLocaleString()}
          </strong>
        </div>

      </section>

      {/* TOTAL */}
      <section className="member-card" style={{ marginTop: "20px" }}>
        <h2>🤝 Joint Investment</h2>

        <p>Total Contributions</p>
        <strong>
          KES {totalContributions.toLocaleString()}
        </strong>

        <p>Total Profit</p>
        <strong className="profit">
          +KES {totalProfit.toLocaleString()}
        </strong>
      </section>
    </main>
  );
}

export default Members;

