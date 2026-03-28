import { useEffect, useState } from "react";
import { getMaidProfiles } from "../services/maidService";

function MaidList() {
  const [maids, setMaids] = useState([]);

  useEffect(() => {
    const fetchMaids = async () => {
      const res = await getMaidProfiles();
      setMaids(res.data);
    };

    fetchMaids();
  }, []);

  return (
    <div>
      <h2>Available Maids</h2>

      {maids.map((maid) => (
        <div key={maid._id}>
          <h3>{maid.user.name}</h3>
          <p>Work: {maid.workType}</p>
          <p>Experience: {maid.experience} years</p>
          <p>
            Salary: ₹{maid.salaryExpected} ({maid.salaryType})
          </p>
          <p>Availability: {maid.availability}</p>
        </div>
      ))}
    </div>
  );
}

export default MaidList;