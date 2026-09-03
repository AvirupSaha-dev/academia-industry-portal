import { useEffect, useMemo, useState } from 'react'
import './StudentProfile.css'

const PROFILE_KEY = 'studentProfile'

const defaultProfile = {
  name: 'Student Name',
  headline: 'B.Tech Computer Science & Engineering',
  college: 'MCKV Institute of Engineering',
  location: 'Kolkata, India',
  email: '',
  phone: '',
  degree: 'B.Tech',
  branch: 'Computer Science & Engineering',
  specialization: 'AI & ML',
  year: '3rd Year',
  semester: '6th Semester',
  cgpa: '',
  about: 'Add a short professional introduction about yourself.',
  skills: ['Python', 'Machine Learning', 'React'],
  preferredRole: '',
  industry: '',
  jobType: 'Full Time',
  preferredLocation: '',
  github: '',
  linkedin: '',
  portfolio: '',
  achievements: [],
  certifications: [],
  photo: '',
  resumeName: '',
  resumeUrl: ''
}

function StudentProfile({ onNavigate }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(PROFILE_KEY)
      return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile
    } catch {
      return defaultProfile
    }
  })

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(profile)
  const [skillInput, setSkillInput] = useState('')
  const [achievementInput, setAchievementInput] = useState('')
  const [certificationInput, setCertificationInput] = useState('')

  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    const loadProfile = () => {
      try {
        const saved = localStorage.getItem(PROFILE_KEY)
        if (saved) {
          const next = { ...defaultProfile, ...JSON.parse(saved) }
          setProfile(next)
          if (!editing) setForm(next)
        }
      } catch {}
    }

    window.addEventListener('profileUpdated', loadProfile)
    return () => window.removeEventListener('profileUpdated', loadProfile)
  }, [editing])

  const applicationCount = useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem('applications') || '[]')
      return Array.isArray(data) ? data.length : 0
    } catch {
      return 0
    }
  }, [profile])

  const projectCount = useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem('portfolioProjects') || '[]')
      return Array.isArray(data) ? data.length : 0
    } catch {
      return 0
    }
  }, [profile])

  const documentCount = useMemo(() => {
    return 0
  }, [profile])

  const internshipCount = useMemo(() => {
    try {
      const data = JSON.parse(localStorage.getItem('applications') || '[]')
      return Array.isArray(data)
        ? data.filter(x => String(x.type || '').toLowerCase() === 'internship').length
        : 0
    } catch {
      return 0
    }
  }, [profile])

  const completion = useMemo(() => {
    const checks = [
      profile.name,
      profile.headline,
      profile.college,
      profile.location,
      profile.email,
      profile.about,
      profile.skills?.length,
      profile.preferredRole,
      profile.github || profile.linkedin,
      profile.resumeName
    ]
    return Math.round((checks.filter(Boolean).length / checks.length) * 100)
  }, [profile])

  const initials = (profile.name || 'Student')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(x => x[0].toUpperCase())
    .join('')

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const addSkill = () => {
    const skill = skillInput.trim()
    if (!skill) return
    if (!form.skills.some(x => x.toLowerCase() === skill.toLowerCase())) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, skill] }))
    }
    setSkillInput('')
  }

  const removeSkill = skill => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(x => x !== skill)
    }))
  }

  const addAchievement = () => {
    const value = achievementInput.trim()
    if (!value) return
    setForm(prev => ({ ...prev, achievements: [...prev.achievements, value] }))
    setAchievementInput('')
  }

  const removeAchievement = index => {
    setForm(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  const addCertification = () => {
    const value = certificationInput.trim()
    if (!value) return
    setForm(prev => ({ ...prev, certifications: [...prev.certifications, value] }))
    setCertificationInput('')
  }

  const removeCertification = index => {
    setForm(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  const handlePhoto = e => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setForm(prev => ({ ...prev, photo: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleResume = e => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 10 * 1024 * 1024) {
      alert('Resume must be less than 10 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      setForm(prev => ({
        ...prev,
        resumeName: file.name,
        resumeUrl: reader.result
      }))
    }
    reader.readAsDataURL(file)
  }

  const saveProfile = e => {
    e.preventDefault()

    if (!form.name.trim()) {
      alert('Please enter your name.')
      return
    }

    const cleaned = {
      ...form,
      name: form.name.trim(),
      about: form.about.trim(),
      skills: form.skills || [],
      achievements: form.achievements || [],
      certifications: form.certifications || []
    }

    setProfile(cleaned)
    setForm(cleaned)
    setEditing(false)
    localStorage.setItem(PROFILE_KEY, JSON.stringify(cleaned))
    window.dispatchEvent(new Event('profileUpdated'))
    alert('Profile updated successfully!')
  }

  const cancelEdit = () => {
    setForm(profile)
    setSkillInput('')
    setAchievementInput('')
    setCertificationInput('')
    setEditing(false)
  }

  const quickNavigate = page => {
    if (onNavigate) onNavigate(page)
  }

  if (editing) {
    return (
      <div className="student-profile-page">
        <div className="student-profile-header">
          <div>
            <p className="page-tag">👤 STUDENT PROFILE</p>
            <h1>Edit Profile</h1>
            <p className="page-description">
              Keep your academic and professional information up to date.
            </p>
          </div>
          <button className="profile-edit-btn" type="button" onClick={cancelEdit}>
            ← Back to Profile
          </button>
        </div>

        <form className="profile-form-card profile-edit-container" onSubmit={saveProfile}>
          <div className="profile-photo-edit">
            <div className="profile-avatar large">
              {form.photo ? <img src={form.photo} alt="Profile" /> : initials}
            </div>
            <div>
              <strong>Profile Photo</strong>
              <p className="profile-muted">Use a clear professional photo.</p>
              <label className="photo-upload-btn">
                Change Photo
                <input type="file" hidden accept="image/*" onChange={handlePhoto} />
              </label>
            </div>
          </div>

          <div className="display-heading">
            <div className="section-icon">👤</div>
            <div>
              <h2>Personal Information</h2>
              <p>Basic information recruiters can see.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label>Full Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" />
            </div>
            <div className="profile-field">
              <label>Professional Headline</label>
              <input name="headline" value={form.headline} onChange={handleChange} placeholder="e.g. B.Tech CSE | AI & ML" />
            </div>
            <div className="profile-field">
              <label>College / University</label>
              <input name="college" value={form.college} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label>Location</label>
              <input name="location" value={form.location} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label>Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
            </div>
            <div className="profile-field">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91..." />
            </div>
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">🎓</div>
            <div>
              <h2>Academic Information</h2>
              <p>Add your current academic details.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label>Degree</label>
              <input name="degree" value={form.degree} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label>Branch</label>
              <input name="branch" value={form.branch} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label>Specialization</label>
              <input name="specialization" value={form.specialization} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label>Year</label>
              <input name="year" value={form.year} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label>Semester</label>
              <input name="semester" value={form.semester} onChange={handleChange} />
            </div>
            <div className="profile-field">
              <label>CGPA</label>
              <input name="cgpa" value={form.cgpa} onChange={handleChange} placeholder="e.g. 8.5" />
            </div>
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">📝</div>
            <div>
              <h2>About Me</h2>
              <p>A short introduction for recruiters.</p>
            </div>
          </div>

          <div className="profile-field">
            <textarea name="about" value={form.about} onChange={handleChange} rows="5" placeholder="Write about your interests, strengths and career goals..." />
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">🛠️</div>
            <div>
              <h2>Skills</h2>
              <p>Add technical and professional skills.</p>
            </div>
          </div>

          <div className="skill-input-row">
            <input
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addSkill()
                }
              }}
              placeholder="e.g. Python"
            />
            <button type="button" onClick={addSkill}>+ Add</button>
          </div>

          <div className="profile-skills">
            {form.skills.map(skill => (
              <span className="profile-skill" key={skill}>
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>×</button>
              </span>
            ))}
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">💼</div>
            <div>
              <h2>Career Preferences</h2>
              <p>Help us understand what opportunities suit you.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label>Preferred Role</label>
              <input name="preferredRole" value={form.preferredRole} onChange={handleChange} placeholder="e.g. ML Engineer" />
            </div>
            <div className="profile-field">
              <label>Preferred Industry</label>
              <input name="industry" value={form.industry} onChange={handleChange} placeholder="e.g. IT / Software" />
            </div>
            <div className="profile-field">
              <label>Job Type</label>
              <select name="jobType" value={form.jobType} onChange={handleChange}>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Freelance</option>
              </select>
            </div>
            <div className="profile-field">
              <label>Preferred Location</label>
              <input name="preferredLocation" value={form.preferredLocation} onChange={handleChange} placeholder="e.g. Kolkata / Remote" />
            </div>
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">🔗</div>
            <div>
              <h2>Professional Links</h2>
              <p>Let recruiters visit your professional profiles.</p>
            </div>
          </div>

          <div className="profile-form-grid">
            <div className="profile-field">
              <label>GitHub</label>
              <input name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/username" />
            </div>
            <div className="profile-field">
              <label>LinkedIn</label>
              <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" />
            </div>
            <div className="profile-field">
              <label>Portfolio</label>
              <input name="portfolio" value={form.portfolio} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">🏆</div>
            <div>
              <h2>Achievements</h2>
              <p>Add awards, competitions and notable achievements.</p>
            </div>
          </div>

          <div className="skill-input-row">
            <input value={achievementInput} onChange={e => setAchievementInput(e.target.value)} placeholder="e.g. Winner of Hackathon" />
            <button type="button" onClick={addAchievement}>+ Add</button>
          </div>
          <div className="profile-list">
            {form.achievements.map((item, index) => (
              <div className="profile-list-item" key={`${item}-${index}`}>
                <span>{item}</span>
                <button type="button" onClick={() => removeAchievement(index)}>×</button>
              </div>
            ))}
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">📜</div>
            <div>
              <h2>Certifications</h2>
              <p>Add courses and professional certifications.</p>
            </div>
          </div>

          <div className="skill-input-row">
            <input value={certificationInput} onChange={e => setCertificationInput(e.target.value)} placeholder="e.g. Python for Data Science" />
            <button type="button" onClick={addCertification}>+ Add</button>
          </div>
          <div className="profile-list">
            {form.certifications.map((item, index) => (
              <div className="profile-list-item" key={`${item}-${index}`}>
                <span>{item}</span>
                <button type="button" onClick={() => removeCertification(index)}>×</button>
              </div>
            ))}
          </div>

          <div className="display-heading section-spaced">
            <div className="section-icon">📄</div>
            <div>
              <h2>Resume</h2>
              <p>Upload your latest resume.</p>
            </div>
          </div>

          <label className="resume-upload-btn">
            {form.resumeName ? 'Replace Resume' : '+ Upload Resume'}
            <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleResume} />
          </label>
          {form.resumeName && <p className="profile-muted">{form.resumeName}</p>}

          <div className="profile-form-actions">
            <button type="button" className="profile-cancel-btn" onClick={cancelEdit}>Cancel</button>
            <button type="submit" className="profile-save-btn">Save Profile</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="student-profile-page">
      <div className="student-profile-header">
        <div>
          <p className="page-tag">👤 STUDENT PROFILE</p>
          <h1>My Profile</h1>
          <p className="page-description">
            Manage your academic information, skills and professional presence.
          </p>
        </div>
        <button
          className="profile-edit-btn"
          type="button"
          onClick={() => {
            setForm(profile)
            setEditing(true)
          }}
        >
          ✎ Edit Profile
        </button>
      </div>

      <section className="profile-hero-card">
        <div className="profile-hero-left">
          <div className="profile-avatar">
            {profile.photo ? <img src={profile.photo} alt="Profile" /> : initials}
          </div>
          <div className="profile-hero-info">
            <p className="profile-label">STUDENT</p>
            <h2>{profile.name}</h2>
            <p className="profile-subtitle">{profile.headline || 'Add your professional headline'}</p>
            <p className="profile-college">🎓 {profile.college || 'College not added'}</p>
            <p className="profile-location">📍 {profile.location || 'Location not added'}</p>
          </div>
        </div>

        <div className="profile-completion">
          <div className="completion-circle" style={{ '--progress': `${completion * 3.6}deg` }}>
            <span>{completion}%</span>
          </div>
          <div>
            <strong>Profile Completion</strong>
            <p>{completion === 100 ? 'Your profile is complete!' : 'Complete your profile to stand out.'}</p>
          </div>
        </div>
      </section>

      <section className="profile-display-card">
        <div className="display-heading">
          <div className="section-icon">📝</div>
          <div>
            <h2>About Me</h2>
            <p>A quick introduction about your professional goals.</p>
          </div>
        </div>
        <p className="profile-about-text">{profile.about}</p>
      </section>

      <div className="profile-two-column">
        <section className="profile-display-card">
          <div className="display-heading">
            <div className="section-icon">🎓</div>
            <div>
              <h2>Academic Information</h2>
              <p>Your current education details.</p>
            </div>
          </div>
          <div className="display-grid">
            <div><span>Degree</span><strong>{profile.degree || '—'}</strong></div>
            <div><span>Branch</span><strong>{profile.branch || '—'}</strong></div>
            <div><span>Specialization</span><strong>{profile.specialization || '—'}</strong></div>
            <div><span>Year</span><strong>{profile.year || '—'}</strong></div>
            <div><span>Semester</span><strong>{profile.semester || '—'}</strong></div>
            <div><span>CGPA</span><strong>{profile.cgpa || '—'}</strong></div>
          </div>
        </section>

        <section className="profile-display-card">
          <div className="display-heading">
            <div className="section-icon">📞</div>
            <div>
              <h2>Contact Information</h2>
              <p>Information for professional communication.</p>
            </div>
          </div>
          <div className="display-grid">
            <div><span>Email</span><strong>{profile.email || '—'}</strong></div>
            <div><span>Phone</span><strong>{profile.phone || '—'}</strong></div>
            <div><span>Location</span><strong>{profile.location || '—'}</strong></div>
            <div><span>College</span><strong>{profile.college || '—'}</strong></div>
          </div>
        </section>
      </div>

      <section className="profile-display-card">
        <div className="display-heading">
          <div className="section-icon">🛠️</div>
          <div>
            <h2>Skills</h2>
            <p>Technologies and capabilities you can offer.</p>
          </div>
        </div>
        <div className="profile-skills">
          {profile.skills?.length ? profile.skills.map(skill => (
            <span className="profile-skill" key={skill}>{skill}</span>
          )) : <p className="profile-muted">No skills added yet.</p>}
        </div>
      </section>

      <section className="profile-display-card">
        <div className="display-heading">
          <div className="section-icon">💼</div>
          <div>
            <h2>Career Preferences</h2>
            <p>What kind of opportunity are you looking for?</p>
          </div>
        </div>
        <div className="career-grid">
          <div className="career-item"><span>Preferred Role</span><strong>{profile.preferredRole || 'Not specified'}</strong></div>
          <div className="career-item"><span>Industry</span><strong>{profile.industry || 'Not specified'}</strong></div>
          <div className="career-item"><span>Job Type</span><strong>{profile.jobType || 'Not specified'}</strong></div>
          <div className="career-item"><span>Preferred Location</span><strong>{profile.preferredLocation || 'Not specified'}</strong></div>
        </div>
      </section>

      <section className="profile-display-card">
        <div className="display-heading">
          <div className="section-icon">🔗</div>
          <div>
            <h2>Professional Links</h2>
            <p>Connect your professional presence.</p>
          </div>
        </div>
        <div className="professional-links">
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noreferrer">
              <span>💻</span><div><strong>GitHub</strong><small>View source code and projects</small></div><b>↗</b>
            </a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <span>in</span><div><strong>LinkedIn</strong><small>View professional profile</small></div><b>↗</b>
            </a>
          )}
          {profile.portfolio && (
            <a href={profile.portfolio} target="_blank" rel="noreferrer">
              <span>🌐</span><div><strong>Portfolio</strong><small>View personal portfolio</small></div><b>↗</b>
            </a>
          )}
          {!profile.github && !profile.linkedin && !profile.portfolio && (
            <p className="profile-muted">No professional links added yet. Click Edit Profile to add them.</p>
          )}
        </div>
      </section>

      <div className="profile-two-column">
        <section className="profile-display-card">
          <div className="display-heading">
            <div className="section-icon">🏆</div>
            <div>
              <h2>Achievements</h2>
              <p>Your notable achievements.</p>
            </div>
          </div>
          <div className="achievement-list">
            {profile.achievements?.length ? profile.achievements.map((item, index) => (
              <div className="achievement-item" key={`${item}-${index}`}><span>🏆</span><strong>{item}</strong></div>
            )) : <p className="profile-muted">No achievements added yet.</p>}
          </div>
        </section>

        <section className="profile-display-card">
          <div className="display-heading">
            <div className="section-icon">📜</div>
            <div>
              <h2>Certifications</h2>
              <p>Courses and professional certifications.</p>
            </div>
          </div>
          <div className="achievement-list">
            {profile.certifications?.length ? profile.certifications.map((item, index) => (
              <div className="achievement-item" key={`${item}-${index}`}><span>📜</span><strong>{item}</strong></div>
            )) : <p className="profile-muted">No certifications added yet.</p>}
          </div>
        </section>
      </div>

      <section className="profile-statistics">
        <div className="profile-stat"><strong>{applicationCount}</strong><span>Applications</span></div>
        <div className="profile-stat"><strong>{internshipCount}</strong><span>Internships</span></div>
        <div className="profile-stat"><strong>{projectCount}</strong><span>Projects</span></div>
        <div className="profile-stat"><strong>{profile.skills?.length || 0}</strong><span>Skills</span></div>
        <div className="profile-stat"><strong>{profile.certifications?.length || 0}</strong><span>Certificates</span></div>
      </section>

      <section className="profile-resume-card">
        <div className="resume-left">
          <div className="resume-icon">📄</div>
          <div>
            <p className="page-tag">CAREER DOCUMENT</p>
            <h2>{profile.resumeName || 'My Resume'}</h2>
            <p>{profile.resumeName ? 'Latest resume uploaded.' : 'Upload your resume to complete your profile.'}</p>
          </div>
        </div>
        <div className="resume-actions">
          {profile.resumeUrl && (
            <a className="resume-upload-btn" href={profile.resumeUrl} target="_blank" rel="noreferrer">View Resume</a>
          )}
          <button type="button" onClick={() => {
            setForm(profile)
            setEditing(true)
          }}>
            {profile.resumeName ? 'Replace Resume' : 'Upload Resume'}
          </button>
        </div>
      </section>

      <section className="quick-actions-card">
        <div>
          <p className="page-tag">QUICK ACTIONS</p>
          <h2>Build your career profile</h2>
          <p>Explore opportunities and keep your professional information updated.</p>
        </div>
        <div className="quick-action-buttons">
          <button type="button" onClick={() => quickNavigate('projects')}>💻 Projects</button>
          <button type="button" onClick={() => quickNavigate('internships')}>🎯 Internships</button>
          <button type="button" onClick={() => quickNavigate('jobs')}>💼 Jobs</button>
          <button type="button" onClick={() => quickNavigate('portfolio')}>🏆 Portfolio</button>
        </div>
      </section>
    </div>
  )
}

export default StudentProfile
