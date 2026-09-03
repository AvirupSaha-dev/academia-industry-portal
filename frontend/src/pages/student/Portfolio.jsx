import React, { useState } from 'react'
import './Portfolio.css'

function Portfolio() {

  const [isEditing, setIsEditing] = useState(false)

  const [projects, setProjects] = useState([
    {
      title: 'Handwritten Character Recognition',
      description:
        'Deep learning project for recognizing handwritten characters using EMNIST.',
      tech: ['Python', 'TensorFlow', 'CNN']
    },
    {
      title: 'Student Performance Prediction',
      description:
        'Machine learning system for predicting student academic performance.',
      tech: ['Python', 'Machine Learning', 'Pandas']
    },
    {
      title: 'Emotion Recognition System',
      description:
        'AI-based application that detects emotions from facial expressions.',
      tech: ['Python', 'OpenCV', 'Deep Learning']
    }
  ])

  const [newProject, setNewProject] = useState({
    title: '',
    description: ''
  })

  const addProject = () => {

    if (!newProject.title.trim()) {
      alert('Please enter project title.')
      return
    }

    setProjects([
      ...projects,
      {
        title: newProject.title,
        description:
          newProject.description ||
          'Student project',
        tech: ['Project']
      }
    ])

    setNewProject({
      title: '',
      description: ''
    })

    setIsEditing(false)
  }

  return (
    <div className="portfolio-page">

      {/* HEADER */}

      <div className="portfolio-header">

        <div>

          <p className="portfolio-tag">
            PROFESSIONAL PROFILE
          </p>

          <h1>
            My Portfolio
          </h1>

          <p>
            Showcase your skills, projects and achievements.
          </p>

        </div>

        <button
          className="portfolio-edit-btn"
          onClick={() =>
            setIsEditing(!isEditing)
          }
        >
          {isEditing
            ? 'Close Editor'
            : '✏ Edit Portfolio'}
        </button>

      </div>


      {/* PROFILE CARD */}

      <section className="portfolio-profile">

        <div className="portfolio-avatar">
          S
        </div>

        <div className="portfolio-profile-info">

          <h2>
            Student
          </h2>

          <p>
            Computer Science & AI/ML Student
          </p>

          <div className="portfolio-contact">
            <span>
              📧 student@example.com
            </span>

            <span>
              📍 Kolkata, India
            </span>
          </div>

        </div>

        <div className="portfolio-completion">

          <span>
            Portfolio Completion
          </span>

          <strong>
            80%
          </strong>

          <div className="portfolio-progress">
            <div style={{ width: '80%' }} />
          </div>

        </div>

      </section>


      {/* SKILLS */}

      <section className="portfolio-section">

        <div className="portfolio-section-title">

          <div>
            <h2>
              Skills
            </h2>

            <p>
              Your key technical skills.
            </p>
          </div>

        </div>

        <div className="portfolio-skills">

          {[
            'Python',
            'Machine Learning',
            'React',
            'JavaScript',
            'SQL',
            'TensorFlow',
            'Data Analysis',
            'Git'
          ].map(skill => (

            <span key={skill}>
              {skill}
            </span>

          ))}

        </div>

      </section>


      {/* PROJECTS */}

      <section className="portfolio-section">

        <div className="portfolio-section-title">

          <div>
            <h2>
              Featured Projects
            </h2>

            <p>
              Highlight your best work.
            </p>
          </div>

          {isEditing && (
            <span className="editing-label">
              Editing
            </span>
          )}

        </div>


        <div className="portfolio-projects">

          {projects.map((project, index) => (

            <div
              className="portfolio-project-card"
              key={index}
            >

              <div className="project-icon">
                💻
              </div>

              <h3>
                {project.title}
              </h3>

              <p>
                {project.description}
              </p>

              <div className="project-tech">

                {project.tech.map(tech => (
                  <span key={tech}>
                    {tech}
                  </span>
                ))}

              </div>

              <button
                onClick={() =>
                  alert(
                    `Viewing ${project.title}`
                  )
                }
              >
                View Project →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* ADD PROJECT */}

      {isEditing && (

        <section className="portfolio-editor">

          <h2>
            Add New Project
          </h2>

          <input
            type="text"
            placeholder="Project title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                title: e.target.value
              })
            }
          />

          <textarea
            placeholder="Project description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                description: e.target.value
              })
            }
          />

          <button
            onClick={addProject}
          >
            + Add Project
          </button>

        </section>

      )}

    </div>
  )
}

export default Portfolio