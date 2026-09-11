import { useEffect, useState } from "react";

type RecordType =
  | "Contribution"
  | "Purchase"
  | "Profit"
  | "Loan Payment"
  | "Reinvestment"
  | "Withdrawal";

type InvestmentRecord = {
  id: number;
  date: string;
  person: string;
  type: RecordType;
  description: string;
  amount: number;
};

function Dashboard() {
  const [records, setRecords] = useState<InvestmentRecord[]>([]);

  // Starting SACCO loan
  const initialLoan = 150000;

  // Load records from localStorage
  useEffect(() => {
    const savedRecords = localStorage.getItem(
      "jointInvestRecords"
    );

    if (savedRecords) {
      setRecords(JSON.parse(savedRecords));
    }
  }, []);

  // Listen for changes when navigating between pages
  useEffect(() => {
    const handleStorageChange = () => {
      const savedRecords = localStorage.getItem(
        "jointInvestRecords"
      );

      if (savedRecords) {
        setRecords(JSON.parse(savedRecords));
      }
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // -----------------------------
  // CONTRIBUTIONS
  // -----------------------------

  const yourContribution = records
    .filter(
      (record) =>
        record.person === "You" &&
        record.type === "Contribution"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  const broContribution = records
    .filter(
      (record) =>
        record.person === "Bro" &&
        record.type === "Contribution"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  const totalInvested =
    yourContribution + broContribution;

  // -----------------------------
  // PROFIT
  // -----------------------------

  const totalProfit = records
    .filter(
      (record) => record.type === "Profit"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  // -----------------------------
  // WITHDRAWALS
  // -----------------------------

  const totalWithdrawals = records
    .filter(
      (record) => record.type === "Withdrawal"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  // -----------------------------
  // REINVESTMENT
  // -----------------------------

  const totalReinvestment = records
    .filter(
      (record) => record.type === "Reinvestment"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  // -----------------------------
  // LOAN PAYMENTS
  // -----------------------------

  const totalLoanPayments = records
    .filter(
      (record) => record.type === "Loan Payment"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  const loanRemaining = Math.max(
    initialLoan - totalLoanPayments,
    0
  );

  // -----------------------------
  // CURRENT VALUE
  // -----------------------------

  const currentValue =
    totalInvested +
    totalProfit +
    totalReinvestment -
    totalWithdrawals;

  // -----------------------------
  // OWNERSHIP
  // -----------------------------

  const yourOwnership =
    totalInvested > 0
      ? (yourContribution / totalInvested) * 100
      : 0;

  const broOwnership =
    totalInvested > 0
      ? (broContribution / totalInvested) * 100
      : 0;

  return (
    <main className="dashboard">

      {/* HEADER */}

      <header className="dashboard-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome to your joint investment tracker.
          </p>
        </div>

        <button className="profile-button">
          👤 You & Bro
        </button>

      </header>


      {/* SUMMARY CARDS */}

      <section className="summary-cards">

        <div className="card">

          <span>Total Invested</span>

          <h2>
            KES {totalInvested.toLocaleString()}
          </h2>

        </div>


        <div className="card">

          <span>Current Value</span>

          <h2>
            KES {currentValue.toLocaleString()}
          </h2>

        </div>


        <div className="card">

          <span>Total Profit</span>

          <h2 className="profit">
            +KES {totalProfit.toLocaleString()}
          </h2>

        </div>


        <div className="card">

          <span>Loan Remaining</span>

          <h2>
            KES {loanRemaining.toLocaleString()}
          </h2>

        </div>

      </section>


      {/* INVESTMENT BREAKDOWN */}

      <section className="members">

        <h2>Our Investment</h2>

        <div className="member-grid">

          {/* YOU */}

          <div className="member-card">

            <h3>👤 You</h3>

            <p>Contribution</p>

            <strong>
              KES {yourContribution.toLocaleString()}
            </strong>

            <p>
              Ownership: {yourOwnership.toFixed(1)}%
            </p>

          </div>


          {/* BRO */}

          <div className="member-card">

            <h3>👨‍🦱 Bro</h3>

            <p>Contribution</p>

            <strong>
              KES {broContribution.toLocaleString()}
            </strong>

            <p>
              Ownership: {broOwnership.toFixed(1)}%
            </p>

          </div>

        </div>

      </section>


      {/* SACCO */}

      <section className="loan-section">

        <h2>🏦 Umoja United SACCO</h2>

        <div className="loan-card">

          <div>

            <span>Monthly Repayment</span>

            <strong>
              KES 7,000
            </strong>

          </div>


          <div>

            <span>Paid So Far</span>

            <strong>
              KES {totalLoanPayments.toLocaleString()}
            </strong>

          </div>


          <div>

            <span>Remaining Loan</span>

            <strong>
              KES {loanRemaining.toLocaleString()}
            </strong>

          </div>


          <div>

            <span>Status</span>

            <strong className="status">
              {loanRemaining > 0
                ? "On Track"
                : "Paid"}
            </strong>

          </div>

        </div>

      </section>


      {/* QUICK FINANCIAL SUMMARY */}

      <section className="loan-section">

        <h2>📊 Investment Summary</h2>

        <div className="loan-card">

          <div>
            <span>Total Profit</span>

            <strong>
              KES {totalProfit.toLocaleString()}
            </strong>
          </div>


          <div>
            <span>Reinvested</span>

            <strong>
              KES {totalReinvestment.toLocaleString()}
            </strong>
          </div>


          <div>
            <span>Withdrawn</span>

            <strong>
              KES {totalWithdrawals.toLocaleString()}
            </strong>
          </div>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;