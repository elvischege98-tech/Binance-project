import { useEffect, useState } from "react";

import {
  getRecords,
  saveRecords,
  type InvestmentRecord,
  type RecordType,
  type RecordCategory,
  type TransactionDirection,
} from "../data/investmentData";

function Records() {
  const [records, setRecords] =
    useState<InvestmentRecord[]>(
      getRecords()
    );

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

  const [direction, setDirection] =
    useState<TransactionDirection>(
      "Credit"
    );

  const [type, setType] =
    useState<RecordType>(
      "Contribution"
    );

  const [category, setCategory] =
    useState<RecordCategory>(
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

  const totalCredits =
    records
      .filter(
        (record) =>
          record.direction === "Credit"
      )
      .reduce(
        (total, record) =>
          total + record.amount,
        0
      );

  const totalDebits =
    records
      .filter(
        (record) =>
          record.direction === "Debit"
      )
      .reduce(
        (total, record) =>
          total + record.amount,
        0
      );

  const balance =
    totalCredits - totalDebits;

  // =====================================================
  // FORMAT MONEY
  // =====================================================

  const formatMoney = (
    amount: number
  ) => {
    return `KES ${amount.toLocaleString()}`;
  };

  // =====================================================
  // CHANGE DIRECTION
  // =====================================================

  const handleDirectionChange = (
    value: TransactionDirection
  ) => {
    setDirection(value);

    if (value === "Credit") {
      setType("Contribution");
      setCategory("Contribution");
    } else {
      setType("Personal Use");
      setCategory("Personal");
    }
  };

  // =====================================================
  // CHANGE TYPE
  // =====================================================

  const handleTypeChange = (
    value: RecordType
  ) => {
    setType(value);

    if (
      value === "Contribution"
    ) {
      setCategory("Contribution");
      setDirection("Credit");
    }

    else if (
      value === "Profit"
    ) {
      setCategory("Profit");
      setDirection("Credit");
    }

    else if (
      value === "Loan Received"
    ) {
      setCategory("SACCO Loan");
      setDirection("Credit");
    }

    else if (
      value === "Money Returned"
    ) {
      setCategory("Money Lent");
      setDirection("Credit");
    }

    else if (
      value === "Purchase" ||
      value === "Reinvestment"
    ) {
      setCategory("Investment");
      setDirection("Debit");
    }

    else if (
      value === "Loan Payment"
    ) {
      setCategory("SACCO Loan");
      setDirection("Debit");
    }

    else if (
      value === "Loan to Someone"
    ) {
      setCategory("Money Lent");
      setDirection("Debit");
    }

    else if (
      value === "Personal Use"
    ) {
      setCategory("Personal");
      setDirection("Debit");
    }

    else if (
      value === "Withdrawal"
    ) {
      setCategory("Withdrawal");
      setDirection("Debit");
    }

    else {
      setCategory("Other");
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setDate(
      new Date()
        .toISOString()
        .split("T")[0]
    );

    setPerson("Joint");
    setDirection("Credit");
    setType("Contribution");
    setCategory("Contribution");
    setDescription("");
    setAmount("");
    setEditingId(null);
    setShowForm(false);
  };

  // =====================================================
  // SAVE
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

    const newRecord: InvestmentRecord = {
      id:
        editingId !== null
          ? editingId
          : Date.now(),

      date,

      person,

      type,

      direction,

      category,

      description,

      amount: Number(amount),
    };

    let updatedRecords: InvestmentRecord[];

    if (editingId !== null) {
      updatedRecords =
        records.map((record) =>
          record.id === editingId
            ? newRecord
            : record
        );
    } else {
      updatedRecords = [
        ...records,
        newRecord,
      ];
    }

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
    setDirection(record.direction);
    setType(record.type);
    setCategory(record.category);
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
        "Are you sure you want to delete this transaction?"
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

  // =====================================================
  // CREDIT OPTIONS
  // =====================================================

  const creditTypes: RecordType[] = [
    "Contribution",
    "Profit",
    "Loan Received",
    "Money Returned",
    "Other Income",
  ];

  // =====================================================
  // DEBIT OPTIONS
  // =====================================================

  const debitTypes: RecordType[] = [
    "Purchase",
    "Loan Payment",
    "Reinvestment",
    "Loan to Someone",
    "Personal Use",
    "Withdrawal",
    "Other Expense",
  ];

  const availableTypes =
    direction === "Credit"
      ? creditTypes
      : debitTypes;

  return (
    <main className="dashboard">

      {/* HEADER */}

      <header className="dashboard-header">

        <div>
          <h1>🧾 Records</h1>

          <p>
            Track every credit and debit in
            your joint investment.
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
            : "+ Add Transaction"}
        </button>

      </header>

      {/* SUMMARY */}

      <section className="summary-cards">

        <div className="card">

          <span>
            Total Credits
          </span>

          <h2>
            {formatMoney(totalCredits)}
          </h2>

          <p>
            Money coming in
          </p>

        </div>

        <div className="card">

          <span>
            Total Debits
          </span>

          <h2>
            {formatMoney(totalDebits)}
          </h2>

          <p>
            Money going out
          </p>

        </div>

        <div className="card">

          <span>
            Current Balance
          </span>

          <h2>
            {formatMoney(balance)}
          </h2>

          <p>
            Credits minus debits
          </p>

        </div>

        <div className="card">

          <span>
            Transactions
          </span>

          <h2>
            {records.length}
          </h2>

          <p>
            Total records
          </p>

        </div>

      </section>

      {/* ADD FORM */}

      {showForm && (
        <section
          className="card"
          style={{
            marginTop: "20px",
          }}
        >

          <h2>
            {editingId !== null
              ? "✏️ Edit Transaction"
              : "➕ Add Transaction"}
          </h2>

          <p>
            Record exactly where the money
            came from or where it went.
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
              <label>
                Date
              </label>

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
              <label>
                Person
              </label>

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

            {/* CREDIT / DEBIT */}

            <div>

              <label>
                Transaction
              </label>

              <select
                value={direction}
                onChange={(e) =>
                  handleDirectionChange(
                    e.target.value as
                      TransactionDirection
                  )
                }
              >

                <option value="Credit">
                  💰 Credit — Money In
                </option>

                <option value="Debit">
                  💸 Debit — Money Out
                </option>

              </select>

            </div>

            {/* TYPE */}

            <div>

              <label>
                Category / Type
              </label>

              <select
                value={type}
                onChange={(e) =>
                  handleTypeChange(
                    e.target.value as RecordType
                  )
                }
              >

                {availableTypes.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* DESCRIPTION */}

            <div>

              <label>
                Description
              </label>

              <input
                type="text"
                placeholder="e.g. Lent money to John"
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

          {/* INFORMATION */}

          {type ===
            "Loan Received" && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background:
                  "#f5f7fa",
              }}
            >
              🏦 <strong>SACCO Loan</strong>

              <p>
                Enter the exact amount
                received from Umoja United
                SACCO.
              </p>
            </div>
          )}

          {type ===
            "Loan to Someone" && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background:
                  "#f5f7fa",
              }}
            >
              🤝 <strong>Money Lent</strong>

              <p>
                This records money that
                you expect someone to return.
              </p>
            </div>
          )}

          {type ===
            "Personal Use" && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background:
                  "#f5f7fa",
              }}
            >
              👤 <strong>Personal Use</strong>

              <p>
                This records money used
                for personal purposes.
              </p>
            </div>
          )}

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
              }}
            >
              {editingId !== null
                ? "Update Transaction"
                : "Save Transaction"}
            </button>

            <button
              onClick={resetForm}
              style={{
                padding:
                  "12px 20px",
              }}
            >
              Cancel
            </button>

          </div>

        </section>
      )}

      {/* TRANSACTION TABLE */}

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
          This ledger is the source of
          truth for the rest of the app.
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

                <th>
                  Transaction
                </th>

                <th>
                  Person
                </th>

                <th>
                  Category
                </th>

                <th>
                  Description
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Actions
                </th>

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

                  <tr
                    key={record.id}
                  >

                    <td>
                      {record.date}
                    </td>

                    <td>
                      {record.direction ===
                      "Credit"
                        ? "💰 Credit"
                        : "💸 Debit"}
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
                      {record.direction ===
                      "Credit"
                        ? "+"
                        : "-"}
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