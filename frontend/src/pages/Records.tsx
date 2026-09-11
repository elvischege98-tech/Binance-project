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

const defaultRecords: InvestmentRecord[] = [
  {
    id: 1,
    date: "2026-08-25",
    person: "You",
    type: "Contribution",
    description: "Initial investment contribution",
    amount: 120000,
  },
  {
    id: 2,
    date: "2026-08-25",
    person: "Bro",
    type: "Contribution",
    description: "Initial investment contribution",
    amount: 80000,
  },
  {
    id: 3,
    date: "2026-08-25",
    person: "Joint",
    type: "Purchase",
    description: "BTC purchase",
    amount: 200000,
  },
  {
    id: 4,
    date: "2026-08-30",
    person: "Joint",
    type: "Profit",
    description: "Monthly investment profit",
    amount: 20000,
  },
  {
    id: 5,
    date: "2026-08-30",
    person: "Joint",
    type: "Loan Payment",
    description: "Umoja United SACCO",
    amount: 7000,
  },
  {
    id: 6,
    date: "2026-08-30",
    person: "Joint",
    type: "Reinvestment",
    description: "Added back to investment",
    amount: 7800,
  },
];

function Records() {
  const [showForm, setShowForm] = useState(false);

  // -----------------------------
  // LOAD RECORDS
  // -----------------------------

  const [records, setRecords] = useState<InvestmentRecord[]>(() => {
    const savedRecords = localStorage.getItem(
      "jointInvestRecords"
    );

    if (savedRecords) {
      return JSON.parse(savedRecords);
    }

    return defaultRecords;
  });

  // -----------------------------
  // FORM STATE
  // -----------------------------

  const [date, setDate] = useState("");
  const [person, setPerson] = useState("You");

  const [type, setType] =
    useState<RecordType>("Contribution");

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  // -----------------------------
  // SAVE RECORDS AUTOMATICALLY
  // -----------------------------

  useEffect(() => {
    localStorage.setItem(
      "jointInvestRecords",
      JSON.stringify(records)
    );
  }, [records]);

  // -----------------------------
  // ADD RECORD
  // -----------------------------

  function addRecord() {
    const numericAmount = Number(amount);

    if (!date || !description || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    if (numericAmount <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    const newRecord: InvestmentRecord = {
      id: Date.now(),
      date,
      person,
      type,
      description,
      amount: numericAmount,
    };

    setRecords((currentRecords) => [
      newRecord,
      ...currentRecords,
    ]);

    // Clear form
    setDate("");
    setPerson("You");
    setType("Contribution");
    setDescription("");
    setAmount("");

    setShowForm(false);
  }

  // -----------------------------
  // DELETE RECORD
  // -----------------------------

  function deleteRecord(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmed) {
      return;
    }

    setRecords((currentRecords) =>
      currentRecords.filter(
        (record) => record.id !== id
      )
    );
  }

  // -----------------------------
  // FORMAT DATE
  // -----------------------------

  function formatDate(dateString: string) {
    const dateObject = new Date(
      dateString + "T00:00:00"
    );

    return dateObject.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  // -----------------------------
  // OPEN FORM
  // -----------------------------

  function openForm() {
    if (!showForm) {
      const today = new Date()
        .toISOString()
        .split("T")[0];

      setDate(today);
    }

    setShowForm(!showForm);
  }

  // -----------------------------
  // SUMMARY
  // -----------------------------

  const totalRecords = records.length;

  const totalContributions = records
    .filter((record) => record.type === "Contribution")
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  const totalProfit = records
    .filter((record) => record.type === "Profit")
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  const totalLoanPayments = records
    .filter((record) => record.type === "Loan Payment")
    .reduce(
      (total, record) => total + record.amount,
      0
    );

  return (
    <main className="dashboard">

      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <header className="dashboard-header">

        <div>
          <h1>🧾 Records</h1>

          <p>
            Complete history of our joint investment activity.
          </p>
        </div>

        <button
          className="profile-button"
          onClick={openForm}
        >
          {showForm ? "✕ Close" : "+ Add Record"}
        </button>

      </header>


      {/* ============================= */}
      {/* ADD RECORD FORM */}
      {/* ============================= */}

      {showForm && (
        <section className="record-form">

          <h2>➕ Add New Record</h2>

          <div className="form-grid">

            {/* DATE */}

            <div className="form-group">

              <label>Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />

            </div>


            {/* PERSON */}

            <div className="form-group">

              <label>Person</label>

              <select
                value={person}
                onChange={(e) =>
                  setPerson(e.target.value)
                }
              >
                <option value="You">
                  👤 You
                </option>

                <option value="Bro">
                  👨‍🦱 Bro
                </option>

                <option value="Joint">
                  🤝 Joint
                </option>
              </select>

            </div>


            {/* TYPE */}

            <div className="form-group">

              <label>Type</label>

              <select
                value={type}
                onChange={(e) =>
                  setType(
                    e.target.value as RecordType
                  )
                }
              >
                <option value="Contribution">
                  Contribution
                </option>

                <option value="Purchase">
                  Purchase
                </option>

                <option value="Profit">
                  Profit
                </option>

                <option value="Loan Payment">
                  Loan Payment
                </option>

                <option value="Reinvestment">
                  Reinvestment
                </option>

                <option value="Withdrawal">
                  Withdrawal
                </option>

              </select>

            </div>


            {/* AMOUNT */}

            <div className="form-group">

              <label>Amount (KES)</label>

              <input
                type="number"
                placeholder="e.g. 10000"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value)
                }
                min="1"
              />

            </div>


            {/* DESCRIPTION */}

            <div className="form-group full-width">

              <label>Description</label>

              <input
                type="text"
                placeholder="What was this transaction for?"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

            </div>

          </div>


          <button
            className="add-record-button"
            onClick={addRecord}
          >
            💾 Save Record
          </button>

        </section>
      )}


      {/* ============================= */}
      {/* SUMMARY CARDS */}
      {/* ============================= */}

      <section className="summary-cards">

        <div className="card">

          <span>Total Records</span>

          <h2>
            {totalRecords}
          </h2>

        </div>


        <div className="card">

          <span>Total Contributions</span>

          <h2>
            KES {totalContributions.toLocaleString()}
          </h2>

        </div>


        <div className="card">

          <span>Total Profit</span>

          <h2>
            KES {totalProfit.toLocaleString()}
          </h2>

        </div>


        <div className="card">

          <span>Loan Payments</span>

          <h2>
            KES {totalLoanPayments.toLocaleString()}
          </h2>

        </div>

      </section>


      {/* ============================= */}
      {/* TRANSACTION HISTORY */}
      {/* ============================= */}

      <section className="records-section">

        <h2>Transaction History</h2>

        <div className="records-table-container">

          <table className="records-table">

            <thead>

              <tr>
                <th>Date</th>
                <th>Person</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              {records.map((record) => (

                <tr key={record.id}>

                  <td>
                    {formatDate(record.date)}
                  </td>


                  <td>

                    {record.person === "You" &&
                      "👤 "}

                    {record.person === "Bro" &&
                      "👨‍🦱 "}

                    {record.person === "Joint" &&
                      "🤝 "}

                    {record.person}

                  </td>


                  <td>
                    {record.type}
                  </td>


                  <td>
                    {record.description}
                  </td>


                  <td
                    className={
                      record.type === "Profit"
                        ? "profit"
                        : ""
                    }
                  >

                    {record.type === "Profit"
                      ? "+"
                      : ""}

                    KES{" "}
                    {record.amount.toLocaleString()}

                  </td>


                  <td>

                    <button
                      className="delete-button"
                      onClick={() =>
                        deleteRecord(record.id)
                      }
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {records.length === 0 && (
          <p className="empty-records">
            No records available.
          </p>
        )}

      </section>

    </main>
  );
}

export default Records;