import { useEffect, useState } from "react";
import API from "../services/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../styles/admin.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [maids, setMaids] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [workFilter, setWorkFilter] = useState("");

  //  FETCH DATA
  const fetchData = async () => {
    try {
      const [statsRes, usersRes, maidsRes, analyticsRes] =
        await Promise.all([
          API.get("/admin/stats"),
          API.get("/admin/users"),
          API.get("/admin/maids"),
          API.get("/admin/analytics"),
        ]);

      setStats(statsRes.data);
      setUsers(usersRes.data);
      setMaids(maidsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (err) {
      console.log("Admin Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //  DELETE USER
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await API.delete(`/admin/user/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  //  DELETE MAID
  const handleDeleteMaid = async (id) => {
    if (!window.confirm("Delete this maid?")) return;

    try {
      await API.delete(`/admin/maid/${id}`);
      setMaids(maids.filter((m) => m._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      {/* STATS */}
      <div className="stats">
        <div className="card">
          <p>Total Users</p>
          <h2>{stats?.totalUsers || 0}</h2>
        </div>

        <div className="card">
          <p>Total Maids</p>
          <h2>{stats?.totalMaids || 0}</h2>
        </div>

        <div className="card">
          <p>Total Profiles</p>
          <h2>{stats?.totalProfiles || 0}</h2>
        </div>
      </div>

      {/*  SEARCH */}
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />
      <div className="filters">
      <input
        type="text"
        placeholder="Filter by city..."
        value={cityFilter}
        onChange={(e) => setCityFilter(e.target.value)}
      />

      <select
        value={workFilter}
        onChange={(e) => setWorkFilter(e.target.value)}
      >
        <option value="">All Work</option>
        <option value="cleaning">Cleaning</option>
        <option value="cooking">Cooking</option>
        <option value="driver">Driver</option>
        <option value="babysitting">Babysitting</option>
        <option value="eldercare">Eldercare</option>
        <option value="eventhelper">Event Helper</option>
      </select>
    </div>

      {/*  USERS */}
      <h2>Users</h2>
      <div className="table">
        {users
            .filter((u) =>
              u.name.toLowerCase().includes(search.toLowerCase())
            )
            .filter((u) =>
              cityFilter
                ? u.profile?.location?.city
                    ?.toLowerCase()
                    .includes(cityFilter.toLowerCase())
                : true
            )
          .map((u) => (
            <div key={u._id} className="row">
              <span>{u.name}</span>
              <span>{u.email || u.phone}</span>

              <span>
                {u.profile?.location?.city || "N/A"},{" "}
                {u.profile?.location?.area || ""}
              </span>

              <span>
                {u.profile?.workRequired?.join(", ") || "N/A"}
              </span>

              <span>₹{u.profile?.budget || "N/A"}</span>

              <span>
                <button onClick={() => handleDeleteUser(u._id)}>
                   Delete User
                </button>
              </span>
            </div>
          ))}
      </div>

      {/* MAIDS*/}
      <h2>Maids</h2>
      <div className="table">
        {maids
          .filter((m) =>
            cityFilter
              ? m.location?.city
                  ?.toLowerCase()
                  .includes(cityFilter.toLowerCase())
              : true
          )
          .filter((m) =>
            workFilter
              ? m.workType
                  ?.map((w) => w.toLowerCase())
                  .includes(workFilter.toLowerCase())
              : true
          ).map((m) => (
          <div key={m._id} className="row">
            <span>{m.name}</span>

            <span>{m.user?.email || m.phone}</span>

            <span>
              {m.location?.city}, {m.location?.area}
            </span>

            <span>{m.workType?.join(", ")}</span>

            <span>
              ₹{m.salaryExpected} ({m.salaryType})
            </span>

            <span>
              <button onClick={() => handleDeleteMaid(m._id)}>
                Delete Maid
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* ANALYTICS */}
      <h2>Work Demand</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.workDemand || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

         <h2>City Demand</h2>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.cityDemand || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;