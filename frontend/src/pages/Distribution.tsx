import { useEffect, useState } from "react";

interface JointInvestSettings {
  loanRepayment: number;
  reinvestment: number;
  takeHome: number;
  youSplit: number;
  broSplit: number;
}

function Distribution() {
  // -----------------------------
  // MONTHLY PROFIT
  // -----------------------------
  const [monthlyProfit, setMonthlyProfit] = useState(20000);

  // -----------------------------
  // SETTINGS
  // -----------------------------
  const [settings, setSettings] = useState<JointInvestSettings>({
    loanRepayment: 7000,
    reinvestment: 60,
    takeHome: 40,
    youSplit: 50,
    broSplit: 50,
  });

  // -----------------------------
  // LOAD SETTINGS
  // -----------------------------
  useEffect(() => {
    const savedSettings = localStorage.getItem(
      "jointInvestSettings"
    );

    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // -----------------------------
  // LOAN CALCULATION
  // -----------------------------
  const loanPayment =
    monthlyProfit >= settings.loanRepayment
      ? settings.loanRepayment
      : 0;

  // -----------------------------
  // REMAINING PROFIT
  // -----------------------------
  const remainingProfit = Math.max(
    monthlyProfit - loanPayment,
    0
  );

  // -----------------------------
  // PROFIT ALLOCATION
  // -----------------------------
  const reinvestment =
    remainingProfit *
    (settings.reinvestment / 100);

  const takeHome =
    remainingProfit *
    (settings.takeHome / 100);

  // -----------------------------
  // MEMBER BREAKDOWN
  // -----------------------------
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
            Decide where our investment profit goes.
          </p>
        </div>
      </header>


      {/* ========================= */}
      {/* PROFIT INPUT */}
      {/* ========================= */}

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
              setMonthlyProfit(
                Math.max(Number(e.target.value), 0)
              )
            }
            min="0"
          />

        </div>

      </section>


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


      {/* ========================= */}
      {/* LOAN */}
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
            <span>Status</span>

            <strong
              className={
                loanPayment > 0
                  ? "status"
                  : "status warning"
              }
            >
              {loanPayment > 0
                ? "Required"
                : "Not Required"}
            </strong>
          </div>

        </div>


        <p className="loan-note">

          A KES {settings.loanRepayment.toLocaleString()} loan
          payment is automatically required when monthly profit
          reaches KES {settings.loanRepayment.toLocaleString()}
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

            <p>Percentage</p>

            <strong>
              {settings.reinvestment}%
            </strong>

            <p>Amount</p>

            <strong>
              KES {reinvestment.toLocaleString()}
            </strong>

            <p>
              Money used to increase our crypto investment.
            </p>

          </div>


          {/* TAKE HOME */}

          <div className="member-card">

            <h2>💵 Take-home</h2>

            <p>Percentage</p>

            <strong>
              {settings.takeHome}%
            </strong>

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

            <span>Total</span>

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
            <span>Reinvestment</span>

            <strong>
              KES {reinvestment.toLocaleString()}
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