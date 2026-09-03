import { useEffect, useState } from 'react'
import './Projects.css'

function Projects({ onApply }) {

  /* =========================
     PROJECT DATA
  ========================= */

  const projects = [
    {
      id: 'project-1',
      title: 'AI-Based Student Analytics',
      company: 'Tech Innovations Pvt. Ltd.',
      location: 'Remote',
      duration: '3 Months',
      skills: ['Python', 'Machine Learning', 'React'],
      description:
        'Build an AI-based analytics system to analyze student performance and provide useful insights.',
    },

    {
      id: 'project-2',
      title: 'Smart Healthcare Prediction',
      company: 'HealthTech Research',
      location: 'Hybrid',
      duration: '4 Months',
      skills: ['Python', 'ML', 'Data Science'],
      description:
        'Develop a machine learning model for healthcare prediction and data analysis.',
    },

    {
      id: 'project-3',
      title: 'E-Commerce Recommendation System',
      company: 'Digital Solutions India',
      location: 'Kolkata',
      duration: '6 Months',
      skills: ['Python', 'AI', 'Machine Learning'],
      description:
        'Create a recommendation system that suggests products based on user preferences.',
    },

    {
      id: 'project-4',
      title: 'Campus Management System',
      company: 'EduTech Solutions',
      location: 'Remote',
      duration: '5 Months',
      skills: ['React', 'JavaScript', 'Node.js'],
      description:
        'Develop a modern platform to manage campus activities, students and academic information.',
    },

    {
      id: 'project-5',
      title: 'Student Performance Prediction',
      company: 'Future AI Labs',
      location: 'Kolkata',
      duration: '3 Months',
      skills: ['Python', 'Pandas', 'ML'],
      description:
        'Develop a machine learning model to predict student academic performance.',
    },

    {
      id: 'project-6',
      title: 'AI Chatbot for Students',
      company: 'NextGen Technologies',
      location: 'Remote',
      duration: '4 Months',
      skills: ['Python', 'AI', 'NLP'],
      description:
        'Build an AI-powered chatbot to help students with academic and career-related queries.',
    },
  ]


  /* =========================
     SEARCH & FILTER
  ========================= */

  const [search, setSearch] = useState('')

  const [locationFilter, setLocationFilter] =
    useState('All Projects')


  /* =========================
     APPLICATIONS
     
     IMPORTANT:
     We use the SAME localStorage
     used by Applications.jsx.

     DO NOT use projectApplications
     anymore.
  ========================= */

  const [applications, setApplications] = useState(() => {

    const saved =
      localStorage.getItem('applications')

    if (!saved) {
      return []
    }

    try {
      return JSON.parse(saved)
    } catch (error) {

      console.error(
        'Failed to load applications:',
        error
      )

      return []
    }
  })


  /* =========================
     REFRESH APPLICATION DATA
     
     This makes sure that if an
     application was withdrawn,
     Projects page gets the latest
     data.
  ========================= */

  useEffect(() => {

    const loadApplications = () => {

      const saved =
        localStorage.getItem('applications')

      if (!saved) {

        setApplications([])

        return
      }

      try {

        const parsed =
          JSON.parse(saved)

        setApplications(
          Array.isArray(parsed)
            ? parsed
            : []
        )

      } catch (error) {

        console.error(
          'Failed to refresh applications:',
          error
        )

        setApplications([])
      }
    }


    loadApplications()


    /* Listen for changes from other
       browser tabs/windows */

    window.addEventListener(
      'storage',
      loadApplications
    )


    return () => {

      window.removeEventListener(
        'storage',
        loadApplications
      )

    }

  }, [])


  /* =========================
     CHECK IF PROJECT IS APPLIED
  ========================= */

  const isProjectApplied = (projectId) => {

    return applications.some(
      (application) =>
        String(application.id) ===
          String(projectId) &&
        String(application.type).toLowerCase() ===
          'project'
    )
  }


  /* =========================
     SEARCH + FILTER
  ========================= */

  const filteredProjects =
    projects.filter((project) => {

      const searchText =
        search.toLowerCase().trim()


      const matchesSearch =

        project.title
          .toLowerCase()
          .includes(searchText)

        ||

        project.company
          .toLowerCase()
          .includes(searchText)

        ||

        project.skills.some(
          (skill) =>
            skill
              .toLowerCase()
              .includes(searchText)
        )


      const matchesLocation =

        locationFilter ===
          'All Projects'

        ||

        project.location ===
          locationFilter


      return (
        matchesSearch &&
        matchesLocation
      )

    })


  /* =========================
     APPLY FOR PROJECT
  ========================= */

  const handleApply = (project) => {

    /* Always check the latest
       localStorage before applying */

    let currentApplications = []

    const saved =
      localStorage.getItem('applications')


    if (saved) {

      try {

        currentApplications =
          JSON.parse(saved)

      } catch (error) {

        console.error(
          'Failed to read applications:',
          error
        )

        currentApplications = []
      }

    }


    /* =========================
       DUPLICATE CHECK
       
       Same project cannot be
       applied twice while the
       application exists.
    ========================= */

    const alreadyApplied =
      currentApplications.some(
        (application) =>
          String(application.id) ===
            String(project.id) &&
          String(application.type).toLowerCase() ===
            'project'
      )


    if (alreadyApplied) {

      alert(
        'You have already applied for this project.'
      )

      return
    }


    /* =========================
       APPLICATION OBJECT
    ========================= */

    const newApplication = {

      id: project.id,

      title: project.title,

      company: project.company,

      location: project.location,

      duration: project.duration,

      skills: project.skills || [],

      description:
        project.description || '',

      type: 'Project',

      status: 'Applied',

      appliedDate:
        new Date().toLocaleDateString(),

    }


    /* =========================
       UPDATE LOCAL STATE
    ========================= */

    const updatedApplications = [

      ...currentApplications,

      newApplication,

    ]


    setApplications(
      updatedApplications
    )


    /* =========================
       SAVE TO SAME STORAGE
       
       This is the important fix.
    ========================= */

    localStorage.setItem(
      'applications',
      JSON.stringify(
        updatedApplications
      )
    )


    /* =========================
       SEND TO PARENT APP
    ========================= */

    if (onApply) {

      onApply(
        newApplication
      )

    }


    alert(
      `Application submitted for ${project.title}!`
    )

  }


  /* =========================
     CLEAR OLD LEGACY STORAGE
     
     This removes the old
     projectApplications data
     created by the previous code.
  ========================= */

  useEffect(() => {

    localStorage.removeItem(
      'projectApplications'
    )

  }, [])


  return (

    <div className="projects-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="projects-header">

        <div>

          <p className="page-tag">
            OPPORTUNITIES
          </p>

          <h1>
            Projects
          </h1>

          <p className="page-description">
            Explore projects and build
            real-world industry experience.
          </p>

        </div>


        <div className="project-count">

          <strong>
            {projects.length}
          </strong>

          <span>
            Available Projects
          </span>

        </div>

      </div>


      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="projects-toolbar">

        <input
          type="text"
          placeholder="Search projects, skills or companies..."
          className="search-input"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <select
          className="filter-select"
          value={locationFilter}
          onChange={(e) =>
            setLocationFilter(
              e.target.value
            )
          }
        >

          <option value="All Projects">
            All Projects
          </option>

          <option value="Remote">
            Remote
          </option>

          <option value="Kolkata">
            Kolkata
          </option>

          <option value="Hybrid">
            Hybrid
          </option>

        </select>

      </div>


      {/* =========================
          PROJECT COUNT
      ========================= */}

      <p className="project-result-count">

        Showing {filteredProjects.length} projects

      </p>


      {/* =========================
          PROJECT GRID
      ========================= */}

      <div className="projects-grid">

        {filteredProjects.map(
          (project) => {

            const isApplied =
              isProjectApplied(
                project.id
              )


            return (

              <div
                className="project-card"
                key={project.id}
              >


                {/* =========================
                    TOP
                ========================= */}

                <div className="project-top">

                  <span className="project-label">
                    Project
                  </span>

                  <button
                    className="heart-btn"
                    type="button"
                  >
                    ♡
                  </button>

                </div>


                {/* =========================
                    TITLE
                ========================= */}

                <h2>
                  {project.title}
                </h2>


                {/* =========================
                    COMPANY
                ========================= */}

                <p className="company-name">

                  🏢 {project.company}

                </p>


                {/* =========================
                    META
                ========================= */}

                <div className="project-meta">

                  <span>
                    📍 {project.location}
                  </span>

                  <span>
                    ◷ {project.duration}
                  </span>

                </div>


                {/* =========================
                    SKILLS
                ========================= */}

                <div className="skills">

                  {project.skills.map(
                    (skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    )
                  )}

                </div>


                {/* =========================
                    DESCRIPTION
                ========================= */}

                <p className="project-description">

                  {project.description}

                </p>


                {/* =========================
                    APPLY BUTTON
                ========================= */}

                <button
                  type="button"
                  className={`view-project-btn ${
                    isApplied
                      ? 'applied-btn'
                      : ''
                  }`}
                  onClick={() =>
                    handleApply(project)
                  }
                  disabled={isApplied}
                >

                  {isApplied
                    ? '✓ Applied'
                    : 'Apply for Project'}

                </button>


              </div>

            )

          }
        )}

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {filteredProjects.length === 0 && (

        <div className="no-projects">

          <h3>
            No projects found
          </h3>

          <p>
            Try changing your search
            or filter.
          </p>

        </div>

      )}

    </div>

  )

}


export default Projects