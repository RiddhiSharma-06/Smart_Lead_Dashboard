import { useEffect, useState } from "react";
import API from "../api/axios";
import type { Lead } from "../types/lead";

const LeadsPage = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    source: "",
    status: "New",
  });

  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await API.get("/leads", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          limit: 10,
          search,
          status,
          source,
          sort,
        },
      });

      console.log("API RESPONSE:", res.data);

      const leadsData = Array.isArray(res.data?.data?.leads)
  	? res.data.data.leads
  	: Array.isArray(res.data?.leads)
  	? res.data.leads
  	: Array.isArray(res.data)
  	? res.data
  	: [];

      setLeads(leadsData);
      setTotalPages(res.data?.data?.totalPages || res.data?.pagination?.totalPages || 1);
    } catch (err) {
      console.log("FETCH ERROR:", err);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status, source, sort]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addLead = async () => {
    try {
      await API.post("/leads", form);
      setForm({ name: "", email: "", source: "", status: "New" });
      setShowAddModal(false);
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteLead = async (id: string) => {
    try {
      await API.delete(`/leads/${id}`);
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const updateLead = async () => {
    if (!editLead) return;

    try {
      await API.put(`/leads/${editLead._id}`, {
        status: editStatus,
      });

      setEditLead(null);
      fetchLeads();
    } catch (err) {
      console.log(err);
    }
  };

  const exportCSV = () => {
    if (!leads.length) return;

    const csv = [
      ["Name", "Email", "Status", "Source", "CreatedAt"],
      ...leads.map((l) => [
        l.name,
        l.email,
        l.status,
        l.source,
        l.createdAt ? new Date(l.createdAt).toLocaleDateString() : "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "leads.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">📊 Leads Dashboard</h1>
          <p className="text-gray-400 text-sm">
            Manage and track all your leads
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 px-4 py-2 rounded-lg"
          >
            + Add Lead
          </button>

          <button
            onClick={exportCSV}
            className="bg-green-600 px-4 py-2 rounded-lg"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
        <input
          placeholder="Search name/email"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="p-2 bg-gray-800 rounded"
        />

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="">All Status</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Lost</option>
        </select>

        <select
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setPage(1);
          }}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="">All Source</option>
          <option>Website</option>
          <option>Instagram</option>
          <option>Referral</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : leads.length === 0 ? (
        <p className="text-gray-400">No leads found</p>
      ) : (
        <table className="w-full text-sm border border-gray-800">
          <thead className="bg-gray-800">
            <tr>
              <th className="p-2">Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Source</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-t border-gray-800">
                <td className="p-2">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.status}</td>
                <td>{lead.source}</td>
                <td className="flex gap-2 p-2">
                  <button
                    onClick={() => {
                      setEditLead(lead);
                      setEditStatus(lead.status);
                    }}
                    className="bg-yellow-600 px-2 py-1 rounded text-xs"
                  >
                    Edit
                  </button>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="bg-red-600 px-2 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex gap-3 mt-5">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-800 rounded"
        >
          Prev
        </button>

        <span className="text-gray-400">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-800 rounded"
        >
          Next
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded w-[400px]">
            <h2 className="text-xl mb-3">Add Lead</h2>

            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-gray-800"
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-gray-800"
            />

            <select
              name="source"
              value={form.source}
              onChange={handleChange}
              className="w-full p-2 mb-2 bg-gray-800"
            >
              <option value="">Source</option>
              <option>Website</option>
              <option>Instagram</option>
              <option>Referral</option>
            </select>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-gray-800"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-700 px-3 py-1"
              >
                Cancel
              </button>

              <button onClick={addLead} className="bg-blue-600 px-3 py-1">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {editLead && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded w-[400px]">
            <h2 className="text-xl mb-3">Edit Lead</h2>

            <p className="text-gray-400 mb-3">{editLead.name}</p>

            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-800"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Lost</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditLead(null)}
                className="bg-gray-700 px-3 py-1"
              >
                Cancel
              </button>

              <button onClick={updateLead} className="bg-green-600 px-3 py-1">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;