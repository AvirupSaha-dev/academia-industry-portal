import React, { useState } from 'react'
import './Jobs.css'

function Jobs() {

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All Locations')
  const [savedJobs, setSavedJobs] = useState([])

  const jobs = [
    {
      id: 1,
      title: 'Junior Machine Learning Engineer',
      company: 'Tech Innovations Pvt. Ltd.',
      location: 'Kolkata',
      type: 'Full Time',
      salary: '₹4 - ₹7 LPA',
      skills: ['Python', 'Machine Learning', 'TensorFlow'],
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Solutions India',
      location: 'Kolkata',
      type: 'Full Time',
      salary: '₹3 - ₹6 LPA',
      skills: ['React', 'JavaScript', 'CSS'],
      posted: '3 days ago'
    },
    {
      id: 3,
      title: 'Data Analyst',
      company: 'Analytics Hub',
      location: 'Remote',
      type: 'Full Time',
      salary: '₹4 - ₹8 LPA',
      skills: ['Python', 'SQL', 'Excel'],
      posted: '5 days ago'
    },
    {
      id: 4,
      title: 'AI Research Intern',
      company: 'Future AI Labs',
      location: 'Bangalore',
      type: 'Internship',
      salary: '₹15K - ₹25K / month',
      skills: ['Python', 'Deep Learning', 'AI'],
      posted: '1 week ago'
    }
  ]

  const filteredJobs = jobs.filter((job) => {

    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some(skill =>
        skill.toLowerCase().includes(search.toLowerCase())
      )

    const matchesLocation =
      location === 'All Locations' ||
      job.location === location

    return matchesSearch && matchesLocation
  })

  const toggleSave = (id) => {

    setSavedJobs(prev =>
      prev.includes(id)
        ? prev.filter(jobId => jobId !== id)
        : [...prev, id]
    )
  }

  return (
    <div className="jobs-page">

      {/* HEADER */}

      <div className="jobs-header">

        <div>
          <p className="jobs-tag">
            CAREER OPPORTUNITIES
          </p>

          <h1>
            Find Your Dream Job
          </h1>

          <p>
            Explore jobs that match your skills and career goals.
          </p>
        </div>

      </div>


      {/* SEARCH */}

      <div className="jobs-search-section">

        <div className="jobs-search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search jobs, companies or skills..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        >
          <option>All Locations</option>
          <option>Kolkata</option>
          <option>Remote</option>
          <option>Bangalore</option>
        </select>

      </div>


      {/* JOB COUNT */}

      <div className="jobs-result-row">

        <h2>
          Available Jobs
        </h2>

        <span>
          {filteredJobs.length} opportunities
        </span>

      </div>


      {/* JOB LIST */}

      <div className="jobs-list">

        {filteredJobs.length === 0 ? (

          <div className="jobs-empty">

            <div>
              🔎
            </div>

            <h3>
              No jobs found
            </h3>

            <p>
              Try changing your search or location.
            </p>

          </div>

        ) : (

          filteredJobs.map(job => (

            <div
              className="job-card"
              key={job.id}
            >

              <div className="job-main">

                <div className="job-company-icon">
                  🏢
                </div>

                <div className="job-info">

                  <h3>
                    {job.title}
                  </h3>

                  <p className="job-company">
                    {job.company}
                  </p>

                  <div className="job-meta">

                    <span>
                      📍 {job.location}
                    </span>

                    <span>
                      💼 {job.type}
                    </span>

                    <span>
                      💰 {job.salary}
                    </span>

                  </div>

                  <div className="job-skills">

                    {job.skills.map(skill => (
                      <span key={skill}>
                        {skill}
                      </span>
                    ))}

                  </div>

                  <small>
                    Posted {job.posted}
                  </small>

                </div>

              </div>


              <div className="job-actions">

                <button
                  className={
                    savedJobs.includes(job.id)
                      ? 'save-job saved'
                      : 'save-job'
                  }
                  onClick={() =>
                    toggleSave(job.id)
                  }
                >
                  {savedJobs.includes(job.id)
                    ? '♥ Saved'
                    : '♡ Save'}
                </button>

                <button
                  className="view-job-btn"
                  onClick={() =>
                    alert(
                      `Opening ${job.title}`
                    )
                  }
                >
                  View Job
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default Jobs