import { useEffect, useState } from "react";

import {
  getRecords,
  saveRecords,
  type InvestmentRecord,
  type RecordType,
} from "../data/investmentData";

function Records() {
  const [records, setRecords] =
    useState<InvestmentRecord[]>(getRecords());

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [date, setDate] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  const [person, setPerson] =
    useState<"You" | "Bro" | "Joint">(
      "Joint"
    );

  const [type, setType] =
    useState<RecordType>(
      "Contribution"
    );

  const [description, setDescription] =
    useState("");

  const [amount, setAmount] =
    useState("");

  // =====================================================
  // REFRESH
  // =====================================================

  useEffect(() => {
    const refresh = () => {
      setRecords(getRecords());
    };

    window.addEventListener(
      "jointInvestRecordsUpdated",
      refresh
    );

    return () => {
      window.removeEventListener(
        "jointInvestRecordsUpdated",
        refresh
      );
    };
  }, []);

  // =====================================================
  // SUMMARY
  // =====================================================

  const totalContributions =
    records
      .filter(
        (r) => r.type === "Contribution"
      )
      .reduce(
        (total, r) => total + r.amount,
        0
      );

  const totalPurchases =
    records
      .filter(
        (r) => r.type === "Purchase"
      )
      .reduce(
        (total, r) => total + r.amount,
        0
      );

  const totalProfit =
    records
      .filter(
        (r) => r.type === "Profit"
      )
      .reduce(
        (total, r) => total + r.amount,
        0
      );

  const totalLoan =
    records
      .filter(
        (r) => r.type === "Loan Received"
      )
      .reduce(
        (total, r) => total + r.amount,
        0
      );

  const totalLoanPayments =
    records
      .filter(
        (r) => r.type === "Loan Payment"
      )
      .reduce(
        (total, r) => total + r.amount,
        0
      );

  const remainingLoan =
    Math.max(
      totalLoan -
        totalLoanPayments,
      0
    );

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatMoney = (
    amount: number
  ) => {
    return `KES ${amount.toLocaleString()}`;
  };

  // =====================================================
  // RESET FORM
  // =====================================================

  const resetForm = () => {
    setDate(
      new Date()
        .toISOString()
        .split("T")[0]
    );

    setPerson("Joint");
    setType("Contribution");
    setDescription("");
    setAmount("");
    setEditingId(null);
    setShowForm(false);
  };

  // =====================================================
  // ADD / UPDATE RECORD
  // =====================================================

  const handleSave = () => {
    if (
      !amount ||
      Number(amount) <= 0
    ) {
      alert(
        "Please enter a valid amount."
      );
      return;
    }

    if (!description.trim()) {
      alert(
        "Please enter a description."
      );
      return;
    }

    // UPDATE EXISTING RECORD
    if (editingId !== null) {
      const updatedRecords =
        records.map((record) =>
          record.id === editingId
            ? {
                ...record,
                date,
                person,
                type,
                description,
                amount: Number(amount),
              }
            : record
        );

      saveRecords(updatedRecords);
      setRecords(updatedRecords);
      resetForm();

      return;
    }

    // ADD NEW RECORD
    const newRecord: InvestmentRecord = {
      id: Date.now(),
      date,
      person,
      type,
      description,
      amount: Number(amount),
    };

    const updatedRecords = [
      ...records,
      newRecord,
    ];

    saveRecords(updatedRecords);
    setRecords(updatedRecords);
    resetForm();
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (
    record: InvestmentRecord
  ) => {
    setEditingId(record.id);

    setDate(record.date);
    setPerson(record.person);
    setType(record.type);
    setDescription(
      record.description
    );
    setAmount(
      record.amount.toString()
    );

    setShowForm(true);
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this record?"
      );

    if (!confirmed) {
      return;
    }

    const updatedRecords =
      records.filter(
        (record) =>
          record.id !== id
      );

    saveRecords(updatedRecords);
    setRecords(updatedRecords);
  };

  return (
    <main className="dashboard">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="dashboard-header">

        <div>
          <h1>🧾 Records</h1>

          <p>
            This is the source of truth
            for your Joint Invest account.
          </p>
        </div>

        <button
          className="profile-button"
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
        >
          {showForm
            ? "✕ Close"
            : "+ Add Record"}
        </button>

      </header>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <section className="summary-cards">

        <div className="card">
          <h3>Total Records</h3>
          <h2>{records.length}</h2>
          <p>All transactions</p>
        </div>

        <div className="card">
          <h3>Total Invested</h3>
          <h2>
            {formatMoney(
              totalContributions
            )}
          </h2>
          <p>Member contributions</p>
        </div>

        <div className="card">
          <h3>Total Profit</h3>
          <h2>
            {formatMoney(
              totalProfit
            )}
          </h2>
          <p>Recorded profit</p>
        </div>

        <div className="card">
          <h3>Loan Remaining</h3>
          <h2>
            {formatMoney(
              remainingLoan
            )}
          </h2>
          <p>
            Loan:{" "}
            {formatMoney(totalLoan)}
          </p>
        </div>

      </section>

      {/* =================================================
          FORM
      ================================================= */}

      {showForm && (
        <section
          className="card"
          style={{
            marginTop: "20px",
          }}
        >

          <h2>
            {editingId !== null
              ? "✏️ Edit Record"
              : "➕ Add Record"}
          </h2>

          <p>
            {editingId !== null
              ? "Change the details below and save your changes."
              : "Enter your transaction details below."}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "16px",
              marginTop: "20px",
            }}
          >

            {/* DATE */}

            <div>
              <label>Date</label>

              <input
                type="date"
                value={date}
                onChange={(e) =>
                  setDate(
                    e.target.value
                  )
                }
              />
            </div>

            {/* PERSON */}

            <div>
              <label>Person</label>

              <select
                value={person}
                onChange={(e) =>
                  setPerson(
                    e.target.value as
                      | "You"
                      | "Bro"
                      | "Joint"
                  )
                }
              >
                <option value="Joint">
                  Joint
                </option>

                <option value="You">
                  You
                </option>

                <option value="Bro">
                  Bro
                </option>
              </select>
            </div>

            {/* TYPE */}

            <div>
              <label>
                Transaction Type
              </label>

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

                <option value="Loan Received">
                  Loan Received
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

            {/* DESCRIPTION */}

            <div>
              <label>
                Description
              </label>

              <input
                type="text"
                placeholder={
                  type === "Loan Received"
                    ? "e.g. Umoja United SACCO Loan"
                    : "Enter description"
                }
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />
            </div>

            {/* AMOUNT */}

            <div>
              <label>
                Amount (KES)
              </label>

              <input
                type="number"
                min="0"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) =>
                  setAmount(
                    e.target.value
                  )
                }
              />
            </div>

          </div>

          {/* LOAN INFO */}

          {type ===
            "Loan Received" && (
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                borderRadius: "10px",
                background:
                  "#f5f7fa",
              }}
            >
              <strong>
                🏦 SACCO Loan
              </strong>

              <p>
                Enter the exact amount
                you received.
              </p>

              <p>
                Example:{" "}
                <strong>
                  150000
                </strong>{" "}
                = KES 150,000
              </p>

              <p>
                You can edit this amount
                later from the Records
                page.
              </p>
            </div>
          )}

          {/* BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px",
            }}
          >

            <button
              onClick={handleSave}
              style={{
                padding:
                  "12px 20px",
                cursor: "pointer",
              }}
            >
              {editingId !== null
                ? "Update Record"
                : "Save Record"}
            </button>

            <button
              onClick={resetForm}
              style={{
                padding:
                  "12px 20px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

          </div>

        </section>
      )}

      {/* =================================================
          TABLE
      ================================================= */}

      <section
        className="card"
        style={{
          marginTop: "20px",
        }}
      >

        <h2>
          Transaction History
        </h2>

        <p>
          All figures on the other
          pages are calculated from
          these records.
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
              borderCollapse:
                "collapse",
            }}
          >

            <thead>
              <tr>
                <th>Date</th>
                <th>Person</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {[...records]
                .sort(
                  (a, b) =>
                    new Date(
                      b.date
                    ).getTime() -
                    new Date(
                      a.date
                    ).getTime()
                )
                .map((record) => (

                  <tr key={record.id}>

                    <td>
                      {record.date}
                    </td>

                    <td>
                      {record.person}
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

                    <td>

                      <button
                        onClick={() =>
                          handleEdit(
                            record
                          )
                        }
                        style={{
                          marginRight:
                            "8px",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(
                            record.id
                          )
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

      </section>

    </main>
  );
}

export default Records;