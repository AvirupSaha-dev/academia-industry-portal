import { useState } from 'react'
import './Internships.css'

function Internships() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locationFilter, setLocationFilter] = useState('All Locations')
  const [typeFilter, setTypeFilter] = useState('All Types')
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [bookmarked, setBookmarked] = useState([])

  const [appliedInternships, setAppliedInternships] = useState([])

  const internships = [
    {
      id: 1,
      title: 'Frontend Development Intern',
      company: 'Digital Solutions India',
      location: 'Kolkata',
      type: 'Hybrid',
      duration: '6 Months',
      stipend: '₹15,000/month',
      skills: ['React', 'JavaScript', 'CSS'],
      description:
        'Work with the frontend team to build modern and responsive web applications. You will work on real-world projects and gain practical experience in frontend development.',
    },

    {
      id: 2,
      title: 'Data Science Intern',
      company: 'HealthTech Research',
      location: 'Kolkata',
      type: 'On-site',
      duration: '3 Months',
      stipend: '₹18,000/month',
      skills: ['Python', 'Data Science', 'SQL'],
      description:
        'Analyze real-world datasets and create data-driven insights for healthcare applications. You will work with data scientists and learn practical data analysis techniques.',
    },

    {
      id: 3,
      title: 'Full Stack Developer Intern',
      company: 'Tech Innovations Pvt. Ltd.',
      location: 'Kolkata',
      type: 'Hybrid',
      duration: '6 Months',
      stipend: '₹22,000/month',
      skills: ['React', 'Node.js', 'MongoDB'],
      description:
        'Build and maintain full-stack applications using modern web technologies. Work with frontend and backend teams to develop scalable applications.',
    },

    {
      id: 4,
      title: 'Machine Learning Intern',
      company: 'Future AI Labs',
      location: 'Remote',
      type: 'Remote',
      duration: '4 Months',
      stipend: '₹20,000/month',
      skills: ['Python', 'Machine Learning', 'Pandas'],
      description:
        'Develop and evaluate machine learning models using real-world datasets. Gain hands-on experience in data preprocessing, model training and evaluation.',
    },

    {
      id: 5,
      title: 'AI Research Intern',
      company: 'NextGen Technologies',
      location: 'Bangalore',
      type: 'On-site',
      duration: '6 Months',
      stipend: '₹25,000/month',
      skills: ['Python', 'AI', 'Deep Learning'],
      description:
        'Assist the AI research team in developing innovative machine learning and deep learning solutions for real-world applications.',
    },

    {
      id: 6,
      title: 'Software Development Intern',
      company: 'CodeWorks India',
      location: 'Remote',
      type: 'Remote',
      duration: '3 Months',
      stipend: '₹16,000/month',
      skills: ['Java', 'Python', 'Git'],
      description:
        'Work with experienced developers to build software applications, fix bugs and understand professional software development workflows.',
    },
  ]

  // =========================
  // FILTER INTERNSHIPS
  // =========================

  const filteredInternships = internships.filter((internship) => {
    const search = searchTerm.toLowerCase()

    const matchesSearch =
      internship.title.toLowerCase().includes(search) ||
      internship.company.toLowerCase().includes(search) ||
      internship.location.toLowerCase().includes(search) ||
      internship.skills.some((skill) =>
        skill.toLowerCase().includes(search)
      )

    const matchesLocation =
      locationFilter === 'All Locations' ||
      internship.location === locationFilter

    const matchesType =
      typeFilter === 'All Types' ||
      internship.type === typeFilter

    return matchesSearch && matchesLocation && matchesType
  })

  // =========================
  // BOOKMARK
  // =========================

  const toggleBookmark = (id) => {
    setBookmarked((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id)
      }

      return [...previous, id]
    })
  }

  // =========================
  // APPLY
  // =========================

  const handleApply = (internship) => {
    if (appliedInternships.includes(internship.id)) {
        alert('You have already applied for this internship.')
        return
    }

    const newApplication = {
        id: Date.now(),

        internshipId: internship.id,

        title: internship.title,

        company: internship.company,

        location: internship.location,

        type: internship.type,

        duration: internship.duration,

        stipend: internship.stipend,

        skills: internship.skills,

        status: 'Under Review',

        appliedDate: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        }),
    }

    const existingApplications =
        JSON.parse(
        localStorage.getItem('applications')
        ) || []

    const updatedApplications = [
        ...existingApplications,
        newApplication,
    ]

    localStorage.setItem(
        'applications',
        JSON.stringify(updatedApplications)
    )

    setAppliedInternships((previous) => [
        ...previous,
        internship.id,
    ])

    alert(
        `Application submitted successfully for ${internship.title}!`
    )

    setSelectedInternship(null)
    }

  return (
    <div className="internships-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="internships-header">

        <div>
          <p className="page-tag">
            OPPORTUNITIES
          </p>

          <h1>
            Internships
          </h1>

          <p className="page-description">
            Discover internships that match your skills and career goals.
          </p>
        </div>

        <div className="internship-count">
          <strong>
            {filteredInternships.length}
          </strong>

          <span>
            Available Internships
          </span>
        </div>

      </div>


      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="internships-toolbar">

        <input
          type="text"
          placeholder="Search internships, companies or skills..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="filter-select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option>
            All Locations
          </option>

          <option>
            Kolkata
          </option>

          <option>
            Remote
          </option>

          <option>
            Bangalore
          </option>
        </select>

        <select
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>
            All Types
          </option>

          <option>
            Remote
          </option>

          <option>
            Hybrid
          </option>

          <option>
            On-site
          </option>
        </select>

      </div>


      {/* =========================
          RESULT INFO
      ========================= */}

      <div className="results-row">

        <span>
          Showing {filteredInternships.length} internships
        </span>

        {(searchTerm ||
          locationFilter !== 'All Locations' ||
          typeFilter !== 'All Types') && (

          <button
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('')
              setLocationFilter('All Locations')
              setTypeFilter('All Types')
            }}
          >
            Clear Filters
          </button>

        )}

      </div>


      {/* =========================
          INTERNSHIP GRID
      ========================= */}

      {filteredInternships.length > 0 ? (

        <div className="internships-grid">

          {filteredInternships.map((internship) => (

            <div
              className="internship-card"
              key={internship.id}
            >

              {/* TOP */}

              <div className="internship-top">

                <span className="internship-label">
                  Internship
                </span>

                <button
                  className={`heart-btn ${
                    bookmarked.includes(internship.id)
                      ? 'bookmarked'
                      : ''
                  }`}
                  onClick={() =>
                    toggleBookmark(internship.id)
                  }
                >
                  {bookmarked.includes(internship.id)
                    ? '♥'
                    : '♡'}
                </button>

              </div>


              {/* TITLE */}

              <h2>
                {internship.title}
              </h2>


              {/* COMPANY */}

              <p className="company-name">
                🏢 {internship.company}
              </p>


              {/* META */}

              <div className="internship-meta">

                <span>
                  📍 {internship.location}
                </span>

                <span>
                  💼 {internship.type}
                </span>

                <span>
                  ◷ {internship.duration}
                </span>

              </div>


              {/* STIPEND */}

              <div className="stipend">
                💰 {internship.stipend}
              </div>


              {/* SKILLS */}

              <div className="skills">

                {internship.skills.map(
                  (skill, index) => (
                    <span key={index}>
                      {skill}
                    </span>
                  )
                )}

              </div>


              {/* DESCRIPTION */}

              <p className="internship-description">
                {internship.description}
              </p>


              {/* BUTTON */}

              <button
                className="view-details-btn"
                onClick={() =>
                  setSelectedInternship(internship)
                }
              >
                {appliedInternships.includes(internship.id)
                  ? 'Applied ✓'
                  : 'View Details →'}
              </button>

            </div>

          ))}

        </div>

      ) : (

        /* =========================
           NO RESULTS
        ========================= */

        <div className="no-results">

          <div className="no-results-icon">
            🔍
          </div>

          <h2>
            No internships found
          </h2>

          <p>
            Try changing your search or filters.
          </p>

          <button
            onClick={() => {
              setSearchTerm('')
              setLocationFilter('All Locations')
              setTypeFilter('All Types')
            }}
          >
            Clear Filters
          </button>

        </div>

      )}


      {/* =========================
          DETAILS MODAL
      ========================= */}

      {selectedInternship && (

        <div
          className="internship-modal-overlay"
          onClick={() =>
            setSelectedInternship(null)
          }
        >

          <div
            className="internship-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              className="modal-close-btn"
              onClick={() =>
                setSelectedInternship(null)
              }
            >
              ×
            </button>


            {/* LABEL */}

            <span className="internship-label">
              Internship
            </span>


            {/* TITLE */}

            <h2>
              {selectedInternship.title}
            </h2>


            {/* COMPANY */}

            <p className="company-name">
              🏢 {selectedInternship.company}
            </p>


            {/* DETAILS */}

            <div className="internship-detail-grid">

              <div>
                <span>
                  Location
                </span>

                <strong>
                  📍 {selectedInternship.location}
                </strong>
              </div>


              <div>
                <span>
                  Work Type
                </span>

                <strong>
                  💼 {selectedInternship.type}
                </strong>
              </div>


              <div>
                <span>
                  Duration
                </span>

                <strong>
                  ◷ {selectedInternship.duration}
                </strong>
              </div>


              <div>
                <span>
                  Stipend
                </span>

                <strong>
                  💰 {selectedInternship.stipend}
                </strong>
              </div>

            </div>


            {/* ABOUT */}

            <h3>
              About this Internship
            </h3>

            <p className="modal-description">
              {selectedInternship.description}
            </p>


            {/* SKILLS */}

            <h3>
              Required Skills
            </h3>

            <div className="skills modal-skills">

              {selectedInternship.skills.map(
                (skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                )
              )}

            </div>


            {/* APPLY */}

            <button
              className="apply-internship-btn"
              onClick={() =>
                handleApply(selectedInternship)
              }
              disabled={appliedInternships.includes(
                selectedInternship.id
              )}
            >
              {appliedInternships.includes(
                selectedInternship.id
              )
                ? 'Application Submitted ✓'
                : 'Apply Now →'}
            </button>

          </div>

        </div>

      )}

    </div>
  )
}

export default Internships