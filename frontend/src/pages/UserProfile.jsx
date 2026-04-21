import { useEffect, useState } from "react";
import API from "../services/api";

function UserProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/user-profile/me");
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
      <h2>User Profile</h2>

      <p><strong>Name:</strong> {profile.user?.name || "N/A"}</p>
      <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
      <p><strong>City:</strong> {profile.location?.city || "N/A"}</p>
      <p><strong>Area:</strong> {profile.location?.area || "N/A"}</p>
      <p><strong>Work:</strong> {profile.workRequired || "N/A"}</p>
      <p><strong>Budget:</strong> {profile.budget || "N/A"}</p>
    </div>
  );
}

export default UserProfile;