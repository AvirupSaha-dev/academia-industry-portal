import React, { useMemo, useState } from 'react'
import './InstitutionPortal.css'

const seedData = {
  students: [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@gmail.com', department: 'CSE', year: '3rd Year', cgpa: '8.7', status: 'Active' },
    { id: 2, name: 'Priya Das', email: 'priya@gmail.com', department: 'IT', year: '4th Year', cgpa: '9.1', status: 'Active' },
    { id: 3, name: 'Arjun Roy', email: 'arjun@gmail.com', department: 'ECE', year: '3rd Year', cgpa: '8.2', status: 'Pending' },
    { id: 4, name: 'Sneha Paul', email: 'sneha@gmail.com', department: 'CSE', year: '4th Year', cgpa: '9.0', status: 'Active' },
  ],
  industries: [
    { id: 1, company: 'TCS', contact: 'HR Team', email: 'hr@tcs.com', sector: 'IT Services', status: 'Approved' },
    { id: 2, company: 'Infosys', contact: 'Recruitment', email: 'hr@infosys.com', sector: 'IT Services', status: 'Approved' },
    { id: 3, company: 'Wipro', contact: 'Campus Team', email: 'campus@wipro.com', sector: 'Technology', status: 'Pending' },
  ],
  faculty: [
    { id: 1, name: 'Dr. Ananya Sen', email: 'ananya@college.edu', department: 'CSE', designation: 'Professor', status: 'Active' },
    { id: 2, name: 'Dr. Amit Das', email: 'amit@college.edu', department: 'ECE', designation: 'Associate Professor', status: 'Active' },
    { id: 3, name: 'Dr. Riya Paul', email: 'riya@college.edu', department: 'IT', designation: 'Assistant Professor', status: 'Active' },
  ],
  internships: [
    { id: 1, title: 'Frontend Developer Intern', company: 'TCS', mode: 'Hybrid', stipend: '₹15,000', deadline: '30 Sep 2026', status: 'Approved' },
    { id: 2, title: 'Data Science Intern', company: 'Infosys', mode: 'Remote', stipend: '₹20,000', deadline: '10 Oct 2026', status: 'Pending' },
    { id: 3, title: 'Software Engineer Intern', company: 'Wipro', mode: 'On-site', stipend: '₹18,000', deadline: '15 Oct 2026', status: 'Approved' },
  ],
}

const loadData = (key) => {
  try {
    const saved = localStorage.getItem(`admin_${key}`)
    return saved ? JSON.parse(saved) : seedData[key]
  } catch {
    return seedData[key]
  }
}

export default function InstitutionPortal({ onLogout, currentPage, setCurrentPage }) {
  const [page, setPage] = useState(currentPage || 'dashboard')
  const [search, setSearch] = useState('')
  const [modal, setModal] = useState(null)
  const [selected, setSelected] = useState(null)

  const [students, setStudents] = useState(() => loadData('students'))
  const [industries, setIndustries] = useState(() => loadData('industries'))
  const [faculty, setFaculty] = useState(() => loadData('faculty'))
  const [internships, setInternships] = useState(() => loadData('internships'))

  const navigate = (p) => {
    setPage(p)
    setSearch('')
    if (setCurrentPage) setCurrentPage(p)
  }

  const save = (key, data) => {
    localStorage.setItem(`admin_${key}`, JSON.stringify(data))
  }

  const filtered = (data) =>
    data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    )

  const stats = useMemo(() => ({
    students: students.length,
    industries: industries.length,
    faculty: faculty.length,
    internships: internships.length,
    placements: 78,
    readiness: 72,
  }), [students, industries, faculty, internships])

  const deleteItem = (type, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return

    const setters = {
      students: [students, setStudents],
      industries: [industries, setIndustries],
      faculty: [faculty, setFaculty],
      internships: [internships, setInternships],
    }

    const [data, setter] = setters[type]
    const updated = data.filter((x) => x.id !== id)

    setter(updated)
    save(type, updated)
  }

  const updateStatus = (type, id, status) => {
    const setters = {
      students: [students, setStudents],
      industries: [industries, setIndustries],
      faculty: [faculty, setFaculty],
      internships: [internships, setInternships],
    }

    const [data, setter] = setters[type]
    const updated = data.map((x) =>
      x.id === id ? { ...x, status } : x
    )

    setter(updated)
    save(type, updated)
  }

  const downloadCSV = (data, filename) => {
    if (!data.length) return

    const headers = Object.keys(data[0])
    const rows = data.map((item) =>
      headers.map((h) => `"${String(item[h] ?? '').replace(/"/g, '""')}"`).join(',')
    )

    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()

    URL.revokeObjectURL(url)
  }

  const menus = [
    ['dashboard', '📊', 'Dashboard'],
    ['students', '👨‍🎓', 'Students'],
    ['industries', '🏢', 'Industries'],
    ['faculty', '👨‍🏫', 'Faculty'],
    ['internships', '💼', 'Internships'],
    ['placements', '📈', 'Placements'],
    ['skill-analytics', '🧠', 'Skill Analytics'],
    ['reports', '📄', 'Reports'],
  ]

  const titles = {
    dashboard: 'Admin Dashboard',
    students: 'Student Management',
    industries: 'Industry Management',
    faculty: 'Faculty Management',
    internships: 'Internship Management',
    placements: 'Placement Analytics',
    'skill-analytics': 'Skill Analytics',
    reports: 'Reports & Data',
  }

  const renderTable = (type, data, columns) => {
    const list = filtered(data)

    return (
      <div className="admin-table-card">
        <div className="table-top">
          <div>
            <h3>{titles[type]}</h3>
            <span>{list.length} records found</span>
          </div>

          <div className="table-actions">
            <input
              className="admin-search"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              className="add-btn"
              onClick={() => setModal({ type, mode: 'add' })}
            >
              + Add
            </button>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                {columns.map((c) => <th key={c.key}>{c.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {list.map((item) => (
                <tr key={item.id}>
                  {columns.map((c) => (
                    <td key={c.key}>
                      {c.key === 'status' ? (
                        <span className={`status ${String(item[c.key]).toLowerCase()}`}>
                          {item[c.key]}
                        </span>
                      ) : (
                        item[c.key]
                      )}
                    </td>
                  ))}

                  <td>
                    <div className="row-actions">
                      <button
                        className="view-btn"
                        onClick={() => setSelected(item)}
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          setModal({ type, mode: 'edit', item })
                        }
                      >
                        Edit
                      </button>

                      {item.status === 'Pending' && (
                        <>
                          <button
                            className="approve-btn"
                            onClick={() => updateStatus(type, item.id, 'Approved')}
                          >
                            ✓
                          </button>

                          <button
                            className="reject-btn"
                            onClick={() => updateStatus(type, item.id, 'Rejected')}
                          >
                            ✕
                          </button>
                        </>
                      )}

                      <button
                        className="delete-btn"
                        onClick={() => deleteItem(type, item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!list.length && (
                <tr>
                  <td colSpan={columns.length + 1} className="empty">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    if (page === 'dashboard') {
      return (
        <>
          <div className="welcome">
            <div>
              <h2>Welcome, Admin 👋</h2>
              <p>Manage your institution's academic and industry ecosystem.</p>
            </div>
            <div className="date-box">
              📅 {new Date().toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card blue">
              <span>👨‍🎓</span>
              <div>
                <small>Total Students</small>
                <strong>{stats.students}</strong>
                <em>Active student records</em>
              </div>
            </div>

            <div className="stat-card purple">
              <span>🏢</span>
              <div>
                <small>Industry Partners</small>
                <strong>{stats.industries}</strong>
                <em>Registered companies</em>
              </div>
            </div>

            <div className="stat-card green">
              <span>👨‍🏫</span>
              <div>
                <small>Faculty Members</small>
                <strong>{stats.faculty}</strong>
                <em>Teaching staff</em>
              </div>
            </div>

            <div className="stat-card orange">
              <span>💼</span>
              <div>
                <small>Internships</small>
                <strong>{stats.internships}</strong>
                <em>Available opportunities</em>
              </div>
            </div>

            <div className="stat-card teal">
              <span>📈</span>
              <div>
                <small>Placement Rate</small>
                <strong>{stats.placements}%</strong>
                <em>Current academic year</em>
              </div>
            </div>

            <div className="stat-card pink">
              <span>🧠</span>
              <div>
                <small>Career Readiness</small>
                <strong>{stats.readiness}%</strong>
                <em>Average student readiness</em>
              </div>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="panel">
              <div className="panel-head">
                <h3>Student Performance</h3>
                <button onClick={() => navigate('skill-analytics')}>View Analytics →</button>
              </div>

              <div className="bar-chart">
                <div><span>Excellent</span><b style={{ width: '82%' }}>82%</b></div>
                <div><span>Good</span><b style={{ width: '68%' }}>68%</b></div>
                <div><span>Average</span><b style={{ width: '48%' }}>48%</b></div>
                <div><span>Needs Support</span><b style={{ width: '25%' }}>25%</b></div>
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <h3>Quick Actions</h3>
              </div>

              <div className="quick-actions">
                <button onClick={() => setModal({ type: 'students', mode: 'add' })}>
                  👨‍🎓 Add Student
                </button>
                <button onClick={() => setModal({ type: 'industries', mode: 'add' })}>
                  🏢 Add Industry
                </button>
                <button onClick={() => setModal({ type: 'faculty', mode: 'add' })}>
                  👨‍🏫 Add Faculty
                </button>
                <button onClick={() => setModal({ type: 'internships', mode: 'add' })}>
                  💼 Add Internship
                </button>
              </div>
            </div>
          </div>
        </>
      )
    }

    if (page === 'students') {
      return renderTable('students', students, [
        { key: 'name', label: 'Student' },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department' },
        { key: 'year', label: 'Year' },
        { key: 'cgpa', label: 'CGPA' },
        { key: 'status', label: 'Status' },
      ])
    }

    if (page === 'industries') {
      return renderTable('industries', industries, [
        { key: 'company', label: 'Company' },
        { key: 'contact', label: 'Contact' },
        { key: 'email', label: 'Email' },
        { key: 'sector', label: 'Sector' },
        { key: 'status', label: 'Status' },
      ])
    }

    if (page === 'faculty') {
      return renderTable('faculty', faculty, [
        { key: 'name', label: 'Faculty' },
        { key: 'email', label: 'Email' },
        { key: 'department', label: 'Department' },
        { key: 'designation', label: 'Designation' },
        { key: 'status', label: 'Status' },
      ])
    }

    if (page === 'internships') {
      return renderTable('internships', internships, [
        { key: 'title', label: 'Opportunity' },
        { key: 'company', label: 'Company' },
        { key: 'mode', label: 'Mode' },
        { key: 'stipend', label: 'Stipend' },
        { key: 'deadline', label: 'Deadline' },
        { key: 'status', label: 'Status' },
      ])
    }

    if (page === 'placements') {
      return (
        <div className="analytics-page">
          <div className="analytics-cards">
            <div><span>📈</span><small>Placement Rate</small><strong>78%</strong></div>
            <div><span>🎯</span><small>Students Placed</small><strong>974</strong></div>
            <div><span>💰</span><small>Average Package</small><strong>₹7.8 LPA</strong></div>
            <div><span>🏆</span><small>Highest Package</small><strong>₹32 LPA</strong></div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <h3>Placement by Department</h3>
            </div>

            <div className="bar-chart large">
              <div><span>CSE</span><b style={{ width: '92%' }}>92%</b></div>
              <div><span>IT</span><b style={{ width: '88%' }}>88%</b></div>
              <div><span>ECE</span><b style={{ width: '76%' }}>76%</b></div>
              <div><span>EE</span><b style={{ width: '69%' }}>69%</b></div>
              <div><span>ME</span><b style={{ width: '61%' }}>61%</b></div>
            </div>
          </div>
        </div>
      )
    }

    if (page === 'skill-analytics') {
      return (
        <div className="analytics-page">
          <div className="analytics-cards">
            <div><span>💻</span><small>Top Skill</small><strong>Python</strong></div>
            <div><span>⚛️</span><small>Students with React</small><strong>426</strong></div>
            <div><span>☁️</span><small>Cloud Skills</small><strong>318</strong></div>
            <div><span>📊</span><small>Avg. Skill Score</small><strong>74%</strong></div>
          </div>

          <div className="dashboard-grid">
            <div className="panel">
              <div className="panel-head"><h3>Most In-Demand Skills</h3></div>

              <div className="skill-list">
                {[
                  ['Python', 86],
                  ['JavaScript', 79],
                  ['React', 72],
                  ['SQL', 68],
                  ['Java', 63],
                  ['Cloud / AWS', 54],
                ].map(([skill, value]) => (
                  <div className="skill-row" key={skill}>
                    <span>{skill}</span>
                    <div><i style={{ width: `${value}%` }} /></div>
                    <b>{value}%</b>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head"><h3>Readiness Overview</h3></div>
              <div className="readiness-circle">
                <strong>72%</strong>
                <span>Career Ready</span>
              </div>
              <p className="center-text">
                Students meeting the current industry skill requirements.
              </p>
            </div>
          </div>
        </div>
      )
    }

    if (page === 'reports') {
      return (
        <div className="reports-grid">
          {[
            ['📊', 'Student Report', 'Complete student and academic overview', students, 'students-report.csv'],
            ['🏢', 'Industry Report', 'Registered industry partner details', industries, 'industry-report.csv'],
            ['💼', 'Internship Report', 'Internship opportunities and status', internships, 'internship-report.csv'],
            ['👨‍🏫', 'Faculty Report', 'Faculty and department information', faculty, 'faculty-report.csv'],
          ].map(([icon, title, description, data, filename]) => (
            <div className="report-card" key={title}>
              <div className="report-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{description}</p>
              <button onClick={() => downloadCSV(data, filename)}>
                ⬇ Download CSV
              </button>
            </div>
          ))}
        </div>
      )
    }

    return null
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="brand-logo">🎓</div>
          <div>
            <strong>CampusConnect</strong>
            <small>Admin Portal</small>
          </div>
        </div>

        <nav>
          <p className="nav-label">MAIN MENU</p>

          {menus.map(([id, icon, label]) => (
            <button
              key={id}
              className={page === id ? 'active' : ''}
              onClick={() => navigate(id)}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <button onClick={() => alert('Settings module ready for backend integration.')}>
            ⚙️ Settings
          </button>

          <button className="logout-btn" onClick={onLogout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h1>{titles[page]}</h1>
            <p>Institution Administration</p>
          </div>

          <div className="admin-user">
            <button className="notification">🔔<i>3</i></button>
            <div className="avatar">AD</div>
            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </header>

        <section className="admin-content">
          {renderContent()}
        </section>
      </main>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="details-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={() => setSelected(null)}>×</button>
            <h2>Record Details</h2>

            {Object.entries(selected).map(([key, value]) => (
              <div className="detail-row" key={key}>
                <span>{key}</span>
                <strong>{value}</strong>
              </div>
            ))}

            <button className="modal-close" onClick={() => setSelected(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      {modal && (
        <AdminFormModal
          modal={modal}
          close={() => setModal(null)}
          students={students}
          setStudents={setStudents}
          industries={industries}
          setIndustries={setIndustries}
          faculty={faculty}
          setFaculty={setFaculty}
          internships={internships}
          setInternships={setInternships}
          save={save}
        />
      )}
    </div>
  )
}

function AdminFormModal({
  modal,
  close,
  students,
  setStudents,
  industries,
  setIndustries,
  faculty,
  setFaculty,
  internships,
  setInternships,
  save,
}) {
  const type = modal.type
  const isEdit = modal.mode === 'edit'

  const templates = {
    students: {
      title: 'Student',
      fields: [
        ['name', 'Name', 'text'],
        ['email', 'Email', 'email'],
        ['department', 'Department', 'text'],
        ['year', 'Year', 'text'],
        ['cgpa', 'CGPA', 'text'],
        ['status', 'Status', 'select'],
      ],
    },
    industries: {
      title: 'Industry',
      fields: [
        ['company', 'Company Name', 'text'],
        ['contact', 'Contact Person', 'text'],
        ['email', 'Email', 'email'],
        ['sector', 'Sector', 'text'],
        ['status', 'Status', 'select'],
      ],
    },
    faculty: {
      title: 'Faculty',
      fields: [
        ['name', 'Name', 'text'],
        ['email', 'Email', 'email'],
        ['department', 'Department', 'text'],
        ['designation', 'Designation', 'text'],
        ['status', 'Status', 'select'],
      ],
    },
    internships: {
      title: 'Internship',
      fields: [
        ['title', 'Opportunity Title', 'text'],
        ['company', 'Company', 'text'],
        ['mode', 'Mode', 'text'],
        ['stipend', 'Stipend', 'text'],
        ['deadline', 'Deadline', 'text'],
        ['status', 'Status', 'select'],
      ],
    },
  }

  const config = templates[type]

  const [form, setForm] = useState(
    modal.item || Object.fromEntries(
      config.fields.map(([key]) => [key, key === 'status' ? 'Pending' : ''])
    )
  )

  const handleSubmit = (e) => {
    e.preventDefault()

    const dataMap = {
      students: [students, setStudents],
      industries: [industries, setIndustries],
      faculty: [faculty, setFaculty],
      internships: [internships, setInternships],
    }

    const [data, setter] = dataMap[type]

    let updated

    if (isEdit) {
      updated = data.map((item) =>
        item.id === modal.item.id ? { ...form, id: item.id } : item
      )
    } else {
      updated = [...data, { ...form, id: Date.now() }]
    }

    setter(updated)
    save(type, updated)
    close()
  }

  return (
    <div className="modal-overlay">
      <form className="form-modal" onSubmit={handleSubmit}>
        <button type="button" className="close" onClick={close}>×</button>

        <h2>{isEdit ? 'Edit' : 'Add'} {config.title}</h2>
        <p>Enter the required information below.</p>

        {config.fields.map(([key, label, inputType]) => (
          <label key={key}>
            {label}

            {inputType === 'select' ? (
              <select
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              >
                <option>Pending</option>
                <option>Active</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            ) : (
              <input
                type={inputType}
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
                required
              />
            )}
          </label>
        ))}

        <div className="form-buttons">
          <button type="button" onClick={close}>Cancel</button>
          <button type="submit">{isEdit ? 'Save Changes' : 'Add Record'}</button>
        </div>
      </form>
    </div>
  )
}