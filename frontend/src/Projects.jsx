import { useState } from 'react'
import './Projects.css'

function Projects({ onApply }) {

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

  const [search, setSearch] = useState('')
  const [locationFilter, setLocationFilter] = useState('All Projects')
  const [appliedProjects, setAppliedProjects] = useState(() => {
    const saved = localStorage.getItem('projectApplications')
    return saved ? JSON.parse(saved) : []
  })

  const filteredProjects = projects.filter((project) => {

    const searchText = search.toLowerCase()

    const matchesSearch =
      project.title.toLowerCase().includes(searchText) ||
      project.company.toLowerCase().includes(searchText) ||
      project.skills.some((skill) =>
        skill.toLowerCase().includes(searchText)
      )

    const matchesLocation =
      locationFilter === 'All Projects' ||
      project.location === locationFilter

    return matchesSearch && matchesLocation
  })

  const handleApply = (project) => {

    if (appliedProjects.includes(project.id)) {
      alert('You have already applied for this project.')
      return
    }

    const updatedApplications = [
      ...appliedProjects,
      project.id,
    ]

    setAppliedProjects(updatedApplications)

    localStorage.setItem(
      'projectApplications',
      JSON.stringify(updatedApplications)
    )

    if (onApply) {
      onApply({
        ...project,
        type: 'Project',
        status: 'Applied',
      })
    }

    alert(`Application submitted for ${project.title}!`)
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
            Explore projects and build real-world industry experience.
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
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter-select"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        >
          <option>
            All Projects
          </option>

          <option>
            Remote
          </option>

          <option>
            Kolkata
          </option>

          <option>
            Hybrid
          </option>
        </select>

      </div>


      {/* PROJECT COUNT */}
      <p className="project-result-count">
        Showing {filteredProjects.length} projects
      </p>


      {/* PROJECT GRID */}
      <div className="projects-grid">

        {filteredProjects.map((project) => {

          const isApplied =
            appliedProjects.includes(project.id)

          return (
            <div
              className="project-card"
              key={project.id}
            >

              {/* TOP */}
              <div className="project-top">

                <span className="project-label">
                  Project
                </span>

                <button className="heart-btn">
                  ♡
                </button>

              </div>


              {/* TITLE */}
              <h2>
                {project.title}
              </h2>


              {/* COMPANY */}
              <p className="company-name">
                🏢 {project.company}
              </p>


              {/* META */}
              <div className="project-meta">

                <span>
                  📍 {project.location}
                </span>

                <span>
                  ◷ {project.duration}
                </span>

              </div>


              {/* SKILLS */}
              <div className="skills">

                {project.skills.map((skill, index) => (
                  <span key={index}>
                    {skill}
                  </span>
                ))}

              </div>


              {/* DESCRIPTION */}
              <p className="project-description">
                {project.description}
              </p>


              {/* APPLY */}
              <button
                className={`view-project-btn ${
                  isApplied ? 'applied-btn' : ''
                }`}
                onClick={() => handleApply(project)}
                disabled={isApplied}
              >

                {isApplied
                  ? '✓ Applied'
                  : 'Apply for Project'}

              </button>

            </div>
          )

        })}

      </div>


      {/* EMPTY */}
      {filteredProjects.length === 0 && (
        <div className="no-projects">
          <h3>
            No projects found
          </h3>

          <p>
            Try changing your search or filter.
          </p>
        </div>
      )}

    </div>
  )
}

export default Projects