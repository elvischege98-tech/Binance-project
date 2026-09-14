import { useEffect, useState } from "react";

import {
  getRecords,
  getSettings,
  getTotalContributions,
  getTotalProfit,
  getTotalWithdrawals,
  getTotalReinvestment,
  getTotalLoanPayments,
  getTotalLoanReceived,
  getRemainingLoan,
  getMemberContribution,
  type InvestmentRecord,
  type JointInvestSettings,
} from "../data/investmentData";

function Dashboard() {
  // =====================================================
  // DATA
  // =====================================================

  const [records, setRecords] =
    useState<InvestmentRecord[]>(getRecords());

  const [settings, setSettings] =
    useState<JointInvestSettings>(getSettings());

  // =====================================================
  // AUTOMATICALLY REFRESH WHEN RECORDS CHANGE
  // =====================================================

  useEffect(() => {
    const refreshData = () => {
      setRecords(getRecords());
      setSettings(getSettings());
    };

    window.addEventListener(
      "jointInvestRecordsUpdated",
      refreshData
    );

    window.addEventListener(
      "jointInvestSettingsUpdated",
      refreshData
    );

    return () => {
      window.removeEventListener(
        "jointInvestRecordsUpdated",
        refreshData
      );

      window.removeEventListener(
        "jointInvestSettingsUpdated",
        refreshData
      );
    };
  }, []);

  // =====================================================
  // CONTRIBUTIONS
  // =====================================================

  const yourContribution =
    getMemberContribution(records, "You");

  const broContribution =
    getMemberContribution(records, "Bro");

  const totalInvested =
    getTotalContributions(records);

  // =====================================================
  // PROFIT
  // =====================================================

  const totalProfit =
    getTotalProfit(records);

  // =====================================================
  // WITHDRAWALS
  // =====================================================

  const totalWithdrawals =
    getTotalWithdrawals(records);

  // =====================================================
  // REINVESTMENT
  // =====================================================

  const totalReinvestment =
    getTotalReinvestment(records);

  // =====================================================
  // LOAN
  // =====================================================

  // IMPORTANT:
  // Loan amount now comes from Records
  const totalLoanReceived =
    getTotalLoanReceived(records);

  const totalLoanPayments =
    getTotalLoanPayments(records);

  // Remaining loan also comes from Records
  const loanRemaining =
    getRemainingLoan(records);

  // =====================================================
  // CURRENT VALUE
  // =====================================================

  const currentValue =
    totalInvested +
    totalProfit -
    totalWithdrawals;

  // =====================================================
  // OWNERSHIP
  // =====================================================

  const yourOwnership =
    totalInvested > 0
      ? (yourContribution / totalInvested) * 100
      : 0;

  const broOwnership =
    totalInvested > 0
      ? (broContribution / totalInvested) * 100
      : 0;

  // =====================================================
  // MONEY FORMAT
  // =====================================================

  const formatMoney = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <main className="dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

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

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <section className="summary-cards">

        {/* TOTAL INVESTED */}

        <div className="card">

          <span>Total Invested</span>

          <h2>
            {formatMoney(totalInvested)}
          </h2>

        </div>

        {/* CURRENT VALUE */}

        <div className="card">

          <span>Current Value</span>

          <h2>
            {formatMoney(currentValue)}
          </h2>

        </div>

        {/* PROFIT */}

        <div className="card">

          <span>Total Profit</span>

          <h2 className="profit">
            +{formatMoney(totalProfit)}
          </h2>

        </div>

        {/* LOAN */}

        <div className="card">

          <span>Loan Remaining</span>

          <h2>
            {formatMoney(loanRemaining)}
          </h2>

        </div>

      </section>

      {/* =================================================
          INVESTMENT BREAKDOWN
      ================================================= */}

      <section className="members">

        <h2>Our Investment</h2>

        <div className="member-grid">

          {/* YOU */}

          <div className="member-card">

            <h3>👤 You</h3>

            <p>Contribution</p>

            <strong>
              {formatMoney(yourContribution)}
            </strong>

            <p>
              Ownership:{" "}
              {yourOwnership.toFixed(1)}%
            </p>

          </div>

          {/* BRO */}

          <div className="member-card">

            <h3>👨‍🦱 Bro</h3>

            <p>Contribution</p>

            <strong>
              {formatMoney(broContribution)}
            </strong>

            <p>
              Ownership:{" "}
              {broOwnership.toFixed(1)}%
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          SACCO
      ================================================= */}

      <section className="loan-section">

        <h2>🏦 Umoja United SACCO</h2>

        <div className="loan-card">

          {/* ORIGINAL LOAN */}

          <div>

            <span>
              Original Loan
            </span>

            <strong>
              {formatMoney(totalLoanReceived)}
            </strong>

          </div>

          {/* MONTHLY REPAYMENT */}

          <div>

            <span>
              Monthly Repayment
            </span>

            <strong>
              {formatMoney(
                settings.loanRepayment
              )}
            </strong>

          </div>

          {/* PAID */}

          <div>

            <span>
              Paid So Far
            </span>

            <strong>
              {formatMoney(totalLoanPayments)}
            </strong>

          </div>

          {/* REMAINING */}

          <div>

            <span>
              Remaining Loan
            </span>

            <strong>
              {formatMoney(loanRemaining)}
            </strong>

          </div>

          {/* STATUS */}

          <div>

            <span>
              Status
            </span>

            <strong className="status">

              {totalLoanReceived === 0
                ? "No Loan"
                : loanRemaining > 0
                ? "On Track"
                : "Paid"}

            </strong>

          </div>

        </div>

      </section>

      {/* =================================================
          QUICK FINANCIAL SUMMARY
      ================================================= */}

      <section className="loan-section">

        <h2>
          📊 Investment Summary
        </h2>

        <div className="loan-card">

          {/* PROFIT */}

          <div>

            <span>
              Total Profit
            </span>

            <strong className="profit">
              {formatMoney(totalProfit)}
            </strong>

          </div>

          {/* REINVESTMENT */}

          <div>

            <span>
              Reinvested
            </span>

            <strong>
              {formatMoney(
                totalReinvestment
              )}
            </strong>

          </div>

          {/* WITHDRAWALS */}

          <div>

            <span>
              Withdrawn
            </span>

            <strong>
              {formatMoney(
                totalWithdrawals
              )}
            </strong>

          </div>

          {/* OWNERSHIP */}

          <div>

            <span>
              Ownership Split
            </span>

            <strong>
              {settings.youSplit}% /{" "}
              {settings.broSplit}%
            </strong>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;