import { useEffect, useState } from 'react'
import './Learning.css'

function Learning() {
  const [startedCourse, setStartedCourse] = useState(null)
  const [progress, setProgress] = useState(0)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // =========================
  // COURSES
  // =========================

  const courses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      provider: 'AI Learning Center',
      level: 'Beginner',
      duration: '8 Weeks',
      category: 'Machine Learning',
      description:
        'Learn the fundamentals of machine learning, data preprocessing, model training and evaluation.',
      skills: [
        'Python',
        'NumPy',
        'Pandas',
        'Machine Learning',
        'Model Evaluation',
      ],
      modules: [
        'Python for Machine Learning',
        'Data Preprocessing',
        'Exploratory Data Analysis',
        'Supervised Learning',
        'Unsupervised Learning',
        'Model Evaluation',
        'Machine Learning Project',
      ],
    },

    {
      id: 2,
      title: 'Power BI for Data Analytics',
      provider: 'Industry Learning Hub',
      level: 'Beginner',
      duration: '6 Weeks',
      category: 'Data Analytics',
      description:
        'Learn how to transform raw data into meaningful dashboards and business insights using Power BI.',
      skills: [
        'Power BI',
        'Data Cleaning',
        'Data Visualization',
        'DAX',
        'Dashboard Design',
      ],
      modules: [
        'Introduction to Power BI',
        'Data Import and Cleaning',
        'Data Modelling',
        'Data Visualization',
        'DAX Fundamentals',
        'Interactive Dashboards',
        'Analytics Project',
      ],
    },

    {
      id: 3,
      title: 'Advanced SQL',
      provider: 'Tech Academy',
      level: 'Intermediate',
      duration: '4 Weeks',
      category: 'Database',
      description:
        'Improve your SQL skills with advanced queries, joins, subqueries and analytical functions.',
      skills: [
        'SQL',
        'Joins',
        'Subqueries',
        'CTE',
        'Window Functions',
      ],
      modules: [
        'Advanced SELECT Queries',
        'Joins',
        'Subqueries',
        'Common Table Expressions',
        'Window Functions',
        'Query Optimization',
        'SQL Project',
      ],
    },

    {
      id: 4,
      title: 'Deep Learning Fundamentals',
      provider: 'AI Learning Center',
      level: 'Intermediate',
      duration: '8 Weeks',
      category: 'Artificial Intelligence',
      description:
        'Understand neural networks, deep learning architectures and practical AI applications.',
      skills: [
        'Python',
        'Neural Networks',
        'TensorFlow',
        'CNN',
        'Deep Learning',
      ],
      modules: [
        'Neural Network Basics',
        'Forward and Backpropagation',
        'Activation Functions',
        'CNN',
        'Transfer Learning',
        'Model Training',
        'Deep Learning Project',
      ],
    },
  ]

  // =========================
  // CHECK STARTED COURSE
  // =========================

  useEffect(() => {
    const savedCourse = localStorage.getItem('activeLearningCourse')
    const savedProgress = localStorage.getItem('learningProgress')

    if (savedCourse) {
      setStartedCourse(JSON.parse(savedCourse))
    }

    if (savedProgress) {
      setProgress(Number(savedProgress))
    }
  }, [])

  // =========================
  // START COURSE
  // =========================

  const startCourse = (course) => {
    localStorage.setItem(
      'activeLearningCourse',
      JSON.stringify(course)
    )

    localStorage.setItem('learningProgress', '0')

    setStartedCourse(course)
    setProgress(0)

    setSelectedCourse(null)
  }

  // =========================
  // CONTINUE COURSE
  // =========================

  const continueLearning = () => {
    if (!startedCourse) return

    const newProgress = Math.min(progress + 10, 100)

    setProgress(newProgress)

    localStorage.setItem(
      'learningProgress',
      String(newProgress)
    )
  }

  // =========================
  // RESET COURSE
  // =========================

  const resetCourse = () => {
    localStorage.removeItem('activeLearningCourse')
    localStorage.removeItem('learningProgress')

    setStartedCourse(null)
    setProgress(0)
  }

  // =========================
  // VIEW COURSE
  // =========================

  const viewCourse = (course) => {
    setSelectedCourse(course)
  }

  return (
    <div className="learning-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="learning-header">

        <div>
          <p className="learning-tag">
            📚 STUDENT LEARNING
          </p>

          <h1>
            Learning
          </h1>

          <p className="learning-subtitle">
            Build your skills with personalized courses and
            career-focused learning paths.
          </p>
        </div>

        <div className="learning-status">
          <span className="status-dot"></span>
          Learning Portal
        </div>

      </header>


      {/* =========================
          ACTIVE LEARNING
      ========================= */}

      {startedCourse && (
        <section className="active-learning-card">

          <div className="active-learning-left">

            <div className="active-icon">
              🚀
            </div>

            <div>

              <p className="active-label">
                CURRENTLY LEARNING
              </p>

              <h2>
                {startedCourse.title}
              </h2>

              <p className="active-provider">
                {startedCourse.provider}
              </p>

              <div className="active-meta">

                <span>
                  📊 {startedCourse.level}
                </span>

                <span>
                  ⏱ {startedCourse.duration}
                </span>

                <span>
                  🎯 {startedCourse.category}
                </span>

              </div>

            </div>

          </div>


          <div className="active-learning-right">

            <div className="progress-info">

              <span>
                Course Progress
              </span>

              <strong>
                {progress}%
              </strong>

            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${progress}%`,
                }}
              ></div>
            </div>

            <div className="active-actions">

              <button
                className="continue-btn"
                onClick={continueLearning}
              >
                {progress >= 100
                  ? '✓ Course Completed'
                  : 'Continue Learning →'}
              </button>

              <button
                className="reset-btn"
                onClick={resetCourse}
              >
                Reset
              </button>

            </div>

          </div>

        </section>
      )}


      {/* =========================
          LEARNING STATS
      ========================= */}

      <section className="learning-stats">

        <div className="learning-stat-card">

          <div className="stat-icon">
            📚
          </div>

          <div>
            <span>Available Courses</span>
            <strong>{courses.length}</strong>
          </div>

        </div>


        <div className="learning-stat-card">

          <div className="stat-icon">
            🚀
          </div>

          <div>
            <span>Active Course</span>
            <strong>
              {startedCourse ? '1' : '0'}
            </strong>
          </div>

        </div>


        <div className="learning-stat-card">

          <div className="stat-icon">
            📈
          </div>

          <div>
            <span>Overall Progress</span>
            <strong>
              {startedCourse ? `${progress}%` : '0%'}
            </strong>
          </div>

        </div>

      </section>


      {/* =========================
          RECOMMENDED COURSES
      ========================= */}

      <section className="learning-section">

        <div className="section-heading">

          <div>

            <p className="section-tag">
              RECOMMENDED FOR YOU
            </p>

            <h2>
              Learning Courses
            </h2>

            <p>
              Courses selected to help you improve your
              skills and become industry ready.
            </p>

          </div>

          <span className="course-count">
            {courses.length} Courses
          </span>

        </div>


        <div className="learning-grid">

          {courses.map((course) => {

            const isActive =
              startedCourse?.id === course.id

            return (

              <div
                className={`learning-course-card ${
                  isActive ? 'active-course' : ''
                }`}
                key={course.id}
              >

                {/* COURSE TOP */}

                <div className="course-top">

                  <div className="course-main-icon">
                    📚
                  </div>

                  {isActive && (
                    <span className="started-badge">
                      ✓ Learning
                    </span>
                  )}

                </div>


                {/* COURSE CONTENT */}

                <p className="course-label">
                  {course.category}
                </p>

                <h3>
                  {course.title}
                </h3>

                <p className="course-provider">
                  {course.provider}
                </p>

                <p className="course-description">
                  {course.description}
                </p>


                {/* META */}

                <div className="course-meta">

                  <span>
                    📊 {course.level}
                  </span>

                  <span>
                    ⏱ {course.duration}
                  </span>

                </div>


                {/* SKILLS */}

                <div className="course-skills">

                  {course.skills.slice(0, 4).map(
                    (skill, index) => (
                      <span key={index}>
                        {skill}
                      </span>
                    )
                  )}

                </div>


                {/* BUTTON */}

                <div className="course-actions">

                  <button
                    className="view-course-btn"
                    onClick={() =>
                      viewCourse(course)
                    }
                  >
                    View Course
                  </button>

                  <button
                    className={
                      isActive
                        ? 'continue-course-btn'
                        : 'start-course-btn'
                    }
                    onClick={() =>
                      startCourse(course)
                    }
                  >
                    {isActive
                      ? 'Continue →'
                      : 'Start Learning →'}
                  </button>

                </div>

              </div>

            )
          })}

        </div>

      </section>


      {/* =========================
          COURSE DETAILS MODAL
      ========================= */}

      {selectedCourse && (

        <div
          className="learning-modal-overlay"
          onClick={() =>
            setSelectedCourse(null)
          }
        >

          <div
            className="learning-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedCourse(null)
              }
            >
              ×
            </button>


            <div className="modal-course-icon">
              📚
            </div>

            <p className="modal-label">
              COURSE DETAILS
            </p>

            <h2>
              {selectedCourse.title}
            </h2>

            <p className="modal-provider">
              {selectedCourse.provider}
            </p>


            <div className="modal-meta">

              <span>
                📊 {selectedCourse.level}
              </span>

              <span>
                ⏱ {selectedCourse.duration}
              </span>

              <span>
                🎯 {selectedCourse.category}
              </span>

            </div>


            <div className="modal-description">

              <h3>
                About this course
              </h3>

              <p>
                {selectedCourse.description}
              </p>

            </div>


            <div className="modal-section">

              <h3>
                What you will learn
              </h3>

              <div className="modal-skills">

                {selectedCourse.skills.map(
                  (skill, index) => (
                    <span key={index}>
                      ✓ {skill}
                    </span>
                  )
                )}

              </div>

            </div>


            <div className="modal-section">

              <h3>
                Course Modules
              </h3>

              <div className="module-list">

                {selectedCourse.modules.map(
                  (module, index) => (

                    <div
                      className="module-item"
                      key={index}
                    >

                      <span className="module-number">
                        {index + 1}
                      </span>

                      <span>
                        {module}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>


            <div className="modal-actions">

              <button
                className="modal-secondary-btn"
                onClick={() =>
                  setSelectedCourse(null)
                }
              >
                Close
              </button>

              <button
                className="modal-primary-btn"
                onClick={() =>
                  startCourse(selectedCourse)
                }
              >
                {startedCourse?.id === selectedCourse.id
                  ? 'Continue Learning →'
                  : 'Start Learning →'}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Learning