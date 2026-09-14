export type RecordType =
  | "Contribution"
  | "Purchase"
  | "Profit"
  | "Loan Payment"
  | "Reinvestment"
  | "Withdrawal";

export type InvestmentRecord = {
  id: number;
  date: string;
  person: "You" | "Bro" | "Joint";
  type: RecordType;
  description: string;
  amount: number;
};

export type JointInvestSettings = {
  loanRepayment: number;
  reinvestment: number;
  takeHome: number;
  youSplit: number;
  broSplit: number;
  initialLoan: number;
};

// ==========================================
// DEFAULT INVESTMENT RECORDS
// ==========================================

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

// ==========================================
// DEFAULT SETTINGS
// ==========================================

export const defaultSettings: JointInvestSettings = {
  loanRepayment: 7000,
  reinvestment: 50,
  takeHome: 50,
  youSplit: 50,
  broSplit: 50,
  initialLoan: 150000,
};

// ==========================================
// RECORD STORAGE
// ==========================================

export function getRecords(): InvestmentRecord[] {
  const saved = localStorage.getItem("jointInvestRecords");

  if (!saved) {
    return defaultRecords;
  }

  try {
    return JSON.parse(saved);
  } catch {
    return defaultRecords;
  }
}

export function saveRecords(records: InvestmentRecord[]) {
  localStorage.setItem(
    "jointInvestRecords",
    JSON.stringify(records)
  );
}

// ==========================================
// SETTINGS STORAGE
// ==========================================

export function getSettings(): JointInvestSettings {
  const saved = localStorage.getItem("jointInvestSettings");

  if (!saved) {
    return defaultSettings;
  }

  try {
    return {
      ...defaultSettings,
      ...JSON.parse(saved),
    };
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: JointInvestSettings) {
  localStorage.setItem(
    "jointInvestSettings",
    JSON.stringify(settings)
  );
}

// ==========================================
// GENERAL CALCULATIONS
// ==========================================

export function getTotalContributions(
  records: InvestmentRecord[]
): number {
  return records
    .filter((record) => record.type === "Contribution")
    .reduce((total, record) => total + record.amount, 0);
}

// ==========================================
// MEMBER CONTRIBUTIONS
// ==========================================

export function getMemberContribution(
  records: InvestmentRecord[],
  person: "You" | "Bro"
): number {
  return records
    .filter(
      (record) =>
        record.type === "Contribution" &&
        record.person === person
    )
    .reduce((total, record) => total + record.amount, 0);
}

// ==========================================
// PURCHASES
// ==========================================

export function getTotalPurchases(
  records: InvestmentRecord[]
): number {
  return records
    .filter((record) => record.type === "Purchase")
    .reduce((total, record) => total + record.amount, 0);
}

// ==========================================
// PROFITS
// ==========================================

export function getTotalProfit(
  records: InvestmentRecord[]
): number {
  return records
    .filter((record) => record.type === "Profit")
    .reduce((total, record) => total + record.amount, 0);
}

// ==========================================
// LOAN PAYMENTS
// ==========================================

export function getTotalLoanPayments(
  records: InvestmentRecord[]
): number {
  return records
    .filter((record) => record.type === "Loan Payment")
    .reduce((total, record) => total + record.amount, 0);
}

// ==========================================
// LOAN BALANCE
// ==========================================

export function getRemainingLoan(
  records: InvestmentRecord[],
  settings: JointInvestSettings
): number {
  const paid = getTotalLoanPayments(records);

  return Math.max(settings.initialLoan - paid, 0);
}

// ==========================================
// REINVESTMENT
// ==========================================

export function getTotalReinvestment(
  records: InvestmentRecord[]
): number {
  return records
    .filter((record) => record.type === "Reinvestment")
    .reduce((total, record) => total + record.amount, 0);
}

// ==========================================
// WITHDRAWALS
// ==========================================

export function getTotalWithdrawals(
  records: InvestmentRecord[]
): number {
  return records
    .filter((record) => record.type === "Withdrawal")
    .reduce((total, record) => total + record.amount, 0);
}

// ==========================================
// CURRENT INVESTMENT VALUE
// ==========================================

export function getCurrentInvestmentValue(
  records: InvestmentRecord[]
): number {
  const contributions = getTotalContributions(records);
  const profits = getTotalProfit(records);
  const withdrawals = getTotalWithdrawals(records);

  return contributions + profits - withdrawals;
}

// ==========================================
// DISTRIBUTION CALCULATIONS
// ==========================================

export function getDistributableProfit(
  records: InvestmentRecord[]
): number {
  const profit = getTotalProfit(records);
  const loanPayment = getTotalLoanPayments(records);

  return Math.max(profit - loanPayment, 0);
}

export function getCalculatedReinvestment(
  records: InvestmentRecord[],
  settings: JointInvestSettings
): number {
  const distributableProfit = getDistributableProfit(records);

  return (
    distributableProfit *
    (settings.reinvestment / 100)
  );
}

export function getCalculatedTakeHome(
  records: InvestmentRecord[],
  settings: JointInvestSettings
): number {
  const distributableProfit = getDistributableProfit(records);

  return (
    distributableProfit *
    (settings.takeHome / 100)
  );
}

// ==========================================
// MEMBER PROFIT SPLIT
// ==========================================

export function getMemberProfit(
  amount: number,
  percentage: number
): number {
  return amount * (percentage / 100);
}