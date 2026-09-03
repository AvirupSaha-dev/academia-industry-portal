import React, { useEffect, useState } from 'react'
import './Jobs.css'

function Jobs() {

  /* =========================
     SEARCH & FILTER
  ========================= */

  const [search, setSearch] = useState('')
  const [location, setLocation] = useState('All Locations')


  /* =========================
     SAVED JOBS
  ========================= */

  const [savedJobs, setSavedJobs] = useState(() => {

    try {

      const saved =
        localStorage.getItem('savedJobs')

      if (!saved) return []

      const parsed =
        JSON.parse(saved)

      return Array.isArray(parsed)
        ? parsed
        : []

    } catch (error) {

      console.error(
        'Failed to load saved jobs:',
        error
      )

      return []

    }

  })


  /* =========================
     SELECTED JOB
  ========================= */

  const [selectedJob, setSelectedJob] =
    useState(null)


  /* =========================
     APPLICATIONS
  ========================= */

  const [applications, setApplications] =
    useState(() => {

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
     JOB DATA
  ========================= */

  const jobs = [

    {
      id: 1,
      title: 'Junior Machine Learning Engineer',
      company: 'Tech Innovations Pvt. Ltd.',
      location: 'Kolkata',
      type: 'Full Time',
      salary: '₹4 - ₹7 LPA',
      skills: [
        'Python',
        'Machine Learning',
        'TensorFlow'
      ],
      posted: '2 days ago',
      description:
        'Work with the AI and engineering team to develop, train and evaluate machine learning models for real-world applications.',
      requirements: [
        'Good knowledge of Python',
        'Basic understanding of Machine Learning',
        'Knowledge of TensorFlow or similar frameworks',
        'Understanding of data preprocessing',
        'Good problem solving skills'
      ]
    },

    {
      id: 2,
      title: 'Frontend Developer',
      company: 'Digital Solutions India',
      location: 'Kolkata',
      type: 'Full Time',
      salary: '₹3 - ₹6 LPA',
      skills: [
        'React',
        'JavaScript',
        'CSS'
      ],
      posted: '3 days ago',
      description:
        'Build modern, responsive and user-friendly web applications using React, JavaScript and modern frontend technologies.',
      requirements: [
        'Knowledge of HTML, CSS and JavaScript',
        'Basic React knowledge',
        'Understanding of responsive design',
        'Knowledge of Git and GitHub',
        'Good problem solving skills'
      ]
    },

    {
      id: 3,
      title: 'Data Analyst',
      company: 'Analytics Hub',
      location: 'Remote',
      type: 'Full Time',
      salary: '₹4 - ₹8 LPA',
      skills: [
        'Python',
        'SQL',
        'Excel'
      ],
      posted: '5 days ago',
      description:
        'Analyze business data, create reports and dashboards, and generate useful insights to support business decisions.',
      requirements: [
        'Knowledge of SQL',
        'Basic Python knowledge',
        'Good Excel skills',
        'Understanding of data analysis',
        'Knowledge of data visualization is preferred'
      ]
    },

    {
      id: 4,
      title: 'AI Research Intern',
      company: 'Future AI Labs',
      location: 'Bangalore',
      type: 'Internship',
      salary: '₹15K - ₹25K / month',
      skills: [
        'Python',
        'Deep Learning',
        'AI'
      ],
      posted: '1 week ago',
      description:
        'Assist the research team in experimenting with artificial intelligence and deep learning models for innovative AI applications.',
      requirements: [
        'Knowledge of Python',
        'Basic understanding of Artificial Intelligence',
        'Basic Deep Learning knowledge',
        'Interest in AI research',
        'Good analytical and problem solving skills'
      ]
    }

  ]


  /* =========================
     LOAD LATEST APPLICATIONS
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

      if (Array.isArray(parsed)) {

        setApplications(parsed)

      } else {

        setApplications([])

      }

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
     SAVE JOBS
  ========================= */

  useEffect(() => {

    try {

      localStorage.setItem(
        'savedJobs',
        JSON.stringify(savedJobs)
      )

    } catch (error) {

      console.error(
        'Failed to save jobs:',
        error
      )

    }

  }, [savedJobs])


  /* =========================
     FILTER JOBS
  ========================= */

  const filteredJobs =
    jobs.filter((job) => {

      const searchText =
        search.toLowerCase().trim()

      const matchesSearch =

        job.title
          .toLowerCase()
          .includes(searchText) ||

        job.company
          .toLowerCase()
          .includes(searchText) ||

        job.location
          .toLowerCase()
          .includes(searchText) ||

        job.type
          .toLowerCase()
          .includes(searchText) ||

        job.skills.some(
          (skill) =>
            skill
              .toLowerCase()
              .includes(searchText)
        )


      const matchesLocation =
        location === 'All Locations' ||
        job.location === location


      return (
        matchesSearch &&
        matchesLocation
      )

    })


  /* =========================
     SAVE / UNSAVE JOB
  ========================= */

  const toggleSave = (id) => {

    setSavedJobs((previous) => {

      if (previous.includes(id)) {

        return previous.filter(
          (jobId) => jobId !== id
        )

      }

      return [
        ...previous,
        id
      ]

    })

  }


  /* =========================
     CHECK APPLIED
  ========================= */

  const isJobApplied = (jobId) => {

    return applications.some(
      (application) => {

        const sameId =
          String(application.id) ===
          String(jobId)

        const sameType =
          String(
            application.type || ''
          ).toLowerCase() === 'job'

        return (
          sameId &&
          sameType
        )

      }
    )

  }


  /* =========================
     OPEN JOB DETAILS
  ========================= */

  const viewJob = (job) => {

    loadApplications()

    setSelectedJob(job)

  }


  /* =========================
     APPLY JOB
  ========================= */

  const applyJob = (job) => {

    /*
      IMPORTANT:
      Always read the latest applications
      directly from localStorage before adding
      a new Job application.
    */

    let currentApplications = []

    try {

      const saved =
        localStorage.getItem(
          'applications'
        )

      if (saved) {

        const parsed =
          JSON.parse(saved)

        if (Array.isArray(parsed)) {

          currentApplications =
            parsed

        }

      }

    } catch (error) {

      console.error(
        'Failed to read applications:',
        error
      )

      return

    }


    /* =========================
       DUPLICATE CHECK
    ========================= */

    const alreadyApplied =
      currentApplications.some(
        (application) => {

          const sameId =
            String(application.id) ===
            String(job.id)

          const sameType =
            String(
              application.type || ''
            ).toLowerCase() ===
            'job'

          return (
            sameId &&
            sameType
          )

        }
      )


    /* =========================
       ALREADY APPLIED
    ========================= */

    if (alreadyApplied) {

      setApplications(
        currentApplications
      )

      alert(
        'You have already applied for this job.'
      )

      return

    }


    /* =========================
       CREATE APPLICATION
    ========================= */

    const newApplication = {

      /*
        Unique application ID.
        Job type is included so that
        Job and Internship IDs never conflict.
      */

      applicationId:
        `job-${job.id}-${Date.now()}`,

      id:
        job.id,

      title:
        job.title,

      company:
        job.company,

      location:
        job.location,

      mode:
        job.location === 'Remote'
          ? 'Remote'
          : 'On-site',

      type:
        'Job',

      duration:
        '',

      salary:
        job.salary,

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
       ADD WITHOUT OVERWRITING
    ========================= */

    const updatedApplications = [
      ...currentApplications,
      newApplication
    ]


    /* =========================
       SAVE ALL APPLICATIONS
    ========================= */

    try {

      localStorage.setItem(
        'applications',
        JSON.stringify(
          updatedApplications
        )
      )

    } catch (error) {

      console.error(
        'Failed to save application:',
        error
      )

      alert(
        'Failed to save your application. Please try again.'
      )

      return

    }


    /* =========================
       UPDATE LOCAL STATE
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
       CLOSE MODAL
    ========================= */

    setSelectedJob(null)


    /* =========================
       SUCCESS MESSAGE
    ========================= */

    alert(
      'Job application submitted successfully!'
    )

  }


  /* =========================
     CLOSE MODAL
  ========================= */

  const closeJobDetails = () => {

    setSelectedJob(null)

  }


  return (

    <div className="jobs-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="jobs-header">

        <div>

          <p className="jobs-tag">
            CAREER OPPORTUNITIES
          </p>

          <h1>
            Find Your Dream Job
          </h1>

          <p>
            Explore jobs that match your
            skills and career goals.
          </p>

        </div>

      </div>


      {/* =========================
          SEARCH
      ========================= */}

      <div className="jobs-search-section">

        <div className="jobs-search-box">

          <span>
            🔍
          </span>

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

      </div>


      {/* =========================
          JOB COUNT
      ========================= */}

      <div className="jobs-result-row">

        <h2>
          Available Jobs
        </h2>

        <span>
          {filteredJobs.length} opportunities
        </span>

      </div>


      {/* =========================
          JOB LIST
      ========================= */}

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
              Try changing your search
              or location.
            </p>

          </div>

        ) : (

          filteredJobs.map((job) => {

            const saved =
              savedJobs.includes(job.id)

            const applied =
              isJobApplied(job.id)


            return (

              <div
                className={
                  applied
                    ? 'job-card applied-job-card'
                    : 'job-card'
                }
                key={job.id}
              >


                {/* JOB MAIN */}

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

                      {job.skills.map(
                        (skill) => (

                          <span key={skill}>
                            {skill}
                          </span>

                        )
                      )}

                    </div>


                    <small>
                      Posted {job.posted}
                    </small>

                  </div>

                </div>


                {/* JOB ACTIONS */}

                <div className="job-actions">

                  <button
                    type="button"
                    className={
                      saved
                        ? 'save-job saved'
                        : 'save-job'
                    }
                    onClick={() =>
                      toggleSave(job.id)
                    }
                  >

                    {saved
                      ? '♥ Saved'
                      : '♡ Save'}

                  </button>


                  <button
                    type="button"
                    className={
                      applied
                        ? 'view-job-btn applied-job-btn'
                        : 'view-job-btn'
                    }
                    onClick={() =>
                      viewJob(job)
                    }
                  >

                    {applied
                      ? '✓ Applied'
                      : 'View Job'}

                  </button>

                </div>

              </div>

            )

          })

        )}

      </div>


      {/* =========================
          JOB DETAILS MODAL
      ========================= */}

      {selectedJob && (

        <div
          className="job-modal-overlay"
          onClick={closeJobDetails}
        >

          <div
            className="job-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* CLOSE */}

            <button
              type="button"
              className="job-modal-close"
              onClick={closeJobDetails}
            >
              ×
            </button>


            {/* HEADER */}

            <div className="job-modal-header">

              <div className="job-modal-icon">
                🏢
              </div>

              <div>

                <p className="job-modal-tag">
                  JOB DETAILS
                </p>

                <h2>
                  {selectedJob.title}
                </h2>

                <p className="job-modal-company">
                  {selectedJob.company}
                </p>

              </div>

            </div>


            {/* META */}

            <div className="job-modal-meta">

              <span>
                📍 {selectedJob.location}
              </span>

              <span>
                💼 {selectedJob.type}
              </span>

              <span>
                💰 {selectedJob.salary}
              </span>

              <span>
                🕒 Posted {selectedJob.posted}
              </span>

            </div>


            {/* DESCRIPTION */}

            <div className="job-modal-section">

              <h3>
                About the Role
              </h3>

              <p>
                {selectedJob.description}
              </p>

            </div>


            {/* SKILLS */}

            <div className="job-modal-section">

              <h3>
                Required Skills
              </h3>

              <div className="job-modal-skills">

                {selectedJob.skills.map(
                  (skill) => (

                    <span key={skill}>
                      ✓ {skill}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* REQUIREMENTS */}

            <div className="job-modal-section">

              <h3>
                Requirements
              </h3>

              <div className="job-requirements">

                {selectedJob.requirements.map(
                  (requirement, index) => (

                    <div
                      key={index}
                      className="job-requirement"
                    >

                      <span>
                        {index + 1}
                      </span>

                      <p>
                        {requirement}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* ACTIONS */}

            <div className="job-modal-actions">

              <button
                type="button"
                className="job-modal-secondary-btn"
                onClick={closeJobDetails}
              >
                Close
              </button>


              <button
                type="button"
                className="job-modal-primary-btn"
                onClick={() =>
                  applyJob(selectedJob)
                }
                disabled={
                  isJobApplied(
                    selectedJob.id
                  )
                }
              >

                {isJobApplied(
                  selectedJob.id
                )
                  ? '✓ Already Applied'
                  : 'Apply Now →'}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default Jobs