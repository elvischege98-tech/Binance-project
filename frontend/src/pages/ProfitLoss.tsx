import { useEffect, useState } from "react";

import {
  getRecords,
  getSettings,
  getTotalContributions,
  getTotalProfit,
  getTotalWithdrawals,
  getMemberContribution,
  type InvestmentRecord,
  type JointInvestSettings,
} from "../data/investmentData";

function ProfitLoss() {
  const [records, setRecords] =
    useState<InvestmentRecord[]>(
      getRecords()
    );

  const [settings, setSettings] =
    useState<JointInvestSettings>(
      getSettings()
    );

  // =====================================================
  // REFRESH WHEN RECORDS CHANGE
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
  // MAIN CALCULATIONS
  // =====================================================

  const totalInvested =
    getTotalContributions(
      records
    );

  const totalProfit =
    getTotalProfit(records);

  const totalWithdrawals =
    getTotalWithdrawals(
      records
    );

  const currentValue =
    totalInvested +
    totalProfit -
    totalWithdrawals;

  const profitPercentage =
    totalInvested > 0
      ? (totalProfit /
          totalInvested) *
        100
      : 0;

  // =====================================================
  // MEMBER CONTRIBUTIONS
  // =====================================================

  const yourInvestment =
    getMemberContribution(
      records,
      "You"
    );

  const broInvestment =
    getMemberContribution(
      records,
      "Bro"
    );

  // =====================================================
  // MEMBER PROFIT
  // =====================================================

  const yourProfit =
    totalProfit *
    (settings.youSplit / 100);

  const broProfit =
    totalProfit *
    (settings.broSplit / 100);

  // =====================================================
  // MEMBER CURRENT VALUE
  // =====================================================

  const yourCurrentValue =
    yourInvestment +
    yourProfit;

  const broCurrentValue =
    broInvestment +
    broProfit;

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatMoney = (
    amount: number
  ) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <main className="dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="dashboard-header">

        <div>

          <h1>
            📊 Profit & Loss
          </h1>

          <p>
            Track the real performance
            of your joint crypto
            investment.
          </p>

        </div>

      </header>

      {/* =================================================
          SUMMARY CARDS
      ================================================= */}

      <section className="summary-cards">

        <div className="card">

          <h3>
            Total Invested
          </h3>

          <h2>
            {formatMoney(
              totalInvested
            )}
          </h2>

          <p>
            From contribution
            records
          </p>

        </div>

        <div className="card">

          <h3>
            Current Value
          </h3>

          <h2>
            {formatMoney(
              currentValue
            )}
          </h2>

          <p>
            Investment value
          </p>

        </div>

        <div className="card">

          <h3>
            Total Profit
          </h3>

          <h2
            style={{
              color: "#16a34a",
            }}
          >
            +{formatMoney(
              totalProfit
            )}
          </h2>

          <p>
            Recorded profit
          </p>

        </div>

        <div className="card">

          <h3>
            Profit Percentage
          </h3>

          <h2
            style={{
              color: "#16a34a",
            }}
          >
            +{profitPercentage.toFixed(
              2
            )}%
          </h2>

          <p>
            Return on investment
          </p>

        </div>

      </section>

      {/* =================================================
          MEMBER BREAKDOWN
      ================================================= */}

      <section
        style={{
          marginTop: "25px",
        }}
      >

        <h2>
          Profit Breakdown
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            marginTop: "15px",
          }}
        >

          {/* =================================================
              YOU
          ================================================= */}

          <div className="card">

            <h2>
              Elvis
            </h2>

            <p>
              Elvis' Investment
            </p>

            <strong>
              {formatMoney(
                yourInvestment
              )}
            </strong>

            <p>
              Elvis' Ownership
            </p>

            <strong>
              {settings.youSplit}%
            </strong>

            <p>
              Elvis' Profit
            </p>

            <strong
              style={{
                color: "#16a34a",
              }}
            >
              +{formatMoney(
                yourProfit
              )}
            </strong>

            <p>
              Elvis' Current Value
            </p>

            <strong>
              {formatMoney(
                yourCurrentValue
              )}
            </strong>

          </div>

          {/* =================================================
              BRO
          ================================================= */}

          <div className="card">

            <h2>
              Mark
            </h2>

            <p>
              Bro's Investment
            </p>

            <strong>
              {formatMoney(
                broInvestment
              )}
            </strong>

            <p>
              Mark's Ownership
            </p>

            <strong>
              {settings.broSplit}%
            </strong>

            <p>
              Mark's Profit
            </p>

            <strong
              style={{
                color: "#16a34a",
              }}
            >
              +{formatMoney(
                broProfit
              )}
            </strong>

            <p>
              Mark's Current Value
            </p>

            <strong>
              {formatMoney(
                broCurrentValue
              )}
            </strong>

          </div>

        </div>

      </section>

      {/* =================================================
          INVESTMENT PERFORMANCE
      ================================================= */}

      <section
        style={{
          marginTop: "25px",
        }}
      >

        <h2>
          📈 Investment Performance
        </h2>

        <div
          className="card"
          style={{
            marginTop: "15px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >

          <div>

            <p>
              Investment Cost
            </p>

            <strong>
              {formatMoney(
                totalInvested
              )}
            </strong>

          </div>

          <div>

            <p>
              Current Value
            </p>

            <strong>
              {formatMoney(
                currentValue
              )}
            </strong>

          </div>

          <div>

            <p>
              Profit
            </p>

            <strong
              style={{
                color: "#16a34a",
              }}
            >
              +{formatMoney(
                totalProfit
              )}
            </strong>

          </div>

          <div>

            <p>
              Withdrawals
            </p>

            <strong>
              {formatMoney(
                totalWithdrawals
              )}
            </strong>

          </div>

        </div>

      </section>

    </main>
  );
}

export default ProfitLoss;