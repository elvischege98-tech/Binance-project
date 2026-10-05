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
  getMemberContribution,
  getTotalMoneyLent,
  getOutstandingMoneyLent,
  type InvestmentRecord,
  type JointInvestSettings,
} from "../data/investmentData";

function Dashboard() {
  const [records, setRecords] =
    useState<InvestmentRecord[]>(
      getRecords()
    );

  const [settings, setSettings] =
    useState<JointInvestSettings>(
      getSettings()
    );

  useEffect(() => {
    const refresh = () => {
      setRecords(getRecords());
      setSettings(getSettings());
    };

    window.addEventListener(
      "jointInvestRecordsUpdated",
      refresh
    );

    window.addEventListener(
      "jointInvestSettingsUpdated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "jointInvestRecordsUpdated",
        refresh
      );

      window.removeEventListener(
        "jointInvestSettingsUpdated",
        refresh
      );
    };
  }, []);

  // =====================================================
  // CONTRIBUTIONS
  // =====================================================

  const yourContribution =
    getMemberContribution(
      records,
      "You"
    );

  const broContribution =
    getMemberContribution(
      records,
      "Bro"
    );

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

  const totalLoanReceived =
    getTotalLoanReceived(records);

  const totalLoanPayments =
    getTotalLoanPayments(records);

  const loanRemaining =
    Math.max(
      totalLoanReceived -
        totalLoanPayments,
      0
    );

  // =====================================================
  // MONEY LENT
  // =====================================================

  const totalMoneyLent =
    getTotalMoneyLent(records);

  const outstandingMoneyLent =
    getOutstandingMoneyLent(
      records
    );

  // =====================================================
  // CURRENT INVESTMENT VALUE
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
      ? (yourContribution /
          totalInvested) *
        100
      : 0;

  const broOwnership =
    totalInvested > 0
      ? (broContribution /
          totalInvested) *
        100
      : 0;

  const formatMoney = (
    amount: number
  ) =>
    `KES ${amount.toLocaleString()}`;

  return (
    <main className="dashboard">

      <header className="dashboard-header">

        <div>

          <h1>
            Dashboard
          </h1>

          <p>
            Welcome to your joint
            investment tracker.
          </p>

        </div>

        <button className="profile-button">
          Elvis & Mark
        </button>

      </header>

      {/* SUMMARY */}

      <section className="summary-cards">

        <div className="card">

          <span>
            Total Invested
          </span>

          <h2>
            {formatMoney(
              totalInvested
            )}
          </h2>

        </div>

        <div className="card">

          <span>
            Current Value
          </span>

          <h2>
            {formatMoney(
              currentValue
            )}
          </h2>

        </div>

        <div className="card">

          <span>
            Total Profit
          </span>

          <h2 className="profit">
            +{formatMoney(
              totalProfit
            )}
          </h2>

        </div>

        <div className="card">

          <span>
            Loan Remaining
          </span>

          <h2>
            {formatMoney(
              loanRemaining
            )}
          </h2>

        </div>

      </section>

      {/* MEMBERS */}

      <section className="members">

        <h2>
          Our Investment
        </h2>

        <div className="member-grid">

          <div className="member-card">

            <h3>
              Elvis
            </h3>

            <p>
              Contribution
            </p>

            <strong>
              {formatMoney(
                yourContribution
              )}
            </strong>

            <p>
              Ownership:{" "}
              {yourOwnership.toFixed(1)}%
            </p>

          </div>

          <div className="member-card">

            <h3>
              👨‍🦱 Mark
            </h3>

            <p>
              Contribution
            </p>

            <strong>
              {formatMoney(
                broContribution
              )}
            </strong>

            <p>
              Ownership:{" "}
              {broOwnership.toFixed(1)}%
            </p>

          </div>

        </div>

      </section>

      {/* SACCO */}

      <section className="loan-section">

        <h2>
          🏦 Umoja United SACCO
        </h2>

        <div className="loan-card">

          <div>

            <span>
              Original Loan
            </span>

            <strong>
              {formatMoney(
                totalLoanReceived
              )}
            </strong>

          </div>

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

          <div>

            <span>
              Paid So Far
            </span>

            <strong>
              {formatMoney(
                totalLoanPayments
              )}
            </strong>

          </div>

          <div>

            <span>
              Remaining Loan
            </span>

            <strong>
              {formatMoney(
                loanRemaining
              )}
            </strong>

          </div>

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

      {/* MONEY LENT */}

      <section className="loan-section">

        <h2>
          🤝 Money Lent Out
        </h2>

        <div className="loan-card">

          <div>

            <span>
              Total Lent
            </span>

            <strong>
              {formatMoney(
                totalMoneyLent
              )}
            </strong>

          </div>

          <div>

            <span>
              Still Owed
            </span>

            <strong>
              {formatMoney(
                outstandingMoneyLent
              )}
            </strong>

          </div>

        </div>

      </section>

      {/* FINANCIAL SUMMARY */}

      <section className="loan-section">

        <h2>
          📊 Investment Summary
        </h2>

        <div className="loan-card">

          <div>

            <span>
              Total Profit
            </span>

            <strong className="profit">
              {formatMoney(
                totalProfit
              )}
            </strong>

          </div>

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