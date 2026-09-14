import {
  getRecords,
  getSettings,
  getTotalProfit,
  getTotalLoanPayments,
  getTotalReinvestment,
} from "../data/investmentData";

function Distribution() {
  const records = getRecords();
  const settings = getSettings();

  // ==========================================
  // INFORMATION FROM RECORDS
  // ==========================================

  const monthlyProfit = getTotalProfit(records);

  const recordedLoanPayment =
    getTotalLoanPayments(records);

  const recordedReinvestment =
    getTotalReinvestment(records);

  // ==========================================
  // LOAN PAYMENT RULE
  // ==========================================

  const loanPayment =
    monthlyProfit >= settings.loanRepayment
      ? recordedLoanPayment
      : 0;

  // ==========================================
  // REMAINING PROFIT
  // ==========================================

  const remainingProfit = Math.max(
    monthlyProfit - loanPayment,
    0
  );

  // ==========================================
  // TAKE-HOME
  // ==========================================

  const takeHome = Math.max(
    remainingProfit - recordedReinvestment,
    0
  );

  // ==========================================
  // ACTUAL REINVESTMENT PERCENTAGE
  // ==========================================

  const reinvestmentPercentage =
    remainingProfit > 0
      ? (recordedReinvestment / remainingProfit) * 100
      : 0;

  // ==========================================
  // ACTUAL TAKE-HOME PERCENTAGE
  // ==========================================

  const takeHomePercentage =
    remainingProfit > 0
      ? (takeHome / remainingProfit) * 100
      : 0;

  // ==========================================
  // MEMBER TAKE-HOME BREAKDOWN
  // ==========================================

  const yourShare =
    takeHome * (settings.youSplit / 100);

  const broShare =
    takeHome * (settings.broSplit / 100);

  return (
    <main className="dashboard">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <header className="dashboard-header">
        <div>
          <h1>💰 Profit Distribution</h1>

          <p>
            See how our recorded investment profit
            is distributed.
          </p>
        </div>
      </header>

      {/* ========================= */}
      {/* SUMMARY CARDS */}
      {/* ========================= */}

      <section className="summary-cards">

        <div className="card">
          <span>Monthly Profit</span>

          <h2>
            KES {monthlyProfit.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <span>Loan Payment</span>

          <h2>
            KES {loanPayment.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <span>Reinvestment</span>

          <h2>
            KES {recordedReinvestment.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <span>Take-home</span>

          <h2>
            KES {takeHome.toLocaleString()}
          </h2>
        </div>

      </section>

      {/* ========================= */}
      {/* LOAN PAYMENT */}
      {/* ========================= */}

      <section className="loan-section">

        <h2>🏦 Mandatory Loan Payment</h2>

        <div className="loan-card">

          <div>
            <span>Monthly Profit</span>

            <strong>
              KES {monthlyProfit.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Required Payment</span>

            <strong>
              KES {loanPayment.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Monthly Target</span>

            <strong>
              KES {settings.loanRepayment.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Status</span>

            <strong
              className={
                loanPayment > 0
                  ? "status"
                  : "status warning"
              }
            >
              {loanPayment > 0
                ? "Payment Recorded"
                : "Not Required"}
            </strong>
          </div>

        </div>

        <p className="loan-note">
          A KES{" "}
          {settings.loanRepayment.toLocaleString()}{" "}
          payment is required when monthly profit
          reaches KES{" "}
          {settings.loanRepayment.toLocaleString()}{" "}
          or more.
        </p>

      </section>

      {/* ========================= */}
      {/* REMAINING PROFIT */}
      {/* ========================= */}

      <section className="members">

        <h2>📊 Remaining Profit Allocation</h2>

        <div className="member-grid">

          {/* REINVESTMENT */}

          <div className="member-card">

            <h2>📈 Reinvestment</h2>

            <p>Recorded Amount</p>

            <strong>
              KES{" "}
              {recordedReinvestment.toLocaleString()}
            </strong>

            <p>Percentage of Remaining Profit</p>

            <strong>
              {reinvestmentPercentage.toFixed(2)}%
            </strong>

            <p>
              Money added back into our crypto
              investment.
            </p>

          </div>

          {/* TAKE HOME */}

          <div className="member-card">

            <h2>💵 Take-home</h2>

            <p>Available Amount</p>

            <strong>
              KES {takeHome.toLocaleString()}
            </strong>

            <p>Percentage of Remaining Profit</p>

            <strong>
              {takeHomePercentage.toFixed(2)}%
            </strong>

            <p>
              Money available for you and your bro.
            </p>

          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* MEMBER BREAKDOWN */}
      {/* ========================= */}

      <section className="loan-section">

        <h2>👥 Take-home Breakdown</h2>

        <div className="loan-card">

          {/* YOU */}

          <div>
            <span>
              👤 You — {settings.youSplit}%
            </span>

            <strong>
              KES {yourShare.toLocaleString()}
            </strong>
          </div>

          {/* BRO */}

          <div>
            <span>
              👨‍🦱 Bro — {settings.broSplit}%
            </span>

            <strong>
              KES {broShare.toLocaleString()}
            </strong>
          </div>

          {/* TOTAL */}

          <div>
            <span>Total Take-home</span>

            <strong>
              KES {takeHome.toLocaleString()}
            </strong>
          </div>

        </div>

      </section>

      {/* ========================= */}
      {/* DISTRIBUTION SUMMARY */}
      {/* ========================= */}

      <section className="loan-section">

        <h2>📋 Distribution Summary</h2>

        <div className="loan-card">

          <div>
            <span>Original Profit</span>

            <strong>
              KES {monthlyProfit.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Loan Repayment</span>

            <strong>
              - KES {loanPayment.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Remaining Profit</span>

            <strong>
              KES {remainingProfit.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Reinvestment</span>

            <strong>
              KES {recordedReinvestment.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Take-home</span>

            <strong>
              KES {takeHome.toLocaleString()}
            </strong>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Distribution;
