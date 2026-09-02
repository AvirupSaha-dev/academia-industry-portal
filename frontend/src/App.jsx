import { useState } from 'react'
import './App.css'

import Projects from './Projects'
import SkillAssessment from './pages/student/SkillAssessment'
import SkillProfile from './pages/student/SkillProfile'
import Internships from './pages/student/Internships'
import InternshipDetails from './pages/student/InternshipDetails'
import Applications from './pages/student/Applications'


function App() {

  /* =========================
     AUTH STATES
  ========================= */

  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('')

  const [currentPage, setCurrentPage] = useState('dashboard')


  /* =========================
     INTERNSHIP
  ========================= */

  const [selectedInternship, setSelectedInternship] = useState(null)


  /* =========================
     SKILL ASSESSMENT
  ========================= */

  const [skillAnswers, setSkillAnswers] = useState(() => {

    const saved = localStorage.getItem('skillAssessment')

    return saved
      ? JSON.parse(saved)
      : null
  })


  /* =========================
     APPLICATIONS
  ========================= */

  const [applications, setApplications] = useState(() => {

    const saved = localStorage.getItem('applications')

    return saved
      ? JSON.parse(saved)
      : []
  })


  /* =========================
     SKILL PROGRESS
  ========================= */

  const getSkillAssessmentProgress = () => {

    if (!skillAnswers) {
      return 0
    }

    const totalSkills = 9

    const answeredSkills =
      Object.values(skillAnswers).filter(
        (answer) => answer !== ''
      ).length

    return Math.round(
      (answeredSkills / totalSkills) * 100
    )
  }


  const skillAssessmentProgress =
    getSkillAssessmentProgress()


  /* =========================
     SIGNUP
  ========================= */

  const handleSignup = (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)

    const role = formData.get('role')

    if (!role) {

      alert('Please select an account type.')

      return
    }

    setUserRole(role)

    setCurrentPage('dashboard')

    setIsLoggedIn(true)

    setShowSignup(false)
  }


  /* =========================
     LOGIN
  ========================= */

  const handleLogin = (e) => {

    e.preventDefault()

    // Temporary frontend login
    // Backend will be connected later

    setUserRole('student')

    setCurrentPage('dashboard')

    setIsLoggedIn(true)

    setShowLogin(false)
  }


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    setIsLoggedIn(false)

    setUserRole('')

    setCurrentPage('dashboard')
  }


  /* =========================
     PROJECT APPLICATION
  ========================= */

  const handleProjectApply = (project) => {

    const alreadyApplied = applications.some(
      (application) =>
        application.id === project.id &&
        application.type === 'Project'
    )


    if (alreadyApplied) {

      alert(
        'You have already applied for this project.'
      )

      return
    }


    const newApplication = {

      id: project.id,

      title: project.title,

      company: project.company,

      location: project.location,

      duration: project.duration,

      skills: project.skills || [],

      description: project.description || '',

      type: 'Project',

      status: 'Applied',

      appliedDate:
        new Date().toLocaleDateString(),

    }


    const updatedApplications = [
      ...applications,
      newApplication,
    ]


    setApplications(
      updatedApplications
    )


    localStorage.setItem(
      'applications',
      JSON.stringify(
        updatedApplications
      )
    )


    alert(
      `Application submitted for ${project.title}!`
    )
  }


  /* =========================
     INTERNSHIP APPLICATION
  ========================= */

  const handleInternshipApply = (internship) => {

    const alreadyApplied = applications.some(
      (application) =>
        application.id === internship.id &&
        application.type === 'Internship'
    )


    if (alreadyApplied) {

      alert(
        'You have already applied for this internship.'
      )

      return
    }


    const newApplication = {

      id: internship.id,

      title: internship.title,

      company: internship.company,

      location: internship.location,

      duration: internship.duration,

      skills: internship.skills || [],

      description:
        internship.description || '',

      type: 'Internship',

      status: 'Applied',

      appliedDate:
        new Date().toLocaleDateString(),

    }


    const updatedApplications = [
      ...applications,
      newApplication,
    ]


    setApplications(
      updatedApplications
    )


    localStorage.setItem(
      'applications',
      JSON.stringify(
        updatedApplications
      )
    )


    alert(
      `Application submitted for ${internship.title}!`
    )
  }


  /* =====================================================
     STUDENT PORTAL
  ===================================================== */

  if (
    isLoggedIn &&
    userRole === 'student'
  ) {

    return (

      <div className="dashboard">


        {/* =========================
           SIDEBAR
        ========================= */}

        <aside className="sidebar">


          <div className="dashboard-logo">

            Academia
            <span>Industry</span>

          </div>


          <div className="sidebar-role">

            🎓 Student

          </div>


          <nav className="sidebar-nav">


            {/* DASHBOARD */}

            <button
              className={
                currentPage === 'dashboard'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCurrentPage('dashboard')
              }
            >
              🏠 Dashboard
            </button>


            {/* PROJECTS */}

            <button
              className={
                currentPage === 'projects'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCurrentPage('projects')
              }
            >
              💼 Projects
            </button>


            {/* SKILL ASSESSMENT */}

            <button
              className={
                currentPage === 'skill-assessment'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCurrentPage(
                  'skill-assessment'
                )
              }
            >
              📝 Skill Assessment
            </button>


            {/* SKILL PROFILE */}

            <button
              className={
                currentPage === 'skill-profile'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCurrentPage(
                  'skill-profile'
                )
              }
            >
              📊 Skill Profile
            </button>


            {/* INTERNSHIPS */}

            <button
              className={
                currentPage === 'internships'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCurrentPage(
                  'internships'
                )
              }
            >
              🎯 Internships
            </button>


            {/* APPLICATIONS */}

            <button
              className={
                currentPage === 'applications'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCurrentPage(
                  'applications'
                )
              }
            >
              📄 Applications
            </button>


            {/* PROFILE */}

            <button
              className={
                currentPage === 'profile'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setCurrentPage('profile')
              }
            >
              👤 My Profile
            </button>


          </nav>


          {/* LOGOUT */}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>


        </aside>


        {/* =================================================
           MAIN CONTENT
        ================================================= */}

        <main className="dashboard-main">


          {/* =================================================
             PROJECTS
          ================================================= */}

          {currentPage === 'projects' ? (

            <Projects
              onApply={handleProjectApply}
            />

          )


          /* =================================================
             SKILL ASSESSMENT
          ================================================= */

          : currentPage === 'skill-assessment' ? (

            <SkillAssessment

              onComplete={(answers) => {

                localStorage.setItem(
                  'skillAssessment',
                  JSON.stringify(answers)
                )

                setSkillAnswers(
                  answers
                )

                setCurrentPage(
                  'skill-profile'
                )
              }}

            />

          )


          /* =================================================
             SKILL PROFILE
          ================================================= */

          : currentPage === 'skill-profile' ? (

            <SkillProfile

              answers={skillAnswers}

              onNavigate={(page) =>
                setCurrentPage(page)
              }

            />

          )


          /* =================================================
             INTERNSHIPS
          ================================================= */

          : currentPage === 'internships' ? (

            <Internships

              onBack={() =>
                setCurrentPage('dashboard')
              }

              onViewDetails={(internship) => {

                setSelectedInternship(
                  internship
                )

                setCurrentPage(
                  'internship-details'
                )

              }}

            />

          )


          /* =================================================
             INTERNSHIP DETAILS
          ================================================= */

          : currentPage === 'internship-details' ? (

            <InternshipDetails

              internship={
                selectedInternship
              }

              onBack={() =>
                setCurrentPage(
                  'internships'
                )
              }

              onApply={
                handleInternshipApply
              }

            />

          )


          /* =================================================
             APPLICATIONS
          ================================================= */

          : currentPage === 'applications' ? (

            <Applications

              applications={
                applications
              }

            />

          )


          /* =================================================
             DASHBOARD
          ================================================= */

          : (

            <>


              {/* =========================
                 DASHBOARD HEADER
              ========================= */}

              <header className="dashboard-header">


                <div>

                  <p className="dashboard-tag">
                    STUDENT PORTAL
                  </p>

                  <h1>
                    Welcome back, Student 👋
                  </h1>

                  <p>
                    Discover opportunities and
                    build your career.
                  </p>

                </div>


                <div className="profile-circle">
                  S
                </div>


              </header>



              {/* =========================
                 STAT CARDS
              ========================= */}

              <section className="stats-grid">


                <div className="stat-card">

                  <div className="stat-icon blue">
                    💼
                  </div>

                  <div>

                    <p>
                      Available Projects
                    </p>

                    <h2>
                      6
                    </h2>

                  </div>

                </div>



                <div className="stat-card">

                  <div className="stat-icon green">
                    🎯
                  </div>

                  <div>

                    <p>
                      Internships
                    </p>

                    <h2>
                      3
                    </h2>

                  </div>

                </div>



                <div
                  className="stat-card"
                  onClick={() =>
                    setCurrentPage(
                      'applications'
                    )
                  }
                  style={{
                    cursor: 'pointer'
                  }}
                >

                  <div className="stat-icon orange">
                    📄
                  </div>

                  <div>

                    <p>
                      Applications
                    </p>

                    <h2>
                      {applications.length}
                    </h2>

                  </div>

                </div>



                <div className="stat-card">

                  <div className="stat-icon purple">
                    ⭐
                  </div>

                  <div>

                    <p>
                      Profile Completion
                    </p>

                    <h2>

                      {skillAnswers
                        ? `${skillAssessmentProgress}%`
                        : '0%'}

                    </h2>

                  </div>

                </div>


              </section>



              {/* =========================
                 OPPORTUNITIES
              ========================= */}

              <section className="dashboard-section">


                <div className="section-title-row">


                  <div>

                    <p className="dashboard-tag">
                      OPPORTUNITIES
                    </p>

                    <h2>
                      Recommended for You
                    </h2>

                  </div>


                  <button
                    className="view-all-btn"
                    onClick={() =>
                      setCurrentPage(
                        'projects'
                      )
                    }
                  >
                    View All
                  </button>


                </div>



                <div className="opportunity-grid">


                  {/* PROJECT */}

                  <div className="opportunity-card">


                    <div className="opportunity-top">

                      <span className="opportunity-type project">
                        Project
                      </span>

                      <span className="bookmark">
                        ♡
                      </span>

                    </div>


                    <h3>
                      AI-Based Student Analytics
                    </h3>


                    <p className="company-name">
                      Tech Innovations Pvt. Ltd.
                    </p>


                    <div className="opportunity-details">

                      <span>
                        📍 Remote
                      </span>

                      <span>
                        ⏱ 3 Months
                      </span>

                    </div>


                    <div className="skills">

                      <span>
                        Python
                      </span>

                      <span>
                        Machine Learning
                      </span>

                      <span>
                        React
                      </span>

                    </div>


                    <button
                      className="apply-btn"
                      onClick={() =>
                        setCurrentPage(
                          'projects'
                        )
                      }
                    >
                      View Opportunity
                    </button>


                  </div>



                  {/* INTERNSHIP */}

                  <div className="opportunity-card">


                    <div className="opportunity-top">

                      <span className="opportunity-type internship">
                        Internship
                      </span>

                      <span className="bookmark">
                        ♡
                      </span>

                    </div>


                    <h3>
                      Frontend Development Intern
                    </h3>


                    <p className="company-name">
                      Digital Solutions India
                    </p>


                    <div className="opportunity-details">

                      <span>
                        📍 Kolkata
                      </span>

                      <span>
                        ⏱ 6 Months
                      </span>

                    </div>


                    <div className="skills">

                      <span>
                        React
                      </span>

                      <span>
                        JavaScript
                      </span>

                      <span>
                        CSS
                      </span>

                    </div>


                    <button
                      className="apply-btn"
                      onClick={() =>
                        setCurrentPage(
                          'internships'
                        )
                      }
                    >
                      View Opportunity
                    </button>


                  </div>



                  {/* PROJECT 2 */}

                  <div className="opportunity-card">


                    <div className="opportunity-top">

                      <span className="opportunity-type project">
                        Project
                      </span>

                      <span className="bookmark">
                        ♡
                      </span>

                    </div>


                    <h3>
                      Smart Healthcare Prediction
                    </h3>


                    <p className="company-name">
                      HealthTech Research
                    </p>


                    <div className="opportunity-details">

                      <span>
                        📍 Hybrid
                      </span>

                      <span>
                        ⏱ 4 Months
                      </span>

                    </div>


                    <div className="skills">

                      <span>
                        Python
                      </span>

                      <span>
                        ML
                      </span>

                      <span>
                        Data Science
                      </span>

                    </div>


                    <button
                      className="apply-btn"
                      onClick={() =>
                        setCurrentPage(
                          'projects'
                        )
                      }
                    >
                      View Opportunity
                    </button>


                  </div>


                </div>


              </section>



              {/* =========================
                 PROFILE COMPLETION
              ========================= */}

              <section className="profile-card">


                <div>

                  <p className="dashboard-tag">
                    YOUR PROFILE
                  </p>

                  <h2>
                    Complete your profile
                  </h2>

                  <p>
                    A complete profile helps
                    companies discover you and
                    increases your chances of
                    getting opportunities.
                  </p>

                </div>


                <div className="profile-progress">


                  <div className="progress-circle">

                    {skillAnswers
                      ? `${skillAssessmentProgress}%`
                      : '0%'}

                  </div>


                  <button
                    className="complete-profile-btn"
                    onClick={() => {

                      if (skillAnswers) {

                        setCurrentPage(
                          'skill-profile'
                        )

                      } else {

                        setCurrentPage(
                          'skill-assessment'
                        )

                      }

                    }}
                  >

                    {skillAnswers
                      ? 'View Skill Profile'
                      : 'Complete Skill Assessment'}

                  </button>


                </div>


              </section>


            </>

          )}


        </main>

      </div>

    )
  }


  /* =====================================================
     HOMEPAGE
  ===================================================== */

  return (

    <div className="app">


      {/* =========================
         NAVBAR
      ========================= */}

      <header className="navbar">


        <div className="logo">

          Academia
          <span>Industry</span>

        </div>


        <nav>

          <a href="#home">
            Home
          </a>

          <a href="#projects">
            Projects
          </a>

          <a href="#companies">
            Companies
          </a>

          <a href="#students">
            Students
          </a>

          <a href="#about">
            About
          </a>

        </nav>


        <div className="nav-actions">


          <button
            className="login-btn"
            onClick={() =>
              setShowLogin(true)
            }
          >
            Login
          </button>


          <button
            className="signup-btn"
            onClick={() =>
              setShowSignup(true)
            }
          >
            Sign Up
          </button>


        </div>


      </header>



      <main>


        {/* =========================
           HERO
        ========================= */}

        <section
          className="hero-section"
          id="home"
        >


          <div className="hero-content">


            <p className="hero-tag">
              ACADEMIA × INDUSTRY
            </p>


            <h1>

              Connecting
              <span> Students</span>

              <br />

              with Industry

            </h1>


            <p className="hero-description">

              A platform that connects students,
              educational institutions, and
              companies to create meaningful
              opportunities and industry-ready talent.

            </p>


            <div className="hero-buttons">


              <button
                className="primary-btn"
                onClick={() =>
                  setShowSignup(true)
                }
              >
                Explore Opportunities
              </button>


              <button className="secondary-btn">
                Learn More
              </button>


            </div>


          </div>



          <div className="hero-card">


            <div className="card-icon">
              🎓
            </div>


            <h2>
              Build. Connect. Grow.
            </h2>


            <p>
              Discover projects, internships,
              collaborations and career opportunities.
            </p>


          </div>


        </section>



        {/* =========================
           FEATURES
        ========================= */}

        <section
          className="features"
          id="projects"
        >


          <div className="section-heading">

            <p>
              WHAT WE OFFER
            </p>

            <h2>
              One Platform, Multiple Opportunities
            </h2>

          </div>



          <div className="feature-grid">


            <div className="feature-card">

              <div className="feature-icon">
                🎓
              </div>

              <h3>
                For Students
              </h3>

              <p>
                Find projects, internships and
                industry opportunities to build
                your career.
              </p>

            </div>



            <div className="feature-card">

              <div className="feature-icon">
                🏢
              </div>

              <h3>
                For Companies
              </h3>

              <p>
                Connect with talented students
                and discover potential future employees.
              </p>

            </div>



            <div className="feature-card">

              <div className="feature-icon">
                🏫
              </div>

              <h3>
                For Institutions
              </h3>

              <p>
                Build stronger connections between
                academic learning and industry requirements.
              </p>

            </div>


          </div>


        </section>


      </main>



      {/* =========================
         FOOTER
      ========================= */}

      <footer>

        <p>
          © 2026 Academia–Industry Portal
        </p>

      </footer>



      {/* =================================================
         LOGIN MODAL
      ================================================= */}

      {showLogin && (

        <div className="modal-overlay">


          <div className="auth-modal">


            <button
              className="close-btn"
              onClick={() =>
                setShowLogin(false)
              }
            >
              ×
            </button>


            <h2>
              Welcome Back
            </h2>


            <p className="modal-subtitle">
              Login to your AcademiaIndustry account
            </p>


            <form onSubmit={handleLogin}>


              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />


              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                required
              />


              <button
                type="submit"
                className="auth-btn"
              >
                Login
              </button>


            </form>


            <p className="switch-auth">

              Don't have an account?{' '}

              <button
                type="button"
                onClick={() => {

                  setShowLogin(false)

                  setShowSignup(true)

                }}
              >
                Sign Up
              </button>

            </p>


          </div>


        </div>

      )}



      {/* =================================================
         SIGNUP MODAL
      ================================================= */}

      {showSignup && (

        <div className="modal-overlay">


          <div className="auth-modal">


            <button
              className="close-btn"
              onClick={() =>
                setShowSignup(false)
              }
            >
              ×
            </button>


            <h2>
              Create Account
            </h2>


            <p className="modal-subtitle">
              Join the AcademiaIndustry community
            </p>


            <form onSubmit={handleSignup}>


              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                required
              />


              <label>
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                required
              />


              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                required
              />


              <label>
                Account Type
              </label>


              <select
                name="role"
                required
                defaultValue=""
              >

                <option
                  value=""
                  disabled
                >
                  Select account type
                </option>


                <option value="student">
                  Student
                </option>


                <option value="company">
                  Company
                </option>


                <option value="institution">
                  Institution
                </option>


              </select>


              <button
                type="submit"
                className="auth-btn"
              >
                Create Account
              </button>


            </form>


            <p className="switch-auth">

              Already have an account?{' '}

              <button
                type="button"
                onClick={() => {

                  setShowSignup(false)

                  setShowLogin(true)

                }}
              >
                Login
              </button>

            </p>


          </div>


        </div>

      )}


    </div>

  )
}


export default App