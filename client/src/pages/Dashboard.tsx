import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api/axios";
import type { Lead } from "../types/lead";

// Custom Lucide-like lightweight SVG Icons
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
  </svg>
);

const LeadsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 0144 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FIXED FETCH LEADS
  const fetchLeads = async () => {
  try {
    setLoading(true);

    const res = await API.get("/leads");

    console.log("RAW RESPONSE:", res.data);

    // ✅ FIX: handle all possible backend response formats safely
    const leadsData =
      res.data?.data?.leads ||
      res.data?.leads ||
      res.data ||
      [];

    // ensure it's always an array
    setLeads(Array.isArray(leadsData) ? leadsData : []);

  } catch (error) {
    console.log("FETCH LEADS ERROR:", error);
    setLeads([]); // prevent UI crash
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLeads();
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status?.toLowerCase() === "new").length;
  const qualifiedLeads = leads.filter((l) => l.status?.toLowerCase() === "qualified").length;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#111115] text-white font-sans">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1b1b22] border-r border-[#262630] flex flex-col justify-between p-5 shrink-0">

        <div>
          <div className="mb-8 px-2">
            <h1 className="text-xl font-bold text-[#ec4899] tracking-wide">
              Smart Leads
            </h1>
            <p className="text-xs text-gray-400">CRM Dashboard</p>
          </div>

          <nav className="space-y-2">

            <button
              onClick={() => navigate("/dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/dashboard")
                  ? "bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/20"
                  : "text-gray-400 hover:bg-[#25252e] hover:text-white"
              }`}
            >
              <DashboardIcon />
              Dashboard
            </button>

            <button
              onClick={() => navigate("/leads")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/leads")
                  ? "bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/20"
                  : "text-gray-400 hover:bg-[#25252e] hover:text-white"
              }`}
            >
              <LeadsIcon />
              Leads
            </button>

            <button
              onClick={() => navigate("/analytics")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive("/analytics")
                  ? "bg-[#ec4899] text-white shadow-lg shadow-[#ec4899]/20"
                  : "text-gray-400 hover:bg-[#25252e] hover:text-white"
              }`}
            >
              <AnalyticsIcon />
              Analytics
            </button>

          </nav>
        </div>

        {/* FOOTER */}
        <div className="space-y-3">

          <div className="bg-[#25252e] p-3 rounded-xl border border-[#2d2d38]">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
              Logged in as
            </p>
            <p className="text-sm font-medium text-gray-200 mt-0.5">
              {JSON.parse(localStorage.getItem("user") || "{}")?.role === "admin"
                ? "Admin"
                : "Sales"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-[#d94e4e] hover:bg-[#c23b3b] text-white px-4 py-3 rounded-xl text-sm font-medium transition"
          >
            <LogoutIcon />
            Logout
          </button>

        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8 overflow-y-auto">

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#f25c5c]">
            Dashboard Overview
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Track your leads performance in real time ✏️
          </p>
        </div>

        {loading ? (
          <div className="text-gray-400 text-sm">
            Loading workspace metrics...
          </div>
        ) : (
          <div className="space-y-8">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div className="bg-[#0091ff] p-5 rounded-2xl">
                <p className="text-xs uppercase">Total Leads</p>
                <p className="text-4xl font-bold">{totalLeads}</p>
              </div>

              <div className="bg-[#a15eff] p-5 rounded-2xl">
                <p className="text-xs uppercase">New Leads</p>
                <p className="text-4xl font-bold">{newLeads}</p>
              </div>

              <div className="bg-[#00ca51] p-5 rounded-2xl">
                <p className="text-xs uppercase">Qualified</p>
                <p className="text-4xl font-bold">{qualifiedLeads}</p>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;