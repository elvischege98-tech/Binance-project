// =====================================================
// JOINT INVEST - FINANCIAL DATA
// =====================================================

export type TransactionDirection =
  | "Credit"
  | "Debit";

export type RecordType =
  | "Contribution"
  | "Purchase"
  | "Profit"
  | "Loan Received"
  | "Loan Payment"
  | "Reinvestment"
  | "Withdrawal"
  | "Loan to Someone"
  | "Money Returned"
  | "Personal Use"
  | "Other Income"
  | "Other Expense";

export type RecordCategory =
  | "Investment"
  | "SACCO Loan"
  | "Money Lent"
  | "Personal"
  | "Profit"
  | "Contribution"
  | "Withdrawal"
  | "Other";

export interface InvestmentRecord {
  id: number;
  date: string;

  person: "You" | "Bro" | "Joint";

  type: RecordType;

  direction: TransactionDirection;

  category: RecordCategory;

  description: string;

  amount: number;
}

// =====================================================
// SETTINGS
// =====================================================

export interface JointInvestSettings {
  loanRepayment: number;
  reinvestment: number;
  takeHome: number;
  youSplit: number;
  broSplit: number;
  initialLoan: number;
}

export const defaultSettings: JointInvestSettings = {
  loanRepayment: 7000,
  reinvestment: 50,
  takeHome: 50,
  youSplit: 50,
  broSplit: 50,
  initialLoan: 0,
};

// =====================================================
// DEFAULT RECORDS
// =====================================================

export const defaultRecords: InvestmentRecord[] = [
  {
    id: 1,
    date: "2026-08-25",
    person: "You",
    type: "Contribution",
    direction: "Credit",
    category: "Contribution",
    description: "Initial investment contribution",
    amount: 120000,
  },

  {
    id: 2,
    date: "2026-08-25",
    person: "Bro",
    type: "Contribution",
    direction: "Credit",
    category: "Contribution",
    description: "Initial investment contribution",
    amount: 120000,
  },

  {
    id: 3,
    date: "2026-08-25",
    person: "Joint",
    type: "Purchase",
    direction: "Debit",
    category: "Investment",
    description: "BTC purchase",
    amount: 240000,
  },

  {
    id: 4,
    date: "2026-08-30",
    person: "Joint",
    type: "Profit",
    direction: "Credit",
    category: "Profit",
    description: "Monthly investment profit",
    amount: 20000,
  },

  {
    id: 5,
    date: "2026-08-30",
    person: "Joint",
    type: "Loan Received",
    direction: "Credit",
    category: "SACCO Loan",
    description: "Umoja United SACCO Loan",
    amount: 150000,
  },

  {
    id: 6,
    date: "2026-08-30",
    person: "Joint",
    type: "Loan Payment",
    direction: "Debit",
    category: "SACCO Loan",
    description: "Monthly SACCO repayment",
    amount: 7000,
  },

  {
    id: 7,
    date: "2026-08-30",
    person: "Joint",
    type: "Reinvestment",
    direction: "Debit",
    category: "Investment",
    description: "Added back to investment",
    amount: 7800,
  },
];

// =====================================================
// STORAGE
// =====================================================

function normalizeRecord(
  record: InvestmentRecord
): InvestmentRecord {
  return {
    ...record,

    direction:
      record.direction ??
      getDirectionFromType(record.type),

    category:
      record.category ??
      getCategoryFromType(record.type),
  };
}

function getDirectionFromType(
  type: RecordType
): TransactionDirection {
  if (
    type === "Contribution" ||
    type === "Profit" ||
    type === "Loan Received" ||
    type === "Money Returned" ||
    type === "Other Income"
  ) {
    return "Credit";
  }

  return "Debit";
}

function getCategoryFromType(
  type: RecordType
): RecordCategory {
  switch (type) {
    case "Contribution":
      return "Contribution";

    case "Purchase":
    case "Reinvestment":
      return "Investment";

    case "Profit":
      return "Profit";

    case "Loan Received":
    case "Loan Payment":
      return "SACCO Loan";

    case "Loan to Someone":
      return "Money Lent";

    case "Personal Use":
      return "Personal";

    case "Withdrawal":
      return "Withdrawal";

    case "Money Returned":
      return "Money Lent";

    default:
      return "Other";
  }
}

// =====================================================
// GET RECORDS
// =====================================================

export function getRecords(): InvestmentRecord[] {
  const stored =
    localStorage.getItem("jointInvestRecords");

  if (!stored) {
    return defaultRecords;
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return defaultRecords;
    }

    return parsed.map(normalizeRecord);
  } catch {
    return defaultRecords;
  }
}

