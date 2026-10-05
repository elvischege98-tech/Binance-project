-- =====================================================
-- JOINT INVEST / JOINT BINANCE DATABASE
-- =====================================================

PRAGMA foreign_keys = ON;


-- =====================================================
-- MEMBERS
-- =====================================================

CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL UNIQUE,

    investment_share REAL NOT NULL DEFAULT 50,

    profit_share REAL NOT NULL DEFAULT 50,

    CHECK (investment_share >= 0 AND investment_share <= 100),

    CHECK (profit_share >= 0 AND profit_share <= 100)
);


-- =====================================================
-- INVESTMENT RECORDS
-- =====================================================

CREATE TABLE IF NOT EXISTS records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    date TEXT NOT NULL,

    member_id INTEGER NOT NULL,

    type TEXT NOT NULL,

    direction TEXT NOT NULL,

    category TEXT NOT NULL,

    description TEXT NOT NULL,

    amount REAL NOT NULL,

    FOREIGN KEY (member_id)
        REFERENCES members(id)
        ON DELETE RESTRICT,

    CHECK (amount >= 0),

    CHECK (
        direction IN ('Credit', 'Debit')
    ),

    CHECK (
        type IN (
            'Contribution',
            'Purchase',
            'Profit',
            'Loan Received',
            'Loan Payment',
            'Reinvestment',
            'Withdrawal',
            'Loan to Someone',
            'Money Returned',
            'Personal Use',
            'Other Income',
            'Other Expense'
        )
    ),

    CHECK (
        category IN (
            'Investment',
            'SACCO Loan',
            'Money Lent',
            'Personal',
            'Profit',
            'Contribution',
            'Withdrawal',
            'Other'
        )
    )
);


-- =====================================================
-- SETTINGS
-- =====================================================

CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY CHECK (id = 1),

    loan_repayment REAL NOT NULL DEFAULT 7000,

    reinvestment REAL NOT NULL DEFAULT 50,

    take_home REAL NOT NULL DEFAULT 50,

    you_split REAL NOT NULL DEFAULT 50,

    bro_split REAL NOT NULL DEFAULT 50,

    initial_loan REAL NOT NULL DEFAULT 0,

    CHECK (reinvestment >= 0 AND reinvestment <= 100),

    CHECK (take_home >= 0 AND take_home <= 100),

    CHECK (you_split >= 0 AND you_split <= 100),

    CHECK (bro_split >= 0 AND bro_split <= 100),

    CHECK (you_split + bro_split = 100)
);

-- =====================================================
-- USERS / AUTHENTICATION
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);