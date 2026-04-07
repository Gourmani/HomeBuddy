import React, { useEffect, useState } from "react";
import { getMaidProfiles } from "../services/maidService";
import { useNavigate } from "react-router-dom";


function MaidList() {
  const [maids, setMaids] = useState([]);
  const navigate = useNavigate();

  // 🔥 FILTER STATE
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    workType: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 FETCH DATA
  const fetchMaids = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getMaidProfiles(filters);

      // ✅ safe access
      setMaids(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching maids:", err);
      setError("Failed to fetch maids");
    } finally {
      setLoading(false);
    }
  };

  // 🔄 AUTO FETCH WHEN FILTER CHANGES
  useEffect(() => {
    fetchMaids();
  }, [filters]);

  // 🔄 HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Maids</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        name="search"
        placeholder="Search by name or work..."
        value={filters.search}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      {/* 🎛️ FILTERS */}
      <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleChange}
          style={{ padding: "8px" }}
        />

        <select
          name="workType"
          value={filters.workType}
          onChange={handleChange}
          style={{ padding: "8px" }}
        >
          <option value="">All Work</option>
          <option value="cleaning">Cleaning</option>
          <option value="cooking">Cooking</option>
          <option value="babysitting">Babysitting</option>
        </select>
      </div>

      {/* 🔄 STATES HANDLING */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 📋 LIST */}
      {!loading && maids.length === 0 ? (
        <p>No maids found</p>
      ) : (
        maids.map((maid) => (
        
                    <div
              key={maid._id}
              onClick={() => navigate(`/maids/${maid._id}`)}
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
              }}
            >

            <h3>{maid.user?.name}</h3>
            <p>Work: {maid.workType}</p>
            <p>Experience: {maid.experience} years</p>
            <p>
              Salary: ₹{maid.salaryExpected} ({maid.salaryType})
            </p>
            <p>Availability: {maid.availability}</p>
            <p>City: {maid.location?.city || "N/A"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MaidList;