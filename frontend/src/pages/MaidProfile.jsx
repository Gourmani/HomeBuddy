import { useEffect, useState } from "react";
import API from "../services/api";

const cityAreas = {
  Darbhanga: [
    "Laheriasarai",
    "Kadirabad",
    "Benta",
    "Allalpatti",
    "Donar",
    "Mabbi",
    "Dilli More",
    "LaxmiSagar",
    "Mishratola",
    "Professor Colony",
    "Bela",
    "Darbhanga Tower",
    "Mirzapur",
    "Maulaganj",
    "Rahamganj",
  ],
  Patna: [
    "Boring Road",
    "Kankarbagh",
    "Rajendra Nagar",
    "Patliputra",
    "Danapur",
    "Bailey Road",
    "Ashok Rajpath",
    "Gola Road",
    "Fraser Road",
    "Phulwari Sharif",
    "Ashok Nagar",
    "S K Puri",
    "Kumhrar",
    "Digha",
  ],
};

function MaidProfile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // 🔥 NEW PASSWORD STATES
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    workType: "",
    experience: "",
    salaryExpected: "",
    salaryType: "",
    availability: "",
    location: { city: "", area: "" },
    description: "",
  });

  // 🔹 FETCH PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/maids/my-profile");
      setProfile(res.data);

      setForm({
        name: res.data?.name || "",
        phone: res.data?.phone || "",
        workType: res.data?.workType || "",
        experience: res.data?.experience || "",
        salaryExpected: res.data?.salaryExpected || "",
        salaryType: res.data?.salaryType || "",
        availability: res.data?.availability || "",
        location: {
          city: res.data?.location?.city || "",
          area: res.data?.location?.area || "",
        },
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
      await API.put("/maids", form);

      alert("Profile updated!");
      setEditMode(false);
      fetchProfile();

    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  //  CHANGE PASSWORD FUNCTION
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

  if (!profile) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Maid Profile</h2>

      {!editMode ? (
        <>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>City:</strong> {profile.location?.city}</p>
          <p><strong>Area:</strong> {profile.location?.area}</p>
          <p><strong>Work:</strong> {profile.workType}</p>
          <p><strong>Experience:</strong> {profile.experience} years</p>
          <p><strong>Salary:</strong> ₹{profile.salaryExpected}</p>
          <p><strong>Description:</strong> {profile.description}</p>

          <button onClick={() => setEditMode(true)}>
            Edit Profile
          </button>

          {/* CHANGE PASSWORD UI */}
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
        <form onSubmit={handleUpdate}>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <select
            value={form.workType}
            onChange={(e) =>
              setForm({ ...form, workType: e.target.value })
            }
          >
            <option value="">Work Type</option>
            <option value="cleaning">Cleaning</option>
            <option value="cooking">Cooking</option>
            <option value="babysitting">Babysitting</option>
            <option value="eldercare">Elder Care</option>
            <option value="driver">Driver</option>
            <option value="eventhelper">Event Helper</option>
          </select>

          <input
            type="number"
            placeholder="Experience"
            value={form.experience}
            onChange={(e) =>
              setForm({ ...form, experience: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Salary"
            value={form.salaryExpected}
            onChange={(e) =>
              setForm({ ...form, salaryExpected: e.target.value })
            }
          />

          <select
            value={form.salaryType}
            onChange={(e) =>
              setForm({ ...form, salaryType: e.target.value })
            }
          >
            <option value="">Salary Type</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
            <option value="hourly">Hourly</option>
          </select>

          <select
            value={form.availability}
            onChange={(e) =>
              setForm({ ...form, availability: e.target.value })
            }
          >
            <option value="">Availability</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
          </select>

          <select
            value={form.location.city}
            onChange={(e) =>
              setForm({
                ...form,
                location: { city: e.target.value, area: "" },
              })
            }
          >
            <option value="">City</option>
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
            <option value="">Area</option>
            {form.location.city &&
              cityAreas[form.location.city].map((area) => (
                <option key={area}>{area}</option>
              ))}
          </select>

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

export default MaidProfile;