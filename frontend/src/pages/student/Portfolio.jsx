import { useEffect, useState } from 'react'
import './Portfolio.css'

function Portfolio() {

  const defaultProjects = [
    {
      id: 'portfolio-1',
      title: 'AI-Based Student Analytics',
      description:
        'An AI-based system that analyzes student performance and provides useful insights.',
      technologies: [
        'Python',
        'Machine Learning',
        'React'
      ],
      github: '',
      live: '',
      status: 'Completed'
    }
  ]

  const emptyForm = {
    title: '',
    description: '',
    technologies: '',
    github: '',
    live: '',
    status: 'Completed'
  }

  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolioProjects')

      if (!saved) {
        return defaultProjects
      }

      const parsed = JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : defaultProjects

    } catch (error) {
      console.error('Failed to load portfolio:', error)
      return defaultProjects
    }
  })

  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [showForm, setShowForm] = useState(false)

  /* SAVE TO LOCAL STORAGE */

  useEffect(() => {
    localStorage.setItem(
      'portfolioProjects',
      JSON.stringify(projects)
    )
  }, [projects])


  /* FORM CHANGE */

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((previous) => ({
      ...previous,
      [name]: value
    }))
  }


  /* OPEN ADD FORM */

  const openAddForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(true)
  }


  /* ADD / UPDATE */

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.title.trim()) {
      alert('Please enter a project title.')
      return
    }

    const technologies = form.technologies
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)

    if (editingId) {

      setProjects((previous) =>
        previous.map((project) =>
          project.id === editingId
            ? {
                ...project,
                title: form.title.trim(),
                description: form.description.trim(),
                technologies,
                github: form.github.trim(),
                live: form.live.trim(),
                status: form.status
              }
            : project
        )
      )

      alert('Project updated successfully!')

    } else {

      const newProject = {
        id: `portfolio-${Date.now()}`,
        title: form.title.trim(),
        description: form.description.trim(),
        technologies,
        github: form.github.trim(),
        live: form.live.trim(),
        status: form.status
      }

      setProjects((previous) => [
        ...previous,
        newProject
      ])

      alert('Project added to portfolio!')
    }

    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }


  /* EDIT */

  const handleEdit = (project) => {

    setForm({
      title: project.title || '',
      description: project.description || '',
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(', ')
        : '',
      github: project.github || '',
      live: project.live || '',
      status: project.status || 'Completed'
    })

    setEditingId(project.id)
    setShowForm(true)
  }


  /* DELETE */

  const handleDelete = (id) => {

    const confirmed = window.confirm(
      'Are you sure you want to delete this project?'
    )

    if (!confirmed) return

    setProjects((previous) =>
      previous.filter(
        (project) => project.id !== id
      )
    )
  }


  /* CANCEL */

  const cancelForm = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowForm(false)
  }


  return (
    <div className="portfolio-page">

      {/* HEADER */}

      <div className="portfolio-header">

        <div>
          <p className="page-tag">
            🏆 STUDENT PORTFOLIO
          </p>

          <h1>
            My Portfolio
          </h1>

          <p className="page-description">
            Showcase your projects, technical skills
            and achievements to recruiters.
          </p>
        </div>

        <button
          className="portfolio-add-btn"
          type="button"
          onClick={openAddForm}
        >
          + Add Project
        </button>

      </div>


      {/* SUMMARY */}

      <section className="portfolio-summary">

        <div className="portfolio-summary-icon">
          🚀
        </div>

        <div className="portfolio-summary-content">

          <p>
            BUILD YOUR PROFESSIONAL PRESENCE
          </p>

          <h2>
            {projects.length} Portfolio Project
            {projects.length !== 1 ? 's' : ''}
          </h2>

          <span>
            Keep your portfolio updated with your
            latest work and achievements.
          </span>

        </div>

      </section>


      {/* FORM */}

      {showForm && (

        <div className="portfolio-form-card">

          <div className="portfolio-form-header">

            <div>
              <p className="page-tag">
                {editingId
                  ? 'EDIT PROJECT'
                  : 'NEW PROJECT'}
              </p>

              <h2>
                {editingId
                  ? 'Update Project'
                  : 'Add Project'}
              </h2>
            </div>

            <button
              type="button"
              className="portfolio-close-btn"
              onClick={cancelForm}
            >
              ×
            </button>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="portfolio-form-grid">

              <div className="portfolio-field">

                <label>
                  Project Title <span>*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. AI Chatbot"
                />

              </div>


              <div className="portfolio-field">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Completed">
                    Completed
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Planned">
                    Planned
                  </option>
                </select>

              </div>

            </div>


            <div className="portfolio-field">

              <label>
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                rows="5"
              />

            </div>


            <div className="portfolio-field">

              <label>
                Technologies
              </label>

              <input
                type="text"
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="Python, React, Machine Learning"
              />

              <small>
                Separate technologies with commas.
              </small>

            </div>


            <div className="portfolio-form-grid">

              <div className="portfolio-field">

                <label>
                  GitHub Link
                </label>

                <input
                  type="url"
                  name="github"
                  value={form.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />

              </div>


              <div className="portfolio-field">

                <label>
                  Live Project Link
                </label>

                <input
                  type="url"
                  name="live"
                  value={form.live}
                  onChange={handleChange}
                  placeholder="https://..."
                />

              </div>

            </div>


            <div className="portfolio-form-actions">

              <button
                type="button"
                className="portfolio-cancel-btn"
                onClick={cancelForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="portfolio-save-btn"
              >
                {editingId
                  ? 'Update Project'
                  : 'Save Project'}
              </button>

            </div>

          </form>

        </div>
      )}


      {/* PROJECT SECTION */}

      <section className="portfolio-section">

        <div className="portfolio-section-heading">

          <div>
            <p className="page-tag">
              MY WORK
            </p>

            <h2>
              Projects
            </h2>
          </div>

          <span>
            {projects.length} Project
            {projects.length !== 1 ? 's' : ''}
          </span>

        </div>


        {projects.length === 0 ? (

          <div className="portfolio-empty">

            <div className="portfolio-empty-icon">
              📁
            </div>

            <h3>
              No projects added yet
            </h3>

            <p>
              Add your first project to build
              your professional portfolio.
            </p>

            <button
              type="button"
              onClick={openAddForm}
            >
              + Add Your First Project
            </button>

          </div>

        ) : (

          <div className="portfolio-grid">

            {projects.map((project) => (

              <div
                className="portfolio-project-card"
                key={project.id}
              >

                <div className="portfolio-project-top">

                  <div className="portfolio-project-icon">
                    💻
                  </div>

                  <span
                    className={`portfolio-status ${
                      project.status === 'Completed'
                        ? 'completed'
                        : project.status === 'In Progress'
                        ? 'progress'
                        : 'planned'
                    }`}
                  >
                    {project.status}
                  </span>

                </div>


                <h3>
                  {project.title}
                </h3>


                <p className="portfolio-project-description">
                  {project.description ||
                    'No description added.'}
                </p>


                {project.technologies &&
                  project.technologies.length > 0 && (

                  <div className="portfolio-technologies">

                    {project.technologies.map(
                      (technology, index) => (

                        <span
                          key={`${technology}-${index}`}
                        >
                          {technology}
                        </span>

                      )
                    )}

                  </div>

                )}


                {(project.github || project.live) && (

                  <div className="portfolio-project-links">

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    )}

                  </div>

                )}


                <div className="portfolio-project-actions">

                  <button
                    type="button"
                    className="portfolio-edit-btn"
                    onClick={() =>
                      handleEdit(project)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    className="portfolio-delete-btn"
                    onClick={() =>
                      handleDelete(project.id)
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  )
}

export default Portfolio