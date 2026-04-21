import { useEffect, useState } from "react";
import API from "../services/api";

function MaidProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/maids/my-profile");
        setProfile(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maid Profile</h2>

      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>City:</strong> {profile.location?.city}</p>
      <p><strong>Area:</strong> {profile.location?.area}</p>
      <p><strong>Work:</strong> {profile.workType}</p>
      <p><strong>Experience:</strong> {profile.experience} years</p>
      <p><strong>Salary:</strong> ₹{profile.salaryExpected}</p>
    </div>
  );
}

export default MaidProfile;