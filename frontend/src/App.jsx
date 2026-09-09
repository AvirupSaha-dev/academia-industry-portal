import { useState } from 'react'
import './App.css'
import Industry from "./pages/industry/IndustryLayout";
import Faculty from "./pages/faculty/Faculty";
import Projects from './Projects'

import SkillAssessment from './pages/student/SkillAssessment'
import SkillProfile from './pages/student/SkillProfile'
import SkillGap from './pages/student/SkillGap'

import CareerGuidance from './pages/student/CareerGuidance'
import Recommendations from './pages/student/Recommendations'

import Internships from './pages/student/Internships'
import InternshipDetails from './pages/student/InternshipDetails'
import Applications from './pages/student/Applications'

import Jobs from './pages/student/Jobs'
import Learning from './pages/student/Learning'
import Portfolio from './pages/student/Portfolio'
import Documents from './pages/student/Documents'
import Notifications from './pages/student/Notifications'
import StudentProfile from './pages/student/StudentProfile'


function InstitutionPortal({ onLogout, currentPage, setCurrentPage }) {
  const items = [
    ['dashboard', '📊 Dashboard'],
    ['students', '👨‍🎓 Students'],
    ['industries', '🏢 Industries'],
    ['faculty', '👨‍🏫 Faculty'],
    ['internships', '💼 Internships'],
    ['placements', '📈 Placements'],
    ['skill-analytics', '📊 Skill Analytics'],
    ['reports', '📄 Reports'],
  ]

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="dashboard-logo">Academia<span>Industry</span></div>
        <div className="sidebar-role">🏫 Institution / Admin</div>
        <nav className="sidebar-nav">
          {items.map(([id, label]) => (
            <button key={id} className={currentPage === id ? 'active' : ''} onClick={() => setCurrentPage(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 'auto' }}>
          <button className="sidebar-nav button" onClick={onLogout}>↪ Logout</button>
        </div>
      </aside>
      <main className="main-content">
        <div className="page-header">
          <div>
            <div className="eyebrow">INSTITUTION • ANALYTICS</div>
            <h1>{currentPage === 'dashboard' ? 'Institution Dashboard' : currentPage.replace('-', ' ')}</h1>
            <p>Monitor students, faculty, industry engagement, skills and placements.</p>
          </div>
        </div>
        {currentPage === 'dashboard' ? (
          <div className="stats-grid">
            <div className="stat-card"><span>Total Students</span><strong>1,248</strong><small>Active students</small></div>
            <div className="stat-card"><span>Total Industries</span><strong>86</strong><small>Partner companies</small></div>
            <div className="stat-card"><span>Total Faculty</span><strong>142</strong><small>Academicians</small></div>
            <div className="stat-card"><span>Placement Rate</span><strong>78%</strong><small>Current outcome</small></div>
            <div className="stat-card"><span>Internship Participation</span><strong>64%</strong><small>Students participating</small></div>
            <div className="stat-card"><span>Career Readiness</span><strong>72%</strong><small>Average score</small></div>
          </div>
        ) : (
          <div className="content-card">
            <h2>{currentPage.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</h2>
            <p>This institution module is ready for backend/API integration.</p>
            <div className="stats-grid">
              <div className="stat-card"><span>Active Records</span><strong>124</strong></div>
              <div className="stat-card"><span>Pending Actions</span><strong>18</strong></div>
              <div className="stat-card"><span>AI Insights</span><strong>92%</strong></div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function App() {

  /* =====================================================
     AUTH
  ===================================================== */

  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('')


  /* =====================================================
     PAGE
  ===================================================== */

  const [currentPage, setCurrentPage] =
    useState('dashboard')


  /* =====================================================
     SELECTED INTERNSHIP
  ===================================================== */

  const [selectedInternship, setSelectedInternship] =
    useState(null)


  /* =====================================================
     SELECTED OPPORTUNITY
  ===================================================== */

  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null)


  /* =====================================================
     SKILL ASSESSMENT
  ===================================================== */

  const [skillAnswers, setSkillAnswers] =
    useState(() => {

      const saved =
        localStorage.getItem('skillAssessment')

      if (!saved) {
        return null
      }

      try {
        return JSON.parse(saved)
      } catch {
        return null
      }

    })


  /* =====================================================
     APPLICATIONS
  ===================================================== */

  const [applications, setApplications] =
    useState(() => {

      const saved =
        localStorage.getItem('applications')

      if (!saved) {
        return []
      }

      try {
        return JSON.parse(saved)
      } catch {
        return []
      }

    })


  /* =====================================================
     SKILL PROGRESS
  ===================================================== */

  const getSkillAssessmentProgress = () => {

    if (!skillAnswers) {
      return 0
    }

    const totalSkills = 9

    const answeredSkills =
      Object.values(skillAnswers).filter(
        (answer) =>
          answer !== '' &&
          answer !== null &&
          answer !== undefined
      ).length

    return Math.min(
      100,
      Math.round(
        (answeredSkills / totalSkills) * 100
      )
    )
  }


  const skillAssessmentProgress =
    getSkillAssessmentProgress()


  /* =====================================================
     SAVE APPLICATIONS
  ===================================================== */

  const saveApplications = (updatedApplications) => {

    setApplications(updatedApplications)

    localStorage.setItem(
      'applications',
      JSON.stringify(updatedApplications)
    )

  }


  /* =====================================================
     GENERIC APPLICATION HANDLER
  ===================================================== */

  const handleApply = (opportunity, type = 'Internship') => {

    if (!opportunity) {
      return
    }


    const opportunityId =
      String(opportunity.id)


    const opportunityType =
      String(type)


    /* -----------------------------------------------
       CHECK DUPLICATE
    ------------------------------------------------ */

    const alreadyApplied =
      applications.some(
        (application) =>
          String(application.id) === opportunityId &&
          String(application.type) === opportunityType
      )


    if (alreadyApplied) {

      alert(
        `You have already applied for this ${opportunityType.toLowerCase()}.`
      )

      setCurrentPage('applications')

      return

    }


    /* -----------------------------------------------
       CREATE APPLICATION
    ------------------------------------------------ */

    const newApplication = {

      id: opportunity.id,

      title:
        opportunity.title ||
        opportunity.name ||
        'Untitled Opportunity',

      company:
        opportunity.company ||
        opportunity.provider ||
        'Company',

      location:
        opportunity.location ||
        'Not specified',

      mode:
        opportunity.mode ||
        opportunity.type ||
        '',

      duration:
        opportunity.duration ||
        '',

      salary:
        opportunity.salary ||
        opportunity.stipend ||
        '',

      skills:
        opportunity.skills || [],

      description:
        opportunity.description || '',

      type: opportunityType,

      status: 'Applied',

      appliedDate:
        new Date().toLocaleDateString(),

      appliedAt:
        new Date().toISOString()

    }


    /* -----------------------------------------------
       UPDATE
    ------------------------------------------------ */

    const updatedApplications = [
      ...applications,
      newApplication
    ]


    saveApplications(
      updatedApplications
    )


    /* -----------------------------------------------
       SUCCESS
    ------------------------------------------------ */

    alert(
      `Application submitted for ${newApplication.title}!`
    )


    /* -----------------------------------------------
       GO TO APPLICATIONS
    ------------------------------------------------ */

    setCurrentPage(
      'applications'
    )

  }


  /* =====================================================
     INTERNSHIP APPLY
  ===================================================== */

  const handleInternshipApply =
    (internship) => {

      handleApply(
        internship,
        'Internship'
      )

    }


  /* =====================================================
     PROJECT APPLY
  ===================================================== */

  const handleProjectApply =
    (project) => {

      handleApply(
        project,
        'Project'
      )

    }


  /* =====================================================
     JOB APPLY
  ===================================================== */

  const handleJobApply =
    (job) => {

      handleApply(
        job,
        'Job'
      )

    }


  /* =====================================================
     RECOMMENDATION APPLY
  ===================================================== */

  const handleRecommendationApply =
    (item, type) => {

      handleApply(
        item,
        type
      )

    }


  /* =====================================================
     VIEW INTERNSHIP DETAILS
  ===================================================== */

  const handleViewInternshipDetails =
    (internship) => {

      setSelectedInternship(
        internship
      )

      setCurrentPage(
        'internship-details'
      )

    }


  /* =====================================================
     VIEW RECOMMENDATION DETAILS
  ===================================================== */

  const handleViewRecommendation =
    (opportunity) => {

      setSelectedOpportunity(
        opportunity
      )

    }


  /* =====================================================
     SIGN UP
  ===================================================== */

  const handleSignup = (e) => {

    e.preventDefault()

    const formData = new FormData(e.target)

    const fullName = formData.get('fullName') || ''
    const email = formData.get('email') || ''
    const password = formData.get('password') || ''
    const role = formData.get('role')

    if (!role) {
      alert('Please select an account type.')
      return
    }

    const user = { fullName, email, password, role }

    localStorage.setItem('currentUser', JSON.stringify(user))
    localStorage.setItem('userRole', role)

    setUserRole(role)
    setCurrentPage('dashboard')
    setIsLoggedIn(true)
    setShowSignup(false)
  }

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = (e) => {

    e.preventDefault()

    let role = localStorage.getItem('userRole')

    if (!role) {
      try {
        const savedUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
        role = savedUser?.role || 'student'
      } catch {
        role = 'student'
      }
    }

    setUserRole(role)
    setCurrentPage('dashboard')
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {

    setIsLoggedIn(
      false
    )

    setUserRole(
      ''
    )

    setCurrentPage(
      'dashboard'
    )

  }


  /* =====================================================
     NAVIGATION HELPER
  ===================================================== */

  const navigateTo = (page) => {

    setCurrentPage(
      page
    )

  }


  /* =====================================================
     INDUSTRY PORTAL
  ===================================================== */

  if (isLoggedIn && userRole === 'company') {
    return <Industry onLogout={handleLogout} currentPage="dashboard" setCurrentPage={navigateTo} />
  }

  /* =====================================================
     FACULTY PORTAL
  ===================================================== */

  if (isLoggedIn && userRole === 'faculty') {
    return <Faculty onLogout={handleLogout} currentPage="dashboard" setCurrentPage={navigateTo} />
  }

  /* =====================================================
     INSTITUTION PORTAL
  ===================================================== */

  if (isLoggedIn && userRole === 'institution') {
    return (
      <InstitutionPortal
        onLogout={handleLogout}
        currentPage={currentPage}
        setCurrentPage={navigateTo}
      />
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


        {/* =================================================
           SIDEBAR
        ================================================= */}

        <aside className="sidebar">


          {/* LOGO */}

          <div className="dashboard-logo">

            Academia
            <span>
              Industry
            </span>

          </div>


          {/* ROLE */}

          <div className="sidebar-role">

            🎓 Student

          </div>


          {/* =================================================
             NAVIGATION
          ================================================= */}

          <nav className="sidebar-nav">


            <button
              className={
                currentPage === 'dashboard'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo('dashboard')
              }
            >
              🏠 Dashboard
            </button>


            <button
              className={
                currentPage === 'projects'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo('projects')
              }
            >
              💼 Projects
            </button>


            <button
              className={
                currentPage === 'skill-assessment'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'skill-assessment'
                )
              }
            >
              📝 Skill Assessment
            </button>


            <button
              className={
                currentPage === 'skill-profile'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'skill-profile'
                )
              }
            >
              📊 Skill Profile
            </button>


            <button
              className={
                currentPage === 'skill-gap'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'skill-gap'
                )
              }
            >
              📉 Skill Gap
            </button>


            <button
              className={
                currentPage === 'career-guidance'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'career-guidance'
                )
              }
            >
              🧭 Career Guidance
            </button>


            <button
              className={
                currentPage === 'recommendations'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'recommendations'
                )
              }
            >
              🤖 Recommendations
            </button>


            <button
              className={
                currentPage === 'internships'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'internships'
                )
              }
            >
              🎯 Internships
            </button>


            <button
              className={
                currentPage === 'jobs'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'jobs'
                )
              }
            >
              💼 Jobs
            </button>


            <button
              className={
                currentPage === 'applications'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'applications'
                )
              }
            >
              📄 Applications
            </button>


            <button
              className={
                currentPage === 'learning'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'learning'
                )
              }
            >
              📚 Learning
            </button>


            <button
              className={
                currentPage === 'portfolio'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'portfolio'
                )
              }
            >
              🏆 Portfolio
            </button>


            <button
              className={
                currentPage === 'documents'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'documents'
                )
              }
            >
              📁 Documents
            </button>


            <button
              className={
                currentPage === 'notifications'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'notifications'
                )
              }
            >
              🔔 Notifications
            </button>


            <button
              className={
                currentPage === 'profile'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                navigateTo(
                  'profile'
                )
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
              onApply={
                handleProjectApply
              }
            />


          /* =================================================
             SKILL ASSESSMENT
          ================================================= */

          ) : currentPage ===
            'skill-assessment' ? (

            <SkillAssessment

              onComplete={(answers) => {

                localStorage.setItem(
                  'skillAssessment',
                  JSON.stringify(
                    answers
                  )
                )

                setSkillAnswers(
                  answers
                )

                setCurrentPage(
                  'skill-profile'
                )

              }}

            />


          /* =================================================
             SKILL PROFILE
          ================================================= */

          ) : currentPage ===
            'skill-profile' ? (

            <SkillProfile
              answers={
                skillAnswers
              }

              onNavigate={
                navigateTo
              }
            />


          /* =================================================
             SKILL GAP
          ================================================= */

          ) : currentPage ===
            'skill-gap' ? (

            <SkillGap />


          /* =================================================
             CAREER GUIDANCE
          ================================================= */

          ) : currentPage ===
            'career-guidance' ? (

            <CareerGuidance

              onNavigate={
                navigateTo
              }

              onStartLearning={() =>
                navigateTo(
                  'learning'
                )
              }

              onViewCareerPath={(
                career
              ) => {

                setSelectedOpportunity(
                  career
                )

              }}

            />


          /* =================================================
             RECOMMENDATIONS
          ================================================= */

          ) : currentPage ===
            'recommendations' ? (

            <Recommendations

              onNavigate={
                navigateTo
              }

              onViewDetails={
                handleViewRecommendation
              }

              onApply={
                handleRecommendationApply
              }

              onStartLearning={() =>
                navigateTo(
                  'learning'
                )
              }

            />


          /* =================================================
             INTERNSHIPS
          ================================================= */

          ) : currentPage ===
            'internships' ? (

            <Internships

              onBack={() =>
                navigateTo(
                  'dashboard'
                )
              }

              onViewDetails={
                handleViewInternshipDetails
              }

              onApply={
                handleInternshipApply
              }

            />


          /* =================================================
             INTERNSHIP DETAILS
          ================================================= */

          ) : currentPage ===
            'internship-details' ? (

            selectedInternship ? (

              <InternshipDetails

                internship={
                  selectedInternship
                }

                onBack={() =>
                  navigateTo(
                    'internships'
                  )
                }

                onApply={
                  handleInternshipApply
                }

              />

            ) : (

              <div className="dashboard-section">

                <h2>
                  Internship not found
                </h2>

                <button
                  className="apply-btn"
                  onClick={() =>
                    navigateTo(
                      'internships'
                    )
                  }
                >
                  Back to Internships
                </button>

              </div>

            )


          /* =================================================
             APPLICATIONS
          ================================================= */

          ) : currentPage ===
            'applications' ? (

            <Applications

              applications={
                applications
              }

              onNavigate={
                navigateTo
              }

            />


          /* =================================================
             JOBS
          ================================================= */

          ) : currentPage ===
            'jobs' ? (

            <Jobs

              onApply={
                handleJobApply
              }

              onNavigate={
                navigateTo
              }

            />


          /* =================================================
             LEARNING
          ================================================= */

          ) : currentPage ===
            'learning' ? (

            <Learning

              onNavigate={
                navigateTo
              }

            />


          /* =================================================
             PORTFOLIO
          ================================================= */

          ) : currentPage ===
            'portfolio' ? (

            <Portfolio

              onNavigate={
                navigateTo
              }

            />


          /* =================================================
             DOCUMENTS
          ================================================= */

          ) : currentPage ===
            'documents' ? (

            <Documents

              onNavigate={
                navigateTo
              }

            />


          /* =================================================
             NOTIFICATIONS
          ================================================= */

          ) : currentPage ===
            'notifications' ? (

            <Notifications

              onNavigate={
                navigateTo
              }

            />


          /* =================================================
             PROFILE
          ================================================= */

          ) : currentPage ===
            'profile' ? (

            <StudentProfile
              onNavigate={navigateTo}
            />


          /* =================================================
             DASHBOARD
          ================================================= */

          ) : (

            <>

              {/* =================================================
                 HEADER
              ================================================= */}

              <header className="dashboard-header">

                <div>

                  <p className="dashboard-tag">
                    STUDENT PORTAL
                  </p>

                  <h1>
                    Welcome back, Student 👋
                  </h1>

                  <p>
                    Discover opportunities
                    and build your career.
                  </p>

                </div>


                <div className="profile-circle">
                  S
                </div>

              </header>


              {/* =================================================
                 STAT CARDS
              ================================================= */}

              <section className="stats-grid">


                {/* PROJECTS */}

                <div className="stat-card">

                  <div className="stat-icon blue">
                    💼
                  </div>

                  <div>

                    <p>
                      Available Projects
                    </p>

                    <h2>
                      12
                    </h2>

                  </div>

                </div>


                {/* INTERNSHIPS */}

                <div
                  className="stat-card"
                  onClick={() =>
                    navigateTo(
                      'internships'
                    )
                  }
                  style={{
                    cursor: 'pointer'
                  }}
                >

                  <div className="stat-icon green">
                    🎯
                  </div>

                  <div>

                    <p>
                      Internships
                    </p>

                    <h2>
                      8
                    </h2>

                  </div>

                </div>


                {/* APPLICATIONS */}

                <div
                  className="stat-card"
                  onClick={() =>
                    navigateTo(
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


                {/* PROFILE */}

                <div
                  className="stat-card"
                  onClick={() =>
                    navigateTo(
                      'skill-profile'
                    )
                  }
                  style={{
                    cursor: 'pointer'
                  }}
                >

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


              {/* =================================================
                 AI CAREER TOOLS
              ================================================= */}

              <section className="dashboard-section">

                <div className="section-title-row">

                  <div>

                    <p className="dashboard-tag">
                      AI CAREER TOOLS
                    </p>

                    <h2>
                      Build Your Career
                    </h2>

                  </div>

                </div>


                <div className="opportunity-grid">


                  {/* CAREER GUIDANCE */}

                  <div className="opportunity-card">

                    <div className="opportunity-top">

                      <span className="opportunity-type project">
                        🤖 AI
                      </span>

                    </div>


                    <h3>
                      Career Guidance
                    </h3>

                    <p>
                      Get AI-powered career
                      roles, compatibility
                      scores and personalized
                      learning paths.
                    </p>


                    <button
                      className="apply-btn"
                      onClick={() =>
                        navigateTo(
                          'career-guidance'
                        )
                      }
                    >
                      Explore Career Guidance
                    </button>

                  </div>


                  {/* RECOMMENDATIONS */}

                  <div className="opportunity-card">

                    <div className="opportunity-top">

                      <span className="opportunity-type internship">
                        🤖 AI Recommended
                      </span>

                    </div>


                    <h3>
                      Personalized Recommendations
                    </h3>

                    <p>
                      Find internships,
                      jobs and learning
                      opportunities matched
                      to your skills.
                    </p>


                    <button
                      className="apply-btn"
                      onClick={() =>
                        navigateTo(
                          'recommendations'
                        )
                      }
                    >
                      View Recommendations
                    </button>

                  </div>


                </div>

              </section>


              {/* =================================================
                 RECOMMENDED OPPORTUNITIES
              ================================================= */}

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
                      navigateTo(
                        'internships'
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
                        navigateTo(
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
                        navigateTo(
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
                        navigateTo(
                          'projects'
                        )
                      }
                    >
                      View Opportunity
                    </button>

                  </div>


                </div>

              </section>


              {/* =================================================
                 PROFILE COMPLETION
              ================================================= */}

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
                    companies discover you
                    and increases your chances
                    of getting opportunities.
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

                        navigateTo(
                          'skill-profile'
                        )

                      } else {

                        navigateTo(
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


      {/* =================================================
         NAVBAR
      ================================================= */}

      <header className="navbar">

        <div className="logo">
          Academia<span>Industry</span>
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
              setShowLogin(
                true
              )
            }
          >
            Login
          </button>


          <button
            className="signup-btn"
            onClick={() =>
              setShowSignup(
                true
              )
            }
          >
            Sign Up
          </button>

        </div>

      </header>


      {/* =================================================
         HERO
      ================================================= */}

      <main>

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
              <span>
                {' '}Students
              </span>

              <br />

              with Industry

            </h1>


            <p className="hero-description">

              A platform that connects
              students, educational
              institutions, and companies
              to create meaningful
              opportunities and
              industry-ready talent.

            </p>


            <div className="hero-buttons">

              <button
                className="primary-btn"
                onClick={() =>
                  setShowSignup(
                    true
                  )
                }
              >
                Explore Opportunities
              </button>


              <button
                className="secondary-btn"
                onClick={() =>
                  document
                    .getElementById(
                      'projects'
                    )
                    ?.scrollIntoView({
                      behavior: 'smooth'
                    })
                }
              >
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
              Discover projects,
              internships,
              collaborations and
              career opportunities.
            </p>

          </div>

        </section>


        {/* =================================================
           FEATURES
        ================================================= */}

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
                Find projects,
                internships and
                industry opportunities
                to build your career.
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
                Connect with talented
                students and discover
                potential future
                employees.
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
                Build stronger
                connections between
                academic learning and
                industry requirements.
              </p>

            </div>


          </div>

        </section>

      </main>


      {/* =================================================
         FOOTER
      ================================================= */}

      <footer>

        <p>
          © 2026 Academia–Industry Portal
        </p>

      </footer>


      {/* =================================================
         LOGIN MODAL
      ================================================= */}

      {showLogin && (

        <div
          className="modal-overlay"
          onMouseDown={(e) => {

            if (
              e.target === e.currentTarget
            ) {
              setShowLogin(false)
            }

          }}
        >

          <div className="auth-modal">

            <button
              className="close-btn"
              onClick={() =>
                setShowLogin(
                  false
                )
              }
            >
              ×
            </button>


            <h2>
              Welcome Back
            </h2>

            <p className="modal-subtitle">
              Login to your
              AcademiaIndustry account
            </p>


            <form
              onSubmit={
                handleLogin
              }
            >

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
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

                  setShowLogin(
                    false
                  )

                  setShowSignup(
                    true
                  )

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

        <div
          className="modal-overlay"
          onMouseDown={(e) => {

            if (
              e.target === e.currentTarget
            ) {
              setShowSignup(false)
            }

          }}
        >

          <div className="auth-modal">

            <button
              className="close-btn"
              onClick={() =>
                setShowSignup(
                  false
                )
              }
            >
              ×
            </button>


            <h2>
              Create Account
            </h2>

            <p className="modal-subtitle">
              Join the AcademiaIndustry
              community
            </p>


            <form
              onSubmit={
                handleSignup
              }
            >


              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                required
              />


              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />


              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
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
                  Industry / Company
                </option>


                <option value="faculty">
                  Faculty / Academician
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

                  setShowSignup(
                    false
                  )

                  setShowLogin(
                    true
                  )

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