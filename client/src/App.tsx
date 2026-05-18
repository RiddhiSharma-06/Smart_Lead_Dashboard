import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddLead from "./pages/AddLead";
import Analytics from "./pages/Analytics";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-lead" element={<AddLead />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/leads" element={<Leads />} />
    </Routes>
  );
}