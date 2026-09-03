import { useEffect, useState } from 'react'
import './Recommendations.css'

function Recommendations() {

  /* =====================================================
     DATA
  ===================================================== */

  const internships = [
    {
      id: 1,
      title: 'Machine Learning Intern',
      company: 'Tech Innovations Pvt. Ltd.',
      location: 'Remote',
      mode: 'Remote',
      duration: '3 Months',
      match: 92,
      skills: [
        { name: 'Python', status: 'matched' },
        { name: 'Machine Learning', status: 'matched' },
        { name: 'SQL', status: 'matched' },
        { name: 'Power BI', status: 'missing' },
      ],
      description:
        'Work on real-world machine learning projects involving data preparation, model development and performance evaluation.',
      requirements: [
        'Python programming',
        'Machine Learning fundamentals',
        'SQL knowledge',
        'Basic understanding of data analysis',
      ],
      responsibilities: [
        'Develop and test machine learning models',
        'Clean and preprocess datasets',
        'Work with the data science team',
        'Prepare technical documentation',
      ],
    },

    {
      id: 2,
      title: 'Data Science Intern',
      company: 'Analytics Hub',
      location: 'Bangalore',
      mode: 'Hybrid',
      duration: '4 Months',
      match: 86,
      skills: [
        { name: 'Python', status: 'matched' },
        { name: 'Data Science', status: 'matched' },
        { name: 'SQL', status: 'matched' },
        { name: 'Power BI', status: 'missing' },
      ],
      description:
        'Join the analytics team and work with real datasets to generate insights and build data-driven solutions.',
      requirements: [
        'Python',
        'SQL',
        'Data analysis',
        'Statistics fundamentals',
      ],
      responsibilities: [
        'Analyze business datasets',
        'Create reports and dashboards',
        'Perform exploratory data analysis',
        'Communicate findings to the team',
      ],
    },

    {
      id: 3,
      title: 'Frontend Development Intern',
      company: 'Digital Solutions India',
      location: 'Kolkata',
      mode: 'Hybrid',
      duration: '6 Months',
      match: 78,
      skills: [
        { name: 'React', status: 'matched' },
        { name: 'JavaScript', status: 'matched' },
        { name: 'CSS', status: 'matched' },
        { name: 'Node.js', status: 'missing' },
      ],
      description:
        'Build modern and responsive web applications using React, JavaScript and modern frontend technologies.',
      requirements: [
        'HTML and CSS',
        'JavaScript',
        'React',
        'Basic Git knowledge',
      ],
      responsibilities: [
        'Develop reusable React components',
        'Create responsive user interfaces',
        'Fix frontend bugs',
        'Collaborate with backend developers',
      ],
    },
  ]


  const jobs = [
    {
      id: 1,
      title: 'Junior Machine Learning Engineer',
      company: 'Future AI Labs',
      location: 'Kolkata',
      mode: 'Hybrid',
      match: 89,
      salary: '₹5 - 7 LPA',
      description:
        'Join an AI-focused engineering team and help develop machine learning solutions for real-world applications.',
      requirements: [
        'Python',
        'Machine Learning',
        'SQL',
        'Basic Deep Learning',
      ],
      responsibilities: [
        'Develop machine learning pipelines',
        'Train and evaluate models',
        'Work with large datasets',
        'Collaborate with AI engineers',
      ],
    },

    {
      id: 2,
      title: 'Data Analyst',
      company: 'Insight Technologies',
      location: 'Mumbai',
      mode: 'On-site',
      match: 84,
      salary: '₹4 - 6 LPA',
      description:
        'Analyze business data and create meaningful insights to support data-driven decision making.',
      requirements: [
        'Python',
        'SQL',
        'Excel',
        'Data Visualization',
      ],
      responsibilities: [
        'Analyze datasets',
        'Create business reports',
        'Build dashboards',
        'Identify useful business trends',
      ],
    },

    {
      id: 3,
      title: 'Frontend Developer',
      company: 'NextGen Technologies',
      location: 'Remote',
      mode: 'Remote',
      match: 81,
      salary: '₹4 - 7 LPA',
      description:
        'Build high-quality web interfaces using modern frontend frameworks and technologies.',
      requirements: [
        'React',
        'JavaScript',
        'HTML',
        'CSS',
      ],
      responsibilities: [
        'Develop frontend features',
        'Build responsive interfaces',
        'Optimize web applications',
        'Collaborate with designers and developers',
      ],
    },
  ]


  const courses = [
    {
      id: 1,
      title: 'Power BI for Data Analytics',
      provider: 'Industry Learning Hub',
      level: 'Beginner',
      duration: '6 Weeks',
      reason:
        'Recommended because Power BI is a skill gap.',
      description:
        'Learn how to transform raw data into meaningful dashboards and business insights using Microsoft Power BI.',
      lessons: [
        'Power BI fundamentals',
        'Data cleaning',
        'Data visualization',
        'Dashboard creation',
        'Basic DAX',
      ],
    },

    {
      id: 2,
      title: 'Advanced SQL',
      provider: 'Tech Academy',
      level: 'Intermediate',
      duration: '4 Weeks',
      reason:
        'Improve your SQL proficiency for data and machine learning roles.',
      description:
        'Strengthen your SQL skills through advanced queries, joins, aggregation and real-world database problems.',
      lessons: [
        'Advanced SELECT queries',
        'Joins and subqueries',
        'Window functions',
        'Data aggregation',
        'Query optimization',
      ],
    },

    {
      id: 3,
      title: 'Deep Learning Fundamentals',
      provider: 'AI Learning Center',
      level: 'Intermediate',
      duration: '8 Weeks',
      reason:
        'Strengthen your AI and Machine Learning skills.',
      description:
        'Build a strong foundation in neural networks, deep learning architectures and practical AI applications.',
      lessons: [
        'Neural networks',
        'Activation functions',
        'Backpropagation',
        'CNN fundamentals',
        'Model evaluation',
      ],
    },
  ]


  /* =====================================================
     STATE
  ===================================================== */

  const [selectedOpportunity, setSelectedOpportunity] =
    useState(null)

  const [selectedOpportunityType, setSelectedOpportunityType] =
    useState(null)

  const [selectedCourse, setSelectedCourse] =
    useState(null)

  const [appliedInternships, setAppliedInternships] =
    useState(() => {

      const saved =
        localStorage.getItem(
          'recommendedInternshipApplications'
        )

      return saved
        ? JSON.parse(saved)
        : []

    })


  const [appliedJobs, setAppliedJobs] =
    useState(() => {

      const saved =
        localStorage.getItem(
          'recommendedJobApplications'
        )

      return saved
        ? JSON.parse(saved)
        : []

    })


  const [startedCourses, setStartedCourses] =
    useState(() => {

      const saved =
        localStorage.getItem(
          'recommendedStartedCourses'
        )

      return saved
        ? JSON.parse(saved)
        : []

    })


  /* =====================================================
     SAVE APPLICATIONS
  ===================================================== */

  useEffect(() => {

    localStorage.setItem(
      'recommendedInternshipApplications',
      JSON.stringify(appliedInternships)
    )

  }, [appliedInternships])


  useEffect(() => {

    localStorage.setItem(
      'recommendedJobApplications',
      JSON.stringify(appliedJobs)
    )

  }, [appliedJobs])


  useEffect(() => {

    localStorage.setItem(
      'recommendedStartedCourses',
      JSON.stringify(startedCourses)
    )

  }, [startedCourses])


  /* =====================================================
     ESC KEY
  ===================================================== */

  useEffect(() => {

    const handleEscape = (event) => {

      if (event.key === 'Escape') {

        setSelectedOpportunity(null)
        setSelectedCourse(null)

      }

    }

    document.addEventListener(
      'keydown',
      handleEscape
    )

    return () => {

      document.removeEventListener(
        'keydown',
        handleEscape
      )

    }

  }, [])


  /* =====================================================
     APPLY INTERNSHIP
  ===================================================== */

  const handleApplyInternship = (internship) => {

    setAppliedInternships((previous) => {

      if (previous.includes(internship.id)) {
        return previous
      }

      return [
        ...previous,
        internship.id,
      ]

    })

  }


  /* =====================================================
     APPLY JOB
  ===================================================== */

  const handleApplyJob = (job) => {

    setAppliedJobs((previous) => {

      if (previous.includes(job.id)) {
        return previous
      }

      return [
        ...previous,
        job.id,
      ]

    })

  }


  /* =====================================================
     VIEW INTERNSHIP DETAILS
  ===================================================== */

  const handleViewInternship = (internship) => {

    setSelectedOpportunity(
      internship
    )

    setSelectedOpportunityType(
      'internship'
    )

  }


  /* =====================================================
     VIEW JOB DETAILS
  ===================================================== */

  const handleViewJob = (job) => {

    setSelectedOpportunity(
      job
    )

    setSelectedOpportunityType(
      'job'
    )

  }


  /* =====================================================
     START COURSE
  ===================================================== */

  const handleStartLearning = (course) => {

    setStartedCourses((previous) => {

      if (previous.includes(course.id)) {
        return previous
      }

      return [
        ...previous,
        course.id,
      ]

    })

    setSelectedCourse(null)

  }


  /* =====================================================
     CHECK APPLICATION
  ===================================================== */

  const isInternshipApplied = (id) => {

    return appliedInternships.includes(id)

  }


  const isJobApplied = (id) => {

    return appliedJobs.includes(id)

  }


  const isCourseStarted = (id) => {

    return startedCourses.includes(id)

  }


  /* =====================================================
     RETURN
  ===================================================== */

  return (

    <div className="recommendations-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="recommendations-header">

        <div>

          <p className="page-tag">
            🤖 AI POWERED
          </p>

          <h1>
            Recommendations
          </h1>

          <p className="page-description">
            Discover opportunities and learning resources
            matched to your skills, interests and career goals.
          </p>

        </div>


        <div className="ai-badge">
          🤖 AI Recommendations
        </div>

      </div>


      {/* =================================================
          AI SUMMARY
      ================================================= */}

      <section className="ai-summary-card">

        <div className="ai-summary-icon">
          🤖
        </div>

        <div className="ai-summary-content">

          <p className="ai-label">
            AI INSIGHT
          </p>

          <h2>
            Recommendations based on your skill profile
          </h2>

          <p>
            Our AI has analyzed your current skills,
            skill gaps and career interests to identify
            the most relevant opportunities and learning paths.
          </p>

        </div>

      </section>


      {/* =================================================
          INTERNSHIPS
      ================================================= */}

      <section className="recommendation-section">

        <div className="section-heading-row">

          <div>

            <p className="section-tag">
              OPPORTUNITIES
            </p>

            <h2>
              Recommended Internships
            </h2>

            <p>
              Internships that best match your current skill profile.
            </p>

          </div>


          <span className="ai-section-badge">
            🤖 AI Matched
          </span>

        </div>


        <div className="recommendation-grid">

          {internships.map((internship) => {

            const applied =
              isInternshipApplied(
                internship.id
              )

            return (

              <div
                className="recommendation-card"
                key={internship.id}
              >

                <div className="recommendation-card-top">

                  <span className="opportunity-label">
                    Internship
                  </span>

                  <div className="match-score">

                    <strong>
                      {internship.match}%
                    </strong>

                    <span>
                      Match
                    </span>

                  </div>

                </div>


                <h3>
                  {internship.title}
                </h3>


                <p className="recommendation-company">
                  🏢 {internship.company}
                </p>


                <div className="recommendation-meta">

                  <span>
                    📍 {internship.location}
                  </span>

                  <span>
                    💼 {internship.mode}
                  </span>

                  <span>
                    ◷ {internship.duration}
                  </span>

                </div>


                <div className="recommended-skills">

                  {internship.skills.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className={
                          skill.status === 'matched'
                            ? 'skill-matched'
                            : 'skill-missing'
                        }
                      >

                        {skill.status === 'matched'
                          ? '✓'
                          : '⚠'}

                        {' '}

                        {skill.name}

                      </span>

                    )
                  )}

                </div>


                <div className="recommendation-actions">

                  <button
                    className="secondary-action-btn"
                    type="button"
                    onClick={() =>
                      handleViewInternship(
                        internship
                      )
                    }
                  >
                    View Details
                  </button>


                  <button
                    className={
                      applied
                        ? 'primary-action-btn applied'
                        : 'primary-action-btn'
                    }
                    type="button"
                    disabled={applied}
                    onClick={() =>
                      handleApplyInternship(
                        internship
                      )
                    }
                  >

                    {applied
                      ? '✓ Applied'
                      : 'Apply'}

                  </button>

                </div>

              </div>

            )

          })}

        </div>

      </section>


      {/* =================================================
          JOBS
      ================================================= */}

      <section className="recommendation-section">

        <div className="section-heading-row">

          <div>

            <p className="section-tag">
              CAREER OPPORTUNITIES
            </p>

            <h2>
              Recommended Jobs
            </h2>

            <p>
              Job opportunities aligned with your career profile.
            </p>

          </div>


          <span className="ai-section-badge">
            🤖 AI Matched
          </span>

        </div>


        <div className="recommendation-grid">

          {jobs.map((job) => {

            const applied =
              isJobApplied(job.id)

            return (

              <div
                className="job-recommendation-card"
                key={job.id}
              >

                <div className="job-card-top">

                  <span className="job-label">
                    Job
                  </span>

                  <div className="match-score">

                    <strong>
                      {job.match}%
                    </strong>

                    <span>
                      Match
                    </span>

                  </div>

                </div>


                <h3>
                  {job.title}
                </h3>


                <p className="recommendation-company">
                  🏢 {job.company}
                </p>


                <div className="recommendation-meta">

                  <span>
                    📍 {job.location}
                  </span>

                  <span>
                    💼 {job.mode}
                  </span>

                </div>


                <div className="job-salary">
                  💰 {job.salary}
                </div>


                <div className="recommendation-actions">

                  <button
                    className="secondary-action-btn"
                    type="button"
                    onClick={() =>
                      handleViewJob(job)
                    }
                  >
                    View Details
                  </button>


                  <button
                    className={
                      applied
                        ? 'primary-action-btn applied'
                        : 'primary-action-btn'
                    }
                    type="button"
                    disabled={applied}
                    onClick={() =>
                      handleApplyJob(job)
                    }
                  >

                    {applied
                      ? '✓ Applied'
                      : 'Apply'}

                  </button>

                </div>

              </div>

            )

          })}

        </div>

      </section>


      {/* =================================================
          COURSES
      ================================================= */}

      <section className="recommendation-section">

        <div className="section-heading-row">

          <div>

            <p className="section-tag">
              LEARNING
            </p>

            <h2>
              Recommended Learning
            </h2>

            <p>
              Courses selected to help you close your identified skill gaps.
            </p>

          </div>


          <span className="learning-badge">
            Skill Gap Based
          </span>

        </div>


        <div className="course-recommendation-grid">

          {courses.map((course) => {

            const started =
              isCourseStarted(course.id)

            return (

              <div
                className="course-recommendation-card"
                key={course.id}
              >

                <div className="course-icon">
                  📚
                </div>


                <div className="course-content">

                  <span className="course-label">
                    Recommended Course
                  </span>


                  <h3>
                    {course.title}
                  </h3>


                  <p className="course-provider">
                    {course.provider}
                  </p>


                  <div className="course-meta">

                    <span>
                      📊 {course.level}
                    </span>

                    <span>
                      ◷ {course.duration}
                    </span>

                  </div>


                  <p className="course-reason">
                    💡 {course.reason}
                  </p>


                  <button
                    className={
                      started
                        ? 'course-btn started'
                        : 'course-btn'
                    }
                    type="button"
                    onClick={() =>
                      setSelectedCourse(course)
                    }
                  >

                    {started
                      ? '✓ Learning Started'
                      : 'View Course'}

                  </button>

                </div>

              </div>

            )

          })}

        </div>

      </section>


      {/* =================================================
          CAREER INSIGHT
      ================================================= */}

      <section className="career-insight-card">

        <div className="career-insight-icon">
          🎯
        </div>


        <div>

          <p className="section-tag">
            CAREER INSIGHT
          </p>


          <h2>
            Your strongest career direction
          </h2>


          <p>
            Based on your current skill profile,
            Machine Learning and Data Science roles
            appear to be your strongest career matches.
          </p>


          <div className="career-tags">

            <span>
              Machine Learning
            </span>

            <span>
              Data Science
            </span>

            <span>
              AI Engineering
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          OPPORTUNITY DETAILS MODAL
      ================================================= */}

      {selectedOpportunity && (

        <div
          className="course-modal-overlay"
          onClick={() => {

            setSelectedOpportunity(null)
            setSelectedOpportunityType(null)

          }}
        >

          <div
            className="course-modal opportunity-details-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="course-modal-close"
              type="button"
              onClick={() => {

                setSelectedOpportunity(null)
                setSelectedOpportunityType(null)

              }}
            >
              ×
            </button>


            <span className="modal-opportunity-label">

              {selectedOpportunityType === 'internship'
                ? 'INTERNSHIP'
                : 'JOB'}

            </span>


            <h2>
              {selectedOpportunity.title}
            </h2>


            <p className="course-modal-provider">
              🏢 {selectedOpportunity.company}
            </p>


            <div className="course-modal-meta">

              <span>
                📍 {selectedOpportunity.location}
              </span>

              <span>
                💼 {selectedOpportunity.mode}
              </span>

              {selectedOpportunity.duration && (

                <span>
                  ◷ {selectedOpportunity.duration}
                </span>

              )}

              {selectedOpportunity.salary && (

                <span>
                  💰 {selectedOpportunity.salary}
                </span>

              )}

            </div>


            <div className="match-modal-score">

              <strong>
                {selectedOpportunity.match}%
              </strong>

              <span>
                AI Match
              </span>

            </div>


            <div className="course-modal-section">

              <h3>
                About this opportunity
              </h3>

              <p>
                {selectedOpportunity.description}
              </p>

            </div>


            <div className="course-modal-section">

              <h3>
                Requirements
              </h3>

              <ul>

                {selectedOpportunity.requirements.map(
                  (item, index) => (

                    <li key={index}>
                      {item}
                    </li>

                  )
                )}

              </ul>

            </div>


            <div className="course-modal-section">

              <h3>
                Responsibilities
              </h3>

              <ul>

                {selectedOpportunity.responsibilities.map(
                  (item, index) => (

                    <li key={index}>
                      {item}
                    </li>

                  )
                )}

              </ul>

            </div>


            <div className="course-modal-actions">

              <button
                className="course-close-btn"
                type="button"
                onClick={() => {

                  setSelectedOpportunity(null)
                  setSelectedOpportunityType(null)

                }}
              >
                Close
              </button>


              {selectedOpportunityType === 'internship' ? (

                <button
                  className={
                    isInternshipApplied(
                      selectedOpportunity.id
                    )
                      ? 'course-start-btn applied'
                      : 'course-start-btn'
                  }
                  type="button"
                  disabled={
                    isInternshipApplied(
                      selectedOpportunity.id
                    )
                  }
                  onClick={() =>
                    handleApplyInternship(
                      selectedOpportunity
                    )
                  }
                >

                  {isInternshipApplied(
                    selectedOpportunity.id
                  )
                    ? '✓ Applied'
                    : 'Apply Now →'}

                </button>

              ) : (

                <button
                  className={
                    isJobApplied(
                      selectedOpportunity.id
                    )
                      ? 'course-start-btn applied'
                      : 'course-start-btn'
                  }
                  type="button"
                  disabled={
                    isJobApplied(
                      selectedOpportunity.id
                    )
                  }
                  onClick={() =>
                    handleApplyJob(
                      selectedOpportunity
                    )
                  }
                >

                  {isJobApplied(
                    selectedOpportunity.id
                  )
                    ? '✓ Applied'
                    : 'Apply Now →'}

                </button>

              )}

            </div>

          </div>

        </div>

      )}


      {/* =================================================
          COURSE DETAILS MODAL
      ================================================= */}

      {selectedCourse && (

        <div
          className="course-modal-overlay"
          onClick={() =>
            setSelectedCourse(null)
          }
        >

          <div
            className="course-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="course-modal-close"
              type="button"
              onClick={() =>
                setSelectedCourse(null)
              }
            >
              ×
            </button>


            <div className="course-modal-icon">
              📚
            </div>


            <p className="course-modal-label">
              RECOMMENDED COURSE
            </p>


            <h2>
              {selectedCourse.title}
            </h2>


            <p className="course-modal-provider">
              {selectedCourse.provider}
            </p>


            <div className="course-modal-meta">

              <span>
                📊 {selectedCourse.level}
              </span>

              <span>
                ◷ {selectedCourse.duration}
              </span>

            </div>


            <div className="course-modal-section">

              <h3>
                About this course
              </h3>

              <p>
                {selectedCourse.description}
              </p>

            </div>


            <div className="course-modal-section">

              <h3>
                Why this course?
              </h3>

              <p>
                💡 {selectedCourse.reason}
              </p>

            </div>


            <div className="course-modal-section">

              <h3>
                What you will learn
              </h3>

              <ul>

                {selectedCourse.lessons.map(
                  (lesson, index) => (

                    <li key={index}>
                      {lesson}
                    </li>

                  )
                )}

              </ul>

            </div>


            <div className="course-modal-actions">

              <button
                className="course-close-btn"
                type="button"
                onClick={() =>
                  setSelectedCourse(null)
                }
              >
                Close
              </button>


              <button
                className={
                  isCourseStarted(
                    selectedCourse.id
                  )
                    ? 'course-start-btn started'
                    : 'course-start-btn'
                }
                type="button"
                onClick={() =>
                  handleStartLearning(
                    selectedCourse
                  )
                }
              >

                {isCourseStarted(
                  selectedCourse.id
                )
                  ? '✓ Learning Started'
                  : 'Start Learning →'}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}

export default Recommendations