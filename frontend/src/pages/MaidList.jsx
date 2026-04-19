import React, { useEffect, useState } from "react";
import { getMaidProfiles } from "../services/maidService";
import MaidCard from "../components/MaidCard";
import "../styles/maidList.css";

function MaidList() {
  const [maids, setMaids] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    city: "",
    workType: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaids = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getMaidProfiles(filters);
      setMaids(res?.data?.data || []);
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaids();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="maid-list-container">

      {/* HEADER */}
      <div className="list-header">
        <h1>Find Trusted Workers Near You</h1>
        <p>Browse verified maids, cooks and helpers in your city</p>
      </div>

      {/* SEARCH */}
      <div className="search-box">
        <input
          type="text"
          name="search"
          placeholder="Search by name or work type..."
          value={filters.search}
          onChange={handleChange}
        />
      </div>

      {/* FILTERS */}
      <div className="filters">

        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={filters.city}
          onChange={handleChange}
        />

        <select
          name="workType"
          value={filters.workType}
          onChange={handleChange}
        >
          <option value="">All Services</option>
          <option value="cleaning">Cleaning</option>
          <option value="cooking">Cooking</option>
          <option value="babysitting">Babysitting</option>
        </select>

      </div>

      {/* STATES */}
      {loading && <p className="status-text">Loading workers...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && maids.length === 0 ? (
        <div className="empty-state">
          <p>No workers found</p>
          <span>Try changing filters or search</span>
        </div>
      ) : (
        <div className="maid-grid">
          {maids.map((maid) => (
            <MaidCard key={maid._id} maid={maid} />
          ))}
        </div>
      )}

    </div>
  );
}

export default MaidList;