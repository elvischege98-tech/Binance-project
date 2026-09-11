import { useEffect, useMemo, useState } from "react";

import {
  getRecords,
  type InvestmentRecord,
} from "../data/investmentData";

function Investments() {
  const [records, setRecords] = useState<InvestmentRecord[]>(
    () => getRecords()
  );

  // ==========================================
  // AUTOMATIC RECORD UPDATES
  // ==========================================

  useEffect(() => {
    const refreshRecords = () => {
      setRecords(getRecords());
    };

    window.addEventListener(
      "jointInvestRecordsUpdated",
      refreshRecords
    );

    return () => {
      window.removeEventListener(
        "jointInvestRecordsUpdated",
        refreshRecords
      );
    };
  }, []);

  // ==========================================
  // CALCULATIONS
  // ==========================================

  const totalContributions = useMemo(() => {
    return records
      .filter((record) => record.type === "Contribution")
      .reduce((total, record) => total + record.amount, 0);
  }, [records]);

  const totalPurchases = useMemo(() => {
    return records
      .filter((record) => record.type === "Purchase")
      .reduce((total, record) => total + record.amount, 0);
  }, [records]);

  const totalProfit = useMemo(() => {
    return records
      .filter((record) => record.type === "Profit")
      .reduce((total, record) => total + record.amount, 0);
  }, [records]);

  const totalReinvestment = useMemo(() => {
    return records
      .filter((record) => record.type === "Reinvestment")
      .reduce((total, record) => total + record.amount, 0);
  }, [records]);

  const yourContribution = useMemo(() => {
    return records
      .filter(
        (record) =>
          record.person === "You" &&
          record.type === "Contribution"
      )
      .reduce((total, record) => total + record.amount, 0);
  }, [records]);

  const broContribution = useMemo(() => {
    return records
      .filter(
        (record) =>
          record.person === "Bro" &&
          record.type === "Contribution"
      )
      .reduce((total, record) => total + record.amount, 0);
  }, [records]);

  // ==========================================
  // PROFIT SPLIT
  // ==========================================

  const yourProfitShare = totalProfit * 0.5;

  const broProfitShare = totalProfit * 0.5;

  // ==========================================
  // INVESTMENT SPLIT
  // ==========================================

  const yourInvestmentShare = 50;

  const broInvestmentShare = 50;

  // ==========================================
  // PORTFOLIO VALUE
  // ==========================================

  const currentInvestmentValue =
    totalPurchases +
    totalReinvestment +
    totalProfit;

  const profitPercentage =
    totalContributions > 0
      ? (totalProfit / totalContributions) * 100
      : 0;

  // ==========================================
  // FORMAT MONEY
  // ==========================================

  function money(amount: number) {
    return `KES ${amount.toLocaleString()}`;
  }

  return (
    <main className="dashboard">

      {/* HEADER */}

      <header className="dashboard-header">
        <div>
          <h1>📈 Our Investments</h1>

          <p>
            One portfolio, two partners, one goal — growing
            our money together.
          </p>
        </div>

        <button className="profile-button">
          ₿ Joint Binance
        </button>
      </header>


      {/* WELCOME */}

      <section className="card investment-welcome">
        <div>
          <span className="section-label">
            JOINT INVESTMENT
          </span>

          <h2>
            Building something together 🤝
          </h2>

          <p>
            Keep track of what we've put in, what we've earned,
            and how our investment is growing over time.
          </p>
        </div>

        <div className="investment-status">
          <span>●</span>
          Active
        </div>
      </section>


      {/* SUMMARY */}

      <section className="summary-cards">

        <div className="card investment-summary-card">
          <span>💰 Total Invested</span>

          <h2>
            {money(totalContributions)}
          </h2>

          <p>
            What we've contributed so far
          </p>
        </div>


        <div className="card investment-summary-card">
          <span>📊 Current Value</span>

          <h2>
            {money(currentInvestmentValue)}
          </h2>

          <p>
            Estimated value of our investment
          </p>
        </div>


        <div className="card investment-summary-card">
          <span>🚀 Total Profit</span>

          <h2 className="profit">
            +{money(totalProfit)}
          </h2>

          <p>
            {profitPercentage.toFixed(2)}% growth
          </p>
        </div>


        <div className="card investment-summary-card">
          <span>🔄 Reinvested</span>

          <h2>
            {money(totalReinvestment)}
          </h2>

          <p>
            Profit put back to work
          </p>
        </div>

      </section>


      {/* YOU + BRO */}

      <section className="investment-members">

        {/* YOU */}

        <div className="card member-investment-card">

          <div className="member-card-header">

            <div className="member-avatar you-avatar">
              👤
            </div>

            <div>
              <span className="member-label">
                MEMBER 01
              </span>

              <h2>You</h2>

              <p>
                Your contribution to the partnership
              </p>
            </div>

          </div>


          <div className="member-main-amount">

            <span>Total Contribution</span>

            <h3>
              {money(yourContribution)}
            </h3>

          </div>


          <div className="member-details">

            <div>
              <span>Investment Share</span>

              <strong>
                {yourInvestmentShare}%
              </strong>
            </div>

            <div>
              <span>Profit Share</span>

              <strong>
                50%
              </strong>
            </div>

            <div>
              <span>Your Profit</span>

              <strong className="profit">
                +{money(yourProfitShare)}
              </strong>
            </div>

          </div>


          <div className="member-progress">

            <div className="progress-label">

              <span>Your investment</span>

              <strong>
                {yourInvestmentShare}%
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill you-progress"
                style={{
                  width: `${yourInvestmentShare}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* BRO */}

        <div className="card member-investment-card">

          <div className="member-card-header">

            <div className="member-avatar bro-avatar">
              👨‍🦱
            </div>

            <div>
              <span className="member-label">
                MEMBER 02
              </span>

              <h2>Bro</h2>

              <p>
                Your partner in the investment
              </p>
            </div>

          </div>


          <div className="member-main-amount">

            <span>Total Contribution</span>

            <h3>
              {money(broContribution)}
            </h3>

          </div>


          <div className="member-details">

            <div>
              <span>Investment Share</span>

              <strong>
                {broInvestmentShare}%
              </strong>
            </div>

            <div>
              <span>Profit Share</span>

              <strong>
                50%
              </strong>
            </div>

            <div>
              <span>Bro's Profit</span>

              <strong className="profit">
                +{money(broProfitShare)}
              </strong>
            </div>

          </div>


          <div className="member-progress">

            <div className="progress-label">

              <span>Bro's investment</span>

              <strong>
                {broInvestmentShare}%
              </strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill bro-progress"
                style={{
                  width: `${broInvestmentShare}%`,
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* PARTNERSHIP */}

      <section className="card partnership-card">

        <div className="partnership-header">

          <div>

            <span className="section-label">
              OUR PARTNERSHIP
            </span>

            <h2>
              How we share the profits
            </h2>

            <p>
              When we make money, the take-home portion is
              shared equally between the two of us.
            </p>

          </div>

          <div className="split-circle">

            <strong>
              50 / 50
            </strong>

            <span>
              Profit Split
            </span>

          </div>

        </div>


        <div className="split-container">

          <div className="split-person">

            <div className="split-person-top">

              <span>
                👤 You
              </span>

              <strong>
                50%
              </strong>

            </div>

            <div className="split-bar">

              <div
                className="split-fill"
                style={{
                  width: "50%",
                }}
              />

            </div>

            <p>
              {money(yourProfitShare)} of current profit
            </p>

          </div>


          <div className="split-person">

            <div className="split-person-top">

              <span>
                👨‍🦱 Bro
              </span>

              <strong>
                50%
              </strong>

            </div>

            <div className="split-bar">

              <div
                className="split-fill"
                style={{
                  width: "50%",
                }}
              />

            </div>

            <p>
              {money(broProfitShare)} of current profit
            </p>

          </div>

        </div>

      </section>


      {/* BREAKDOWN */}

      <section className="card investment-breakdown-card">

        <div className="section-heading">

          <div>

            <span className="section-label">
              PORTFOLIO ACTIVITY
            </span>

            <h2>
              Where our money is going
            </h2>

            <p>
              A simple view of how the investment has been used.
            </p>

          </div>

        </div>


        <div className="breakdown-grid">

          <div className="breakdown-item">

            <span>
              💵 Contributions
            </span>

            <strong>
              {money(totalContributions)}
            </strong>

          </div>


          <div className="breakdown-item">

            <span>
              ₿ Crypto Purchases
            </span>

            <strong>
              {money(totalPurchases)}
            </strong>

          </div>


          <div className="breakdown-item">

            <span>
              🔄 Reinvestment
            </span>

            <strong>
              {money(totalReinvestment)}
            </strong>

          </div>


          <div className="breakdown-item">

            <span>
              📈 Profit Generated
            </span>

            <strong className="profit">
              +{money(totalProfit)}
            </strong>

          </div>

        </div>

      </section>


      {/* BINANCE */}

      <section className="card binance-coming-card">

        <div className="binance-icon">
          ₿
        </div>

        <div>

          <span className="section-label">
            NEXT LEVEL
          </span>

          <h2>
            Connect Binance when we're ready 🚀
          </h2>

          <p>
            For now, we're keeping the numbers organized
            manually. Later, we'll connect the Binance account
            so your crypto holdings, balances and performance
            can update automatically.
          </p>

        </div>

        <span className="coming-soon">
          Coming Soon
        </span>

      </section>

    </main>
  );
}

export default Investments;