import {
  getRecords,
  getSettings,
  getTotalLoanPayments,
  getTotalProfit,
} from "../data/investmentData";

function Loan() {
  const records = getRecords();
  const settings = getSettings();

  // ==========================================
  // LOAN CALCULATIONS FROM RECORDS
  // ==========================================

  const originalLoan = settings.initialLoan;

  const amountPaid = getTotalLoanPayments(records);

  const remainingBalance = Math.max(
    originalLoan - amountPaid,
    0
  );

  const monthlyTarget = settings.loanRepayment;

  // ==========================================
  // MEMBER RESPONSIBILITY
  // ==========================================

  const yourResponsibility =
    originalLoan * (settings.youSplit / 100);

  const broResponsibility =
    originalLoan * (settings.broSplit / 100);

  const yourPaid =
    amountPaid * (settings.youSplit / 100);

  const broPaid =
    amountPaid * (settings.broSplit / 100);

  const yourRemaining = Math.max(
    yourResponsibility - yourPaid,
    0
  );

  const broRemaining = Math.max(
    broResponsibility - broPaid,
    0
  );

  // ==========================================
  // MONTHLY REPAYMENT RULE
  // ==========================================

  const totalProfit = getTotalProfit(records);

  const repaymentRequired =
    totalProfit >= monthlyTarget;

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>🏦 Umoja United SACCO</h1>
          <p>
            Manage our joint loan and repayment records.
          </p>
        </div>
      </header>

      {/* LOAN SUMMARY */}
      <section className="summary-cards">

        <div className="card">
          <span>Original Loan</span>
          <h2>
            KES {originalLoan.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <span>Amount Paid</span>
          <h2>
            KES {amountPaid.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <span>Remaining Balance</span>
          <h2>
            KES {remainingBalance.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <span>Monthly Target</span>
          <h2>
            KES {monthlyTarget.toLocaleString()}
          </h2>
        </div>

      </section>

      {/* MEMBER RESPONSIBILITY */}
      <section className="members">
        <h2>Loan Responsibility</h2>

        <div className="member-grid">

          {/* YOU */}
          <div className="member-card">
            <h2>👤 You</h2>

            <p>Loan Responsibility</p>
            <strong>
              KES {yourResponsibility.toLocaleString()}
            </strong>

            <p>Amount Paid</p>
            <strong>
              KES {yourPaid.toLocaleString()}
            </strong>

            <p>Remaining</p>
            <strong>
              KES {yourRemaining.toLocaleString()}
            </strong>
          </div>

          {/* BRO */}
          <div className="member-card">
            <h2>👨‍🦱 Bro</h2>

            <p>Loan Responsibility</p>
            <strong>
              KES {broResponsibility.toLocaleString()}
            </strong>

            <p>Amount Paid</p>
            <strong>
              KES {broPaid.toLocaleString()}
            </strong>

            <p>Remaining</p>
            <strong>
              KES {broRemaining.toLocaleString()}
            </strong>
          </div>

        </div>
      </section>

      {/* REPAYMENT RULE */}
      <section className="loan-section">
        <h2>💰 Monthly Repayment Rule</h2>

        <div className="loan-card">

          <div>
            <span>Minimum Monthly Payment</span>
            <strong>
              KES {monthlyTarget.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Rule</span>
            <strong>
              Mandatory when profit ≥ KES{" "}
              {monthlyTarget.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Current Profit</span>
            <strong>
              KES {totalProfit.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong
              className={
                repaymentRequired
                  ? "status"
                  : ""
              }
            >
              {repaymentRequired
                ? "Payment Required"
                : "Not Required"}
            </strong>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Loan;