// =====================================================
// SAVE RECORDS
// =====================================================

export function saveRecords(
  records: InvestmentRecord[]
) {
  localStorage.setItem(
    "jointInvestRecords",
    JSON.stringify(records)
  );

  window.dispatchEvent(
    new Event("jointInvestRecordsUpdated")
  );
}

// =====================================================
// SETTINGS
// =====================================================

export function getSettings(): JointInvestSettings {
  const stored =
    localStorage.getItem(
      "jointInvestSettings"
    );

  if (!stored) {
    return defaultSettings;
  }

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(stored),
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(
  settings: JointInvestSettings
) {
  localStorage.setItem(
    "jointInvestSettings",
    JSON.stringify(settings)
  );

  window.dispatchEvent(
    new Event("jointInvestSettingsUpdated")
  );
}

// =====================================================
// CONTRIBUTIONS
// =====================================================

export function getTotalContributions(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Contribution"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

export function getMemberContribution(
  records: InvestmentRecord[],
  member: "You" | "Bro"
): number {
  return records
    .filter(
      (record) =>
        record.type === "Contribution" &&
        record.person === member
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// PURCHASES
// =====================================================

export function getTotalPurchases(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Purchase"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// PROFIT
// =====================================================

export function getTotalProfit(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Profit"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// LOAN RECEIVED
// =====================================================

export function getTotalLoanReceived(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Loan Received"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// LOAN PAYMENTS
// =====================================================

export function getTotalLoanPayments(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Loan Payment"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// REMAINING LOAN
// =====================================================

export function getRemainingLoan(
  records: InvestmentRecord[]
): number {
  const received =
    getTotalLoanReceived(records);

  const payments =
    getTotalLoanPayments(records);

  return Math.max(
    received - payments,
    0
  );
}

// =====================================================
// MONEY LENT
// =====================================================

export function getTotalMoneyLent(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Loan to Someone"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// MONEY RETURNED
// =====================================================

export function getTotalMoneyReturned(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Money Returned"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// OUTSTANDING MONEY LENT
// =====================================================

export function getOutstandingMoneyLent(
  records: InvestmentRecord[]
): number {
  return Math.max(
    getTotalMoneyLent(records) -
      getTotalMoneyReturned(records),
    0
  );
}

// =====================================================
// PERSONAL USE
// =====================================================

export function getTotalPersonalUse(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Personal Use"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// REINVESTMENT
// =====================================================

export function getTotalReinvestment(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Reinvestment"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// WITHDRAWALS
// =====================================================

export function getTotalWithdrawals(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.type === "Withdrawal"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// TOTAL CREDITS
// =====================================================

export function getTotalCredits(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.direction === "Credit"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// TOTAL DEBITS
// =====================================================

export function getTotalDebits(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) =>
        record.direction === "Debit"
    )
    .reduce(
      (total, record) =>
        total + record.amount,
      0
    );
}

// =====================================================
// LEDGER BALANCE
// =====================================================

export function getLedgerBalance(
  records: InvestmentRecord[]
): number {
  return (
    getTotalCredits(records) -
    getTotalDebits(records)
  );
}

// =====================================================
// INVESTMENT VALUE
// =====================================================

export function getCurrentInvestmentValue(
  records: InvestmentRecord[]
): number {
  const contributions =
    getTotalContributions(records);

  const profit =
    getTotalProfit(records);

  const withdrawals =
    getTotalWithdrawals(records);

  return (
    contributions +
    profit -
    withdrawals
  );
}

// =====================================================
// DISTRIBUTABLE PROFIT
// =====================================================

export function getDistributableProfit(
  records: InvestmentRecord[]
): number {
  const profit =
    getTotalProfit(records);

  const loanPayments =
    getTotalLoanPayments(records);

  return Math.max(
    profit - loanPayments,
    0
  );
}

// =====================================================
// CALCULATED REINVESTMENT
// =====================================================

export function getCalculatedReinvestment(
  records: InvestmentRecord[],
  settings: JointInvestSettings
): number {
  return (
    getDistributableProfit(records) *
    (settings.reinvestment / 100)
  );
}

// =====================================================
// CALCULATED TAKE HOME
// =====================================================

export function getCalculatedTakeHome(
  records: InvestmentRecord[],
  settings: JointInvestSettings
): number {
  return (
    getDistributableProfit(records) *
    (settings.takeHome / 100)
  );
}

// =====================================================
// MEMBER PROFIT
// =====================================================

export function getMemberProfit(
  amount: number,
  percentage: number
): number {
  return (
    amount *
    (percentage / 100)
  );
}