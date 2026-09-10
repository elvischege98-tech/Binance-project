import { useState } from "react";

function Distribution() {
  // Main settings
  const [monthlyProfit, setMonthlyProfit] = useState(20000);

  const loanPayment = monthlyProfit >= 7000 ? 7000 : 0;

  const remainingProfit = Math.max(monthlyProfit - loanPayment, 0);

  // Remaining profit allocation
  const reinvestmentPercentage = 50;
  const takeHomePercentage = 50;

  const reinvestment =
    remainingProfit * (reinvestmentPercentage / 100);

  const takeHome =
    remainingProfit * (takeHomePercentage / 100);

  // Member ownership
  const youPercentage = 50;
  const broPercentage = 50;

  const yourShare = takeHome * (youPercentage / 100);
  const broShare = takeHome * (broPercentage / 100);

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>💰 Profit Distribution</h1>
          <p>Decide where our investment profit goes.</p>
        </div>
      </header>

      {/* Profit Input */}
      <section className="distribution-input">
        <h2>Monthly Profit</h2>

        <p>
          Enter the total profit made this month.
        </p>

        <div className="profit-input">
          <span>KES</span>

          <input
            type="number"
            value={monthlyProfit}
            onChange={(e) =>
              setMonthlyProfit(Number(e.target.value))
            }
            min="0"
          />
        </div>
      </section>

      {/* Summary */}
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
            KES {reinvestment.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <span>Take-home</span>
          <h2>
            KES {takeHome.toLocaleString()}
          </h2>
        </div>
      </section>

      {/* Loan */}
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
            <span>Status</span>

            <strong className={loanPayment > 0 ? "status" : "status warning"}>
              {loanPayment > 0 ? "Required" : "Not Required"}
            </strong>
          </div>
        </div>

        <p className="loan-note">
          A KES 7,000 loan payment is automatically required
          when monthly profit reaches KES 7,000 or more.
        </p>
      </section>

      {/* Remaining Profit */}
      <section className="members">
        <h2>📊 Remaining Profit Allocation</h2>

        <div className="member-grid">
          <div className="member-card">
            <h2>📈 Reinvestment</h2>

            <p>Percentage</p>
            <strong>{reinvestmentPercentage}%</strong>

            <p>Amount</p>
            <strong>
              KES {reinvestment.toLocaleString()}
            </strong>

            <p>
              Money used to increase our crypto investment.
            </p>
          </div>

          <div className="member-card">
            <h2>💵 Take-home</h2>

            <p>Percentage</p>
            <strong>{takeHomePercentage}%</strong>

            <p>Amount</p>
            <strong>
              KES {takeHome.toLocaleString()}
            </strong>

            <p>
              Money available for you and your bro.
            </p>
          </div>
        </div>
      </section>

      {/* Member Breakdown */}
      <section className="loan-section">
        <h2>👥 Take-home Breakdown</h2>

        <div className="loan-card">
          <div>
            <span>👤 You — {youPercentage}%</span>
            <strong>
              KES {yourShare.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>👨‍🦱 Bro — {broPercentage}%</span>
            <strong>
              KES {broShare.toLocaleString()}
            </strong>
          </div>

          <div>
            <span>Total</span>
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