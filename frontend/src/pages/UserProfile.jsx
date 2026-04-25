import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/userProfile.css";

const cityAreas = {
  Darbhanga: [
    "Laheriasarai","Kadirabad","Benta","Allalpatti","Donar",
    "Mabbi","Dilli More","LaxmiSagar","Mishratola",
    "Professor Colony","Bela","Darbhanga Tower",
    "Mirzapur","Maulaganj","Rahamganj",
  ],
  Patna: [
    "Boring Road","Kankarbagh","Rajendra Nagar","Patliputra",
    "Danapur","Bailey Road","Ashok Rajpath","Gola Road",
    "Fraser Road","Phulwari Sharif","Ashok Nagar",
    "S K Puri","Kumhrar","Digha",
  ],
};

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [form, setForm] = useState({
    phone: "",
    email: "",
    location: { city: "", area: "" },
    workRequired: [],
    budget: "",
    description: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await API.get("/user-profile/me");
      setProfile(res.data);

      setForm({
        phone: res.data?.phone || "",
        email: res.data?.user?.email || "",
        location: {
          city: res.data?.location?.city || "",
          area: res.data?.location?.area || "",
        },
        workRequired: res.data?.workRequired || [],
        budget: res.data?.budget || "",
        description: res.data?.description || "",
      });

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user-profile", {
        ...form,
        phone: profile.phone || form.phone,
        email: profile.user?.email || form.email,
      });

      alert("Profile updated!");
      setEditMode(false);
      fetchProfile();

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    try {
      await API.put("/users/change-password", passwordData);

      alert("Password updated successfully!");
      setShowPasswordForm(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  if (profile === null) return <p>Loading...</p>;
  if (!profile) return <p>No profile found. Please create one.</p>;

  return (
    <div className="user-profile-page">
      <div className="user-profile-container">

        <h2>User Profile</h2>

        {!editMode ? (
          <div className="profile-info">

            <div className="section">
              <h3>👤 Personal Info</h3>
              <p><strong>Name:</strong> {profile.user?.name || "N/A"}</p>
              <p><strong>Email:</strong> {profile.user?.email || "Not provided"}</p>
              <p><strong>Phone:</strong> {profile.phone || "Not provided"}</p>
            </div>

            <div className="section">
              <h3>📍 Location</h3>
              <p><strong>City:</strong> {profile.location?.city || "N/A"}</p>
              <p><strong>Area:</strong> {profile.location?.area || "N/A"}</p>
            </div>

            <div className="section">
              <h3>💼 Work Required</h3>
              <p>
                {Array.isArray(profile.workRequired)
                  ? profile.workRequired.join(", ")
                  : profile.workRequired || "N/A"}
              </p>
            </div>

            <div className="section">
              <h3>💰 Budget</h3>
              <p>₹{profile.budget || "N/A"}</p>
            </div>

            <div className="section">
              <h3>📝 Description</h3>
              <p>{profile.description || "N/A"}</p>
            </div>

            <div className="action-buttons">

  <button
    className="edit-btn"
    onClick={() => setEditMode(true)}
  >
     Edit Profile
  </button>

  <button
    className="password-btn"
    onClick={() => setShowPasswordForm(!showPasswordForm)}
  >
    🔒 Change Password
  </button>

</div>

            {showPasswordForm && (
              <form className="user-profile-form" onSubmit={handlePasswordChange}>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                />

                <button type="submit" className="save-btn">
                  Update Password
                </button>
              </form>
            )}
          </div>
        ) : (
          <form className="user-profile-form" onSubmit={handleUpdate}>

            <div className="section">
              <h3>📞 Contact</h3>

              {!profile.phone && (
                <input
                  placeholder="Phone (required)"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
              )}

              {!profile.user?.email && (
                <input
                  placeholder="Email (optional)"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
              )}
            </div>

            <div className="section">
              <h3>📍 Location</h3>

              <select
                value={form.location.city}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: { city: e.target.value, area: "" },
                  })
                }
              >
                <option value="">Select City</option>
                {Object.keys(cityAreas).map((city) => (
                  <option key={city}>{city}</option>
                ))}
              </select>

              <select
                value={form.location.area}
                onChange={(e) =>
                  setForm({
                    ...form,
                    location: {
                      ...form.location,
                      area: e.target.value,
                    },
                  })
                }
                disabled={!form.location.city}
              >
                <option value="">Select Area</option>
                {form.location.city &&
                  cityAreas[form.location.city].map((area) => (
                    <option key={area}>{area}</option>
                  ))}
              </select>
            </div>

            <div className="section">
              <h3>💼 Work Required</h3>

              <div className="work-group">
                {[
                  "cleaning",
                  "cooking",
                  "babysitting",
                  "eldercare",
                  "driver",
                  "eventhelper",
                ].map((work) => (
                  <label key={work}>
                    <input
                      type="checkbox"
                      value={work}
                      checked={form.workRequired.includes(work)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm({
                            ...form,
                            workRequired: [...form.workRequired, work],
                          });
                        } else {
                          setForm({
                            ...form,
                            workRequired: form.workRequired.filter(
                              (item) => item !== work
                            ),
                          });
                        }
                      }}
                    />
                    {work}
                  </label>
                ))}
              </div>
            </div>

            <div className="section">
              <h3>💰 Budget</h3>

              <input
                type="number"
                placeholder="Budget"
                value={form.budget}
                onChange={(e) =>
                  setForm({ ...form, budget: Number(e.target.value) })
                }
              />
            </div>

            <div className="section">
              <h3>📝 Description</h3>

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>

            <div className="button-group">
              <button type="submit" className="save-btn">Save Changes</button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default UserProfile;