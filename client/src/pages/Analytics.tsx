import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../api/axios";
import type { Lead } from "../types/lead";
import { BarChart3, Users, UserPlus, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#8b5cf6", "#ec4899", "#3b82f6", "#22c55e", "#f59e0b"];

const Analytics = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: 1,
          limit: 1000,
          sort: "latest",
        },
      });

      console.log("ANALYTICS RESPONSE:", res.data);

      const leadsData = Array.isArray(res.data?.data?.leads)
        ? res.data.data.leads
        : Array.isArray(res.data?.leads)
        ? res.data.leads
        : Array.isArray(res.data)
        ? res.data
        : [];

      setLeads(leadsData);
    } catch (error) {
      console.log("ANALYTICS FETCH ERROR:", error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const monthlyData = useMemo(() => {
    const months: Record<string, number> = {};

    leads.forEach((lead) => {
      const rawDate = lead.createdAt;
      const date = rawDate ? new Date(rawDate) : new Date();

      const month = date.toLocaleString("en-US", { month: "short" });

      months[month] = (months[month] || 0) + 1;
    });

    return Object.entries(months).map(([month, count]) => ({
      month,
      leads: count,
    }));
  }, [leads]);

  const sourceData = useMemo(() => {
    const sources: Record<string, number> = {};

    leads.forEach((lead) => {
      const source = lead.source || "Unknown";
      sources[source] = (sources[source] || 0) + 1;
    });

    return Object.entries(sources).map(([name, value]) => ({
      name,
      value,
    }));
  }, [leads]);

  const totalLeads = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status?.toLowerCase() === "new"
  ).length;

  const convertedLeads = leads.filter(
    (lead) =>
      lead.status?.toLowerCase() === "qualified" ||
      lead.status?.toLowerCase() === "converted"
  ).length;

  const conversionRate =
    totalLeads > 0 ? Math.round((convertedLeads / totalLeads) * 100) : 0;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#020617] text-white p-8">
          Loading analytics...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-[#050816] via-[#0f172a] to-[#1e1b4b] text-white p-8">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>

            <p className="text-gray-300 mt-3 text-lg">
              Monitor real lead growth and performance 📊
            </p>
          </div>

          <div className="bg-white/10 border border-white/10 p-5 rounded-2xl">
            <BarChart3 size={42} className="text-pink-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card title="Total Leads" value={totalLeads} icon={<Users size={42} />} />
          <Card title="New Leads" value={newLeads} icon={<UserPlus size={42} />} />
          <Card title="Conversion Rate" value={`${conversionRate}%`} icon={<TrendingUp size={42} />} />
        </div>

        {leads.length === 0 ? (
          <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-gray-300 text-lg">
            No analytics data available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-pink-400">
                Monthly Leads
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#ccc" />
                  <YAxis stroke="#ccc" allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="leads" fill="#8b5cf6" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6 text-pink-400">
                Lead Sources
              </h2>

              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={sourceData} dataKey="value" nameKey="name" outerRadius={100} label>
                    {sourceData.map((entry, index) => (
                      <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

type CardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
};

const Card = ({ title, value, icon }: CardProps) => {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-300 text-lg">{title}</p>
          <h2 className="text-5xl font-bold mt-3">{value}</h2>
        </div>

        <div className="bg-purple-500/20 p-5 rounded-2xl text-purple-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default Analytics;