import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Investments from "./pages/Investments";
import Members from "./pages/Members";
import Loan from "./pages/Loan";
import ProfitLoss from "./pages/ProfitLoss";
import Distribution from "./pages/Distribution";
import Records from "./pages/Records";
import Settings from "./pages/Settings";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { AuthProvider, useAuth } from "./context/AuthContext";

import "./App.css";

function ProtectedLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/members" element={<Members />} />
        <Route path="/loan" element={<Loan />} />
        <Route path="/profit-loss" element={<ProfitLoss />} />
        <Route path="/distribution" element={<Distribution />} />
        <Route path="/records" element={<Records />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;