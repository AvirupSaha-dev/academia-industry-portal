import { useState } from 'react'
import './StudentProfile.css'

function StudentProfile({ onNavigate }) {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('studentProfile')

    return saved
      ? JSON.parse(saved)
      : {
          name: 'Student',
          email: 'student@example.com',
          phone: '',
          college: 'MCKV Institute of Engineering',
          department: 'Computer Science & Engineering',
          specialization: 'AI & ML',
          year: '3rd Year',
          cgpa: '',
          location: 'Kolkata',
          careerInterest: 'AI / Machine Learning',
          bio: '',
        }
  })

  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()

    localStorage.setItem(
      'studentProfile',
      JSON.stringify(profile)
    )

    setEditing(false)
    setSaved(true)

    setTimeout(() => {
      setSaved(false)
    }, 2500)
  }

  const profileFields = [
    {
      label: 'Full Name',
      name: 'name',
      type: 'text',
    },
    {
      label: 'Email',
      name: 'email',
      type: 'email',
    },
    {
      label: 'Phone',
      name: 'phone',
      type: 'tel',
    },
    {
      label: 'College / Institution',
      name: 'college',
      type: 'text',
    },
    {
      label: 'Department',
      name: 'department',
      type: 'text',
    },
    {
      label: 'Specialization',
      name: 'specialization',
      type: 'text',
    },
    {
      label: 'Academic Year',
      name: 'year',
      type: 'text',
    },
    {
      label: 'CGPA',
      name: 'cgpa',
      type: 'text',
    },
    {
      label: 'Location',
      name: 'location',
      type: 'text',
    },
    {
      label: 'Career Interest',
      name: 'careerInterest',
      type: 'text',
    },
  ]

  const completionItems = [
    profile.name,
    profile.email,
    profile.phone,
    profile.college,
    profile.department,
    profile.specialization,
    profile.year,
    profile.cgpa,
    profile.location,
    profile.careerInterest,
    profile.bio,
  ]

  const completedFields = completionItems.filter(
    (field) => field && field.trim() !== ''
  ).length

  const completion = Math.round(
    (completedFields / completionItems.length) * 100
  )

  return (
    <div className="student-profile-page">

      {/* HEADER */}
      <div className="student-profile-header">

        <div>
          <p className="profile-page-tag">
            STUDENT PROFILE
          </p>

          <h1>My Profile</h1>

          <p>
            Manage your academic information, career interests
            and personal details.
          </p>
        </div>

        <button
          className="edit-profile-btn"
          onClick={() => setEditing(!editing)}
        >
          {editing ? 'Cancel Editing' : '✏ Edit Profile'}
        </button>

      </div>


      {/* PROFILE OVERVIEW */}
      <section className="profile-overview-card">

        <div className="profile-avatar">
          {profile.name
            ? profile.name.charAt(0).toUpperCase()
            : 'S'}
        </div>

        <div className="profile-overview-info">

          <h2>
            {profile.name || 'Student'}
          </h2>

          <p>
            {profile.department || 'Computer Science & Engineering'}
          </p>

          <span>
            🎓 {profile.college || 'College / Institution'}
          </span>

        </div>

        <div className="profile-completion">

          <div className="completion-circle">
            <strong>{completion}%</strong>
          </div>

          <div>
            <span>Profile Completion</span>

            <div className="completion-bar">
              <div
                style={{
                  width: `${completion}%`,
                }}
              />
            </div>

            <small>
              {completion === 100
                ? 'Profile complete'
                : 'Complete your profile to improve opportunities'}
            </small>
          </div>

        </div>

      </section>


      {/* SUCCESS MESSAGE */}
      {saved && (
        <div className="profile-success">
          ✓ Profile updated successfully
        </div>
      )}


      {/* MAIN GRID */}
      <div className="profile-content-grid">

        {/* PERSONAL & ACADEMIC INFORMATION */}
        <section className="profile-section-card">

          <div className="profile-section-heading">

            <div>
              <p>PERSONAL & ACADEMIC</p>
              <h2>Basic Information</h2>
            </div>

            <span>🎓</span>

          </div>


          <form onSubmit={handleSave}>

            <div className="profile-form-grid">

              {profileFields.map((field) => (

                <div
                  className="profile-form-group"
                  key={field.name}
                >

                  <label>
                    {field.label}
                  </label>

                  <input
                    type={field.type}
                    name={field.name}
                    value={profile[field.name] || ''}
                    onChange={handleChange}
                    disabled={!editing}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />

                </div>

              ))}

            </div>


            {/* BIO */}
            <div className="profile-form-group full-width">

              <label>
                About Me
              </label>

              <textarea
                name="bio"
                value={profile.bio || ''}
                onChange={handleChange}
                disabled={!editing}
                placeholder="Write a short description about yourself..."
                rows="5"
              />

            </div>


            {editing && (
              <div className="profile-form-actions">

                <button
                  type="button"
                  className="cancel-profile-btn"
                  onClick={() => setEditing(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-profile-btn"
                >
                  Save Profile
                </button>

              </div>
            )}

          </form>

        </section>


        {/* CAREER SECTION */}
        <section className="career-interest-card">

          <div className="profile-section-heading">

            <div>
              <p>CAREER</p>
              <h2>Career Interests</h2>
            </div>

            <span>🎯</span>

          </div>

          <div className="career-interest-main">

            <div className="career-icon">
              🤖
            </div>

            <div>
              <span>Interested Career Field</span>

              <h3>
                {profile.careerInterest ||
                  'Not specified'}
              </h3>

              <p>
                Your career interests help us recommend
                relevant internships, projects, jobs and
                learning opportunities.
              </p>
            </div>

          </div>


          <div className="career-features">

            <div>
              <strong>💼</strong>
              <span>Internships</span>
            </div>

            <div>
              <strong>🚀</strong>
              <span>Projects</span>
            </div>

            <div>
              <strong>📚</strong>
              <span>Learning</span>
            </div>

            <div>
              <strong>🎯</strong>
              <span>Jobs</span>
            </div>

          </div>

        </section>

      </div>


      {/* QUICK ACTIONS */}
      <section className="profile-quick-actions">

        <div>
          <p>CAREER DEVELOPMENT</p>

          <h2>
            Continue building your profile
          </h2>

          <p>
            Complete your assessment and explore opportunities
            based on your skills.
          </p>
        </div>

        <div className="quick-action-buttons">

          <button
            onClick={() =>
              onNavigate &&
              onNavigate('skill-assessment')
            }
          >
            📝 Skill Assessment
          </button>

          <button
            onClick={() =>
              onNavigate &&
              onNavigate('skill-profile')
            }
          >
            📊 Skill Profile
          </button>

          <button
            onClick={() =>
              onNavigate &&
              onNavigate('internships')
            }
          >
            🎯 Explore Internships
          </button>

        </div>

      </section>


      {/* BOTTOM */}
      <div className="profile-bottom-navigation">

        <button
          onClick={() =>
            onNavigate &&
            onNavigate('dashboard')
          }
        >
          ← Back to Dashboard
        </button>

      </div>

    </div>
  )
}

export default StudentProfile