import { useEffect, useState } from "react";

import {
  getRecords,
  getSettings,
  getTotalLoanPayments,
  getTotalLoanReceived,
  getTotalProfit,
} from "../data/investmentData";

function SACCOLoan() {
  const [records, setRecords] = useState(
    getRecords()
  );

  const [settings, setSettings] = useState(
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
  // LOAN CALCULATIONS
  // =====================================================

  const originalLoan =
    getTotalLoanReceived(records);

  const amountPaid =
    getTotalLoanPayments(records);

  const remainingLoan = Math.max(
    originalLoan - amountPaid,
    0
  );

  const monthlyRepayment =
    settings.loanRepayment;

  const totalProfit =
    getTotalProfit(records);

  const paymentRequired =
    totalProfit >= monthlyRepayment;

  // =====================================================
  // 50/50 RESPONSIBILITY
  // =====================================================

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

  // =====================================================
  // MONEY FORMAT
  // =====================================================

  const formatMoney = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <main className="dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="dashboard-header">

        <div>
          <h1>🏦 SACCO Loan</h1>

          <p>
            Track your Umoja United SACCO loan and
            repayments.
          </p>
        </div>

      </header>

      {/* =================================================
          LOAN SUMMARY
      ================================================= */}

      <section className="summary-cards">

        <div className="card">

          <h3>Original Loan</h3>

          <h2>
            {formatMoney(originalLoan)}
          </h2>

          <p>
            Total loan received
          </p>

        </div>

        <div className="card">

          <h3>Amount Paid</h3>

          <h2>
            {formatMoney(amountPaid)}
          </h2>

          <p>
            Total repayments
          </p>

        </div>

        <div className="card">

          <h3>Loan Remaining</h3>

          <h2>
            {formatMoney(remainingLoan)}
          </h2>

          <p>
            Outstanding balance
          </p>

        </div>

        <div className="card">

          <h3>Monthly Target</h3>

          <h2>
            {formatMoney(monthlyRepayment)}
          </h2>

          <p>
            Required repayment
          </p>

        </div>

      </section>

      {/* =================================================
          PAYMENT STATUS
      ================================================= */}

      <section
        className="card"
        style={{ marginTop: "20px" }}
      >

        <h2>Payment Status</h2>

        <p>
          Current recorded profit:{" "}
          <strong>
            {formatMoney(totalProfit)}
          </strong>
        </p>

        {paymentRequired ? (
          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              borderRadius: "10px",
              background: "#f5f5f5",
            }}
          >
            ✅{" "}
            <strong>
              Payment Required
            </strong>

            <p>
              The investment has enough profit to
              cover this month's{" "}
              {formatMoney(monthlyRepayment)} SACCO
              repayment.
            </p>
          </div>
        ) : (
          <div
            style={{
              marginTop: "15px",
              padding: "15px",
              borderRadius: "10px",
              background: "#f5f5f5",
            }}
          >
            ⏳{" "}
            <strong>
              Payment Not Required Yet
            </strong>

            <p>
              A repayment is required when monthly
              profit reaches{" "}
              {formatMoney(monthlyRepayment)}.
            </p>
          </div>
        )}

      </section>

      {/* =================================================
          MEMBER RESPONSIBILITY
      ================================================= */}

      <section
        className="card"
        style={{ marginTop: "20px" }}
      >

        <h2>🤝 Loan Responsibility</h2>

        <p>
          The loan responsibility is split 50/50
          between you and Bro.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >

          {/* YOU */}

          <div className="card">

            <h3>👤 You</h3>

            <p>
              Loan responsibility
            </p>

            <h2>
              {formatMoney(yourResponsibility)}
            </h2>

            <p>
              Paid:{" "}
              <strong>
                {formatMoney(yourPaid)}
              </strong>
            </p>

            <p>
              Remaining:{" "}
              <strong>
                {formatMoney(yourRemaining)}
              </strong>
            </p>

            <p>
              Share:{" "}
              <strong>
                {settings.youSplit}%
              </strong>
            </p>

          </div>

          {/* BRO */}

          <div className="card">

            <h3>👤 Bro</h3>

            <p>
              Loan responsibility
            </p>

            <h2>
              {formatMoney(broResponsibility)}
            </h2>

            <p>
              Paid:{" "}
              <strong>
                {formatMoney(broPaid)}
              </strong>
            </p>

            <p>
              Remaining:{" "}
              <strong>
                {formatMoney(broRemaining)}
              </strong>
            </p>

            <p>
              Share:{" "}
              <strong>
                {settings.broSplit}%
              </strong>
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          LOAN HISTORY
      ================================================= */}

      <section
        className="card"
        style={{ marginTop: "20px" }}
      >

        <h2>📋 Loan History</h2>

        <p>
          Loan transactions recorded in Joint Invest.
        </p>

        <div
          style={{
            overflowX: "auto",
            marginTop: "20px",
          }}
        >

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>

            </thead>

            <tbody>

              {records
                .filter(
                  (record) =>
                    record.type ===
                      "Loan Received" ||
                    record.type ===
                      "Loan Payment"
                )
                .sort(
                  (a, b) =>
                    new Date(b.date).getTime() -
                    new Date(a.date).getTime()
                )
                .map((record) => (

                  <tr key={record.id}>

                    <td>
                      {record.date}
                    </td>

                    <td>
                      {record.type}
                    </td>

                    <td>
                      {record.description}
                    </td>

                    <td>
                      {formatMoney(
                        record.amount
                      )}
                    </td>

                  </tr>

                ))}

            </tbody>

          </table>

        </div>

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer
        style={{
          marginTop: "30px",
          textAlign: "center",
        }}
      >
        <p>
          Umoja United SACCO • Joint Invest
        </p>
      </footer>

    </main>
  );
}

export default SACCOLoan;