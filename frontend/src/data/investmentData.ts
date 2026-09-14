// =====================================================
// JOINT INVEST - INVESTMENT DATA
// =====================================================

export type RecordType =
  | "Contribution"
  | "Purchase"
  | "Profit"
  | "Loan Received"
  | "Loan Payment"
  | "Reinvestment"
  | "Withdrawal";

export interface InvestmentRecord {
  id: number;
  date: string;
  person: "You" | "Bro" | "Joint";
  type: RecordType;
  description: string;
  amount: number;
}

export interface JointInvestSettings {
  loanRepayment: number;
  reinvestment: number;
  takeHome: number;
  youSplit: number;
  broSplit: number;
  initialLoan: number;
}

// =====================================================
// DEFAULT RECORDS
// =====================================================

export const defaultRecords: InvestmentRecord[] = [
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
    amount: 120000,
  },

  {
    id: 3,
    date: "2026-08-25",
    person: "Joint",
    type: "Purchase",
    description: "BTC purchase",
    amount: 240000,
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
    type: "Loan Received",
    description: "Umoja United SACCO Loan",
    amount: 150000,
  },

  {
    id: 6,
    date: "2026-08-30",
    person: "Joint",
    type: "Loan Payment",
    description: "Monthly SACCO repayment",
    amount: 7000,
  },

  {
    id: 7,
    date: "2026-08-30",
    person: "Joint",
    type: "Reinvestment",
    description: "Added back to investment",
    amount: 7800,
  },
];

// =====================================================
// DEFAULT SETTINGS
// =====================================================

export const defaultSettings: JointInvestSettings = {
  loanRepayment: 7000,
  reinvestment: 50,
  takeHome: 50,
  youSplit: 50,
  broSplit: 50,
  initialLoan: 150000,
};

// =====================================================
// RECORD STORAGE
// =====================================================

export function getRecords(): InvestmentRecord[] {
  const stored = localStorage.getItem("jointInvestRecords");

  if (!stored) {
    return defaultRecords;
  }

  try {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      return defaultRecords;
    }

    return parsed;
  } catch {
    return defaultRecords;
  }
}

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
// SETTINGS STORAGE
// =====================================================

export function getSettings(): JointInvestSettings {
  const stored = localStorage.getItem(
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
      (record) => record.type === "Contribution"
    )
    .reduce(
      (total, record) => total + record.amount,
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
      (total, record) => total + record.amount,
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
      (record) => record.type === "Purchase"
    )
    .reduce(
      (total, record) => total + record.amount,
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
      (record) => record.type === "Profit"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );
}

// =====================================================
// LOAN
// =====================================================

export function getTotalLoanReceived(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) => record.type === "Loan Received"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );
}

export function getTotalLoanPayments(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) => record.type === "Loan Payment"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );
}

export function getRemainingLoan(
  records: InvestmentRecord[]
): number {
  const received =
    getTotalLoanReceived(records);

  const paid =
    getTotalLoanPayments(records);

  return Math.max(received - paid, 0);
}

// =====================================================
// REINVESTMENT
// =====================================================

export function getTotalReinvestment(
  records: InvestmentRecord[]
): number {
  return records
    .filter(
      (record) => record.type === "Reinvestment"
    )
    .reduce(
      (total, record) => total + record.amount,
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
      (record) => record.type === "Withdrawal"
    )
    .reduce(
      (total, record) => total + record.amount,
      0
    );
}

// =====================================================
// CURRENT INVESTMENT VALUE
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
// PROFIT DISTRIBUTION
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

export function getCalculatedReinvestment(
  records: InvestmentRecord[],
  settings: JointInvestSettings
): number {
  const profit =
    getDistributableProfit(records);

  return (
    profit *
    (settings.reinvestment / 100)
  );
}

export function getCalculatedTakeHome(
  records: InvestmentRecord[],
  settings: JointInvestSettings
): number {
  const profit =
    getDistributableProfit(records);

  return (
    profit *
    (settings.takeHome / 100)
  );
}

export function getMemberProfit(
  amount: number,
  percentage: number
): number {
  return (
    amount *
    (percentage / 100)
  );
}