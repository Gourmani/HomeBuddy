import { useEffect, useState } from "react";
import API from "../services/api";

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
    location: { city: "", area: "" },
    workRequired: [],
    budget: "",
    description: "",
  });

  // 🔹 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/user-profile/me");
      setProfile(res.data);

      setForm({
        phone: res.data?.phone || "",
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

  // 🔹 UPDATE PROFILE
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user-profile", form);
      alert("Profile updated!");
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  // 🔹 CHANGE PASSWORD
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
    <div style={{ padding: "20px" }}>
      <h2>User Profile</h2>

      {/* 🔥 VIEW MODE */}
      {!editMode ? (
        <>
          <p><strong>Name:</strong> {profile.user?.name || "N/A"}</p>
          <p><strong>Email:</strong> {profile.user?.email || "N/A"}</p>
          <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
          <p><strong>City:</strong> {profile.location?.city || "N/A"}</p>
          <p><strong>Area:</strong> {profile.location?.area || "N/A"}</p>

          {/* 🔥 FIXED DISPLAY */}
          <p>
            <strong>Work:</strong>{" "}
            {Array.isArray(profile.workRequired)
              ? profile.workRequired.join(", ")
              : profile.workRequired || "N/A"}
          </p>

          <p><strong>Budget:</strong> ₹{profile.budget || "N/A"}</p>
          <p><strong>Description:</strong> {profile.description || "N/A"}</p>

          <button onClick={() => setEditMode(true)}>
            Edit Profile
          </button>

          <hr />

          <button onClick={() => setShowPasswordForm(!showPasswordForm)}>
            Change Password
          </button>

          {showPasswordForm && (
            <form onSubmit={handlePasswordChange}>
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

              <button type="submit">Update Password</button>
            </form>
          )}
        </>
      ) : (
        /* 🔥 EDIT MODE */
        <form onSubmit={handleUpdate}>

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

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

          {/* 🔥 MULTI SELECT WORK REQUIRED */}
          <div>
            <p><strong>Select Work Required:</strong></p>

            {[
              "cleaning",
              "cooking",
              "babysitting",
              "eldercare",
              "driver",
              "eventhelper",
            ].map((work) => (
              <label key={work} style={{ display: "block" }}>
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

          <input
            type="number"
            placeholder="Budget"
            value={form.budget}
            onChange={(e) =>
              setForm({ ...form, budget: Number(e.target.value) })
            }
          />

          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default UserProfile;