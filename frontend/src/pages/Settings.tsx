import { useEffect, useState } from "react";

function Settings() {
  // -----------------------------
  // SETTINGS STATE
  // -----------------------------
  const [loanRepayment, setLoanRepayment] = useState(7000);

  const [reinvestment, setReinvestment] = useState(60);
  const [takeHome, setTakeHome] = useState(40);

  const [youSplit, setYouSplit] = useState(50);
  const [broSplit, setBroSplit] = useState(50);

  const [saved, setSaved] = useState(false);

  // -----------------------------
  // LOAD SAVED SETTINGS
  // -----------------------------
  useEffect(() => {
    const savedSettings = localStorage.getItem("jointInvestSettings");

    if (savedSettings) {
      const settings = JSON.parse(savedSettings);

      setLoanRepayment(settings.loanRepayment);
      setReinvestment(settings.reinvestment);
      setTakeHome(settings.takeHome);
      setYouSplit(settings.youSplit);
      setBroSplit(settings.broSplit);
    }
  }, []);

  // -----------------------------
  // SAVE SETTINGS
  // -----------------------------
  const handleSave = () => {
    if (reinvestment + takeHome !== 100) {
      alert("Reinvestment and Take-home must add up to 100%.");
      return;
    }

    if (youSplit + broSplit !== 100) {
      alert("You and Bro's split must add up to 100%.");
      return;
    }

    if (loanRepayment < 0) {
      alert("Loan repayment cannot be negative.");
      return;
    }

    const settings = {
      loanRepayment,
      reinvestment,
      takeHome,
      youSplit,
      broSplit,
    };

    localStorage.setItem(
      "jointInvestSettings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  // -----------------------------
  // INPUT VALIDATION
  // -----------------------------
  const handlePercentageChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const number = Number(value);

    if (number >= 0 && number <= 100) {
      setter(number);
    }
  };

  return (
    <main className="dashboard">

      {/* PAGE HEADER */}
      <header className="dashboard-header">
        <div>
          <h1>⚙️ Settings</h1>
          <p>
            Manage our investment rules and account preferences.
          </p>
        </div>
      </header>

      {/* ========================= */}
      {/* PROFIT ALLOCATION */}
      {/* ========================= */}

      <section className="settings-section">
        <h2>💰 Profit Allocation Rules</h2>

        <div className="settings-card">

          {/* LOAN REPAYMENT */}
          <div className="setting-row">
            <div className="setting-info">
              <h3>🏦 Loan Repayment</h3>
              <p>
                Mandatory monthly repayment when profit reaches the target.
              </p>
            </div>

            <input
              type="number"
              value={loanRepayment}
              onChange={(e) =>
                setLoanRepayment(Number(e.target.value))
              }
              className="setting-input"
            />
          </div>

          {/* REINVESTMENT */}
          <div className="setting-row">
            <div className="setting-info">
              <h3>📈 Reinvestment</h3>
              <p>
                Percentage of remaining profit added back to the investment.
              </p>
            </div>

            <div className="input-with-symbol">
              <input
                type="number"
                min="0"
                max="100"
                value={reinvestment}
                onChange={(e) =>
                  handlePercentageChange(
                    e.target.value,
                    setReinvestment
                  )
                }
                className="setting-input"
              />
              <span>%</span>
            </div>
          </div>

          {/* TAKE HOME */}
          <div className="setting-row">
            <div className="setting-info">
              <h3>💵 Take-home</h3>
              <p>
                Percentage of remaining profit available to you and your bro.
              </p>
            </div>

            <div className="input-with-symbol">
              <input
                type="number"
                min="0"
                max="100"
                value={takeHome}
                onChange={(e) =>
                  handlePercentageChange(
                    e.target.value,
                    setTakeHome
                  )
                }
                className="setting-input"
              />
              <span>%</span>
            </div>
          </div>

          {/* TOTAL */}
          <div className="setting-total">
            <span>Total Allocation</span>

            <strong
              className={
                reinvestment + takeHome === 100
                  ? "valid-total"
                  : "invalid-total"
              }
            >
              {reinvestment + takeHome}%
            </strong>
          </div>

        </div>
      </section>

      {/* ========================= */}
      {/* LOAN SETTINGS */}
      {/* ========================= */}

      <section className="settings-section">
        <h2>🏦 Loan Settings</h2>

        <div className="settings-card">

          <div className="setting-row">
            <div className="setting-info">
              <h3>Monthly Loan Target</h3>
              <p>
                Minimum amount required for the monthly SACCO repayment.
              </p>
            </div>

            <strong>
              KES {loanRepayment.toLocaleString()}
            </strong>
          </div>

          <div className="setting-row">
            <div className="setting-info">
              <h3>Mandatory Repayment</h3>
              <p>
                Require repayment when monthly profit is at least KES{" "}
                {loanRepayment.toLocaleString()}.
              </p>
            </div>

            <strong className="active-status">
              ACTIVE
            </strong>
          </div>

        </div>
      </section>

      {/* ========================= */}
      {/* MEMBER SETTINGS */}
      {/* ========================= */}

      <section className="settings-section">
        <h2>👥 Member Settings</h2>

        <div className="settings-card">

          {/* YOU */}
          <div className="setting-row">
            <div className="setting-info">
              <h3>👤 You</h3>
              <p>
                Your share of the take-home profit.
              </p>
            </div>

            <div className="input-with-symbol">
              <input
                type="number"
                min="0"
                max="100"
                value={youSplit}
                onChange={(e) =>
                  handlePercentageChange(
                    e.target.value,
                    setYouSplit
                  )
                }
                className="setting-input"
              />
              <span>%</span>
            </div>
          </div>

          {/* BRO */}
          <div className="setting-row">
            <div className="setting-info">
              <h3>👥 Bro</h3>
              <p>
                Your bro's share of the take-home profit.
              </p>
            </div>

            <div className="input-with-symbol">
              <input
                type="number"
                min="0"
                max="100"
                value={broSplit}
                onChange={(e) =>
                  handlePercentageChange(
                    e.target.value,
                    setBroSplit
                  )
                }
                className="setting-input"
              />
              <span>%</span>
            </div>
          </div>

          {/* MEMBER TOTAL */}
          <div className="setting-total">
            <span>Total Member Split</span>

            <strong
              className={
                youSplit + broSplit === 100
                  ? "valid-total"
                  : "invalid-total"
              }
            >
              {youSplit + broSplit}%
            </strong>
          </div>

        </div>
      </section>

      {/* ========================= */}
      {/* SAVE BUTTON */}
      {/* ========================= */}

      <div className="settings-actions">

        {saved && (
          <span className="save-message">
            ✅ Settings saved successfully
          </span>
        )}

        <button
          className="save-settings-btn"
          onClick={handleSave}
        >
          💾 Save Settings
        </button>

      </div>

    </main>
  );
}

export default Settings;