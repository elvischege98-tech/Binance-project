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
  reinvestment: 60,
  takeHome: 40,
  youSplit: 50,
  broSplit: 50,
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
    return JSON.parse(saved);
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