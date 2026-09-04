import { useState } from "react";

function IndustryProfile() {
  const [profile, setProfile] = useState({
    companyName: "XYZ Technologies",
    industry: "Information Technology",
    email: "hr@xyztechnologies.com",
    phone: "+91 9876543210",
    website: "https://xyztechnologies.com",
    location: "Kolkata, India",
    description:
      "XYZ Technologies is a technology company working in AI, software development and digital transformation.",
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    localStorage.setItem(
      "industryProfile",
      JSON.stringify(profile)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  return (
    <div className="industry-page">

      <div className="industry-page-header">
        <div>
          <p className="industry-tag">COMPANY PROFILE</p>
          <h1>Company Profile</h1>
          <p>
            Manage your company information and
            industry presence.
          </p>
        </div>
      </div>

      <div className="industry-card">

        <div className="profile-company-header">

          <div className="company-logo">
            {profile.companyName.charAt(0)}
          </div>

          <div>
            <h2>{profile.companyName}</h2>
            <p>{profile.industry}</p>
          </div>

        </div>

        <div className="industry-form-grid">

          <div className="industry-field">
            <label>Company Name</label>
            <input
              name="companyName"
              value={profile.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="industry-field">
            <label>Industry</label>
            <input
              name="industry"
              value={profile.industry}
              onChange={handleChange}
            />
          </div>

          <div className="industry-field">
            <label>Email</label>
            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </div>

          <div className="industry-field">
            <label>Phone</label>
            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="industry-field">
            <label>Website</label>
            <input
              name="website"
              value={profile.website}
              onChange={handleChange}
            />
          </div>

          <div className="industry-field">
            <label>Location</label>
            <input
              name="location"
              value={profile.location}
              onChange={handleChange}
            />
          </div>

          <div className="industry-field full">
            <label>Company Description</label>
            <textarea
              name="description"
              value={profile.description}
              onChange={handleChange}
              rows="5"
            />
          </div>

        </div>

        <div className="industry-form-actions">

          {saved && (
            <span className="save-message">
              ✓ Profile saved
            </span>
          )}

          <button
            className="industry-primary-btn"
            onClick={saveProfile}
          >
            Save Profile
          </button>

        </div>

      </div>

    </div>
  );
}

export default IndustryProfile;