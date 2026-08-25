import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Investments from "./pages/Investments";
import Members from "./pages/Members";
import Loan from "./pages/Loan";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/members" element={<Members />} />
          <Route path="/loan" element={<Loan />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;