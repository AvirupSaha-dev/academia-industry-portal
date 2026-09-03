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
  ========================= */

  const [applications, setApplications] = useState(() => {

    try {

      const saved =
        localStorage.getItem('applications')

      if (!saved) return []

      const parsed =
        JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : []

    } catch (error) {

      console.error(
        'Failed to load applications:',
        error
      )

      return []

    }

  })


  /* =========================
     LOAD APPLICATIONS
  ========================= */

  const loadApplications = () => {

    try {

      const saved =
        localStorage.getItem('applications')

      if (!saved) {

        setApplications([])

        return

      }

      const parsed =
        JSON.parse(saved)

      setApplications(
        Array.isArray(parsed)
          ? parsed
          : []
      )

    } catch (error) {

      console.error(
        'Failed to load applications:',
        error
      )

      setApplications([])

    }

  }


  /* =========================
     SYNC APPLICATIONS
  ========================= */

  useEffect(() => {

    loadApplications()

    window.addEventListener(
      'storage',
      loadApplications
    )

    window.addEventListener(
      'applicationsUpdated',
      loadApplications
    )

    window.addEventListener(
      'focus',
      loadApplications
    )

    return () => {

      window.removeEventListener(
        'storage',
        loadApplications
      )

      window.removeEventListener(
        'applicationsUpdated',
        loadApplications
      )

      window.removeEventListener(
        'focus',
        loadApplications
      )

    }

  }, [])


  /* =========================
     CHECK APPLIED
  ========================= */

  const isProjectApplied = (projectId) => {

    return applications.some(
      (application) =>
        String(application.id) ===
          String(projectId) &&
        String(application.type || '').toLowerCase() ===
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

        project.location
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
     APPLY PROJECT
  ========================= */

  const handleApply = (project) => {

    try {

      /* Always read latest data */

      const saved =
        localStorage.getItem('applications')

      let currentApplications = []

      if (saved) {

        const parsed =
          JSON.parse(saved)

        if (Array.isArray(parsed)) {

          currentApplications =
            parsed

        }

      }


      /* =========================
         DUPLICATE CHECK
      ========================= */

      const alreadyApplied =
        currentApplications.some(
          (application) =>

            String(application.id) ===
              String(project.id) &&

            String(application.type || '').toLowerCase() ===
              'project'

        )


      if (alreadyApplied) {

        setApplications(
          currentApplications
        )

        alert(
          'You have already applied for this project.'
        )

        return

      }


      /* =========================
         UNIQUE APPLICATION ID
      ========================= */

      const applicationId =
        `project-${project.id}`


      /* =========================
         APPLICATION OBJECT
      ========================= */

      const newApplication = {

        applicationId,

        id:
          project.id,

        type:
          'Project',

        title:
          project.title,

        company:
          project.company,

        location:
          project.location,

        mode:
          project.location === 'Remote'
            ? 'Remote'
            : project.location === 'Hybrid'
              ? 'Hybrid'
              : 'On-site',

        duration:
          project.duration,

        salary:
          '',

        stipend:
          '',

        skills:
          project.skills || [],

        description:
          project.description || '',

        status:
          'Applied',

        appliedDate:
          new Date().toLocaleDateString(
            'en-IN',
            {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }
          )

      }


      /* =========================
         SAVE
      ========================= */

      const updatedApplications = [

        ...currentApplications,

        newApplication

      ]


      localStorage.setItem(
        'applications',
        JSON.stringify(
          updatedApplications
        )
      )


      /* =========================
         UPDATE STATE
      ========================= */

      setApplications(
        updatedApplications
      )


      /* =========================
         NOTIFY OTHER PAGES
      ========================= */

      window.dispatchEvent(
        new Event(
          'applicationsUpdated'
        )
      )


      /* =========================
         PARENT CALLBACK
      ========================= */

      if (onApply) {

        onApply(
          newApplication
        )

      }


      alert(
        `Application submitted for ${project.title}!`
      )

    } catch (error) {

      console.error(
        'Failed to apply for project:',
        error
      )

      alert(
        'Something went wrong while applying.'
      )

    }

  }


  return (

    <div className="projects-page">

      {/* HEADER */}

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


      {/* TOOLBAR */}

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


      {/* RESULT COUNT */}

      <p className="project-result-count">
        Showing {filteredProjects.length} projects
      </p>


      {/* PROJECT GRID */}

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


                <h2>
                  {project.title}
                </h2>


                <p className="company-name">
                  🏢 {project.company}
                </p>


                <div className="project-meta">

                  <span>
                    📍 {project.location}
                  </span>

                  <span>
                    ◷ {project.duration}
                  </span>

                </div>


                <div className="skills">

                  {project.skills.map(
                    (skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    )
                  )}

                </div>


                <p className="project-description">
                  {project.description}
                </p>


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


      {/* EMPTY */}

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