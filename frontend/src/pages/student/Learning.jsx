import { useEffect, useMemo, useState } from 'react'
import './Learning.css'

function Learning() {

  /* =====================================================
     COURSE DATA
  ===================================================== */

  const courses = [
    {
      id: 1,
      title: 'Machine Learning Fundamentals',
      provider: 'AI Learning Center',
      level: 'Beginner',
      duration: '8 Weeks',
      category: 'Machine Learning',

      relatedSkills: [
        'programming',
        'python',
        'machineLearning',
      ],

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

      relatedSkills: [
        'database',
        'python',
      ],

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

      relatedSkills: [
        'database',
      ],

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

      relatedSkills: [
        'python',
        'machineLearning',
      ],

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

    {
      id: 5,
      title: 'JavaScript & React Development',
      provider: 'Web Development Academy',
      level: 'Beginner',
      duration: '6 Weeks',
      category: 'Frontend Development',

      relatedSkills: [
        'javascript',
        'programming',
      ],

      description:
        'Build modern and responsive web applications using JavaScript, React and component-based development.',

      skills: [
        'JavaScript',
        'React',
        'HTML',
        'CSS',
        'Git',
      ],

      modules: [
        'JavaScript Fundamentals',
        'ES6 Features',
        'React Fundamentals',
        'Components and Props',
        'State and Events',
        'React Routing',
        'Frontend Project',
      ],
    },

    {
      id: 6,
      title: 'Communication & Professional Skills',
      provider: 'Professional Skills Academy',
      level: 'Beginner',
      duration: '4 Weeks',
      category: 'Soft Skills',

      relatedSkills: [
        'communication',
        'teamwork',
        'problemSolving',
        'leadership',
      ],

      description:
        'Develop communication, teamwork, problem-solving and professional skills required for the workplace.',

      skills: [
        'Communication',
        'Teamwork',
        'Problem Solving',
        'Leadership',
        'Presentation',
      ],

      modules: [
        'Professional Communication',
        'Team Collaboration',
        'Problem Solving',
        'Presentation Skills',
        'Leadership Basics',
        'Workplace Communication',
        'Professional Skills Project',
      ],
    },
  ]


  /* =====================================================
     ASSESSMENT
     ===================================================== */

  const [assessment, setAssessment] = useState(null)


  /* =====================================================
     ACTIVE COURSE
     ===================================================== */

  const [startedCourse, setStartedCourse] =
    useState(null)


  /* =====================================================
     PROGRESS
     ===================================================== */

  const [courseProgress, setCourseProgress] =
    useState({})


  /* =====================================================
     SELECTED COURSE
     ===================================================== */

  const [selectedCourse, setSelectedCourse] =
    useState(null)


  /* =====================================================
     LOAD SAVED DATA
     ===================================================== */

  useEffect(() => {

    try {

      /* Assessment */

      const savedAssessment =
        localStorage.getItem('skillAssessment')

      if (savedAssessment) {

        const parsedAssessment =
          JSON.parse(savedAssessment)

        if (
          parsedAssessment &&
          typeof parsedAssessment === 'object'
        ) {
          setAssessment(parsedAssessment)
        }

      }


      /* Active course */

      const savedActiveCourse =
        localStorage.getItem(
          'activeLearningCourse'
        )

      if (savedActiveCourse) {

        const parsedCourse =
          JSON.parse(savedActiveCourse)

        if (parsedCourse) {
          setStartedCourse(parsedCourse)
        }

      }


      /* New progress system */

      const savedCourseProgress =
        localStorage.getItem(
          'learningCourseProgress'
        )

      if (savedCourseProgress) {

        const parsedProgress =
          JSON.parse(savedCourseProgress)

        if (
          parsedProgress &&
          typeof parsedProgress === 'object'
        ) {
          setCourseProgress(parsedProgress)
        }

      }

      /* Old progress system compatibility */

      else {

        const oldProgress =
          localStorage.getItem(
            'learningProgress'
          )

        if (oldProgress) {

          const oldCourse =
            localStorage.getItem(
              'activeLearningCourse'
            )

          if (oldCourse) {

            const parsedCourse =
              JSON.parse(oldCourse)

            const value =
              Number(oldProgress)

            setCourseProgress({
              [parsedCourse.id]:
                Number.isFinite(value)
                  ? value
                  : 0,
            })

          }

        }

      }

    } catch (error) {

      console.error(
        'Failed to load learning data:',
        error
      )

    }

  }, [])


  /* =====================================================
     SAVE COURSE PROGRESS
     ===================================================== */

  useEffect(() => {

    localStorage.setItem(
      'learningCourseProgress',
      JSON.stringify(courseProgress)
    )

  }, [courseProgress])


  /* =====================================================
     ASSESSMENT LEVEL → SCORE
     ===================================================== */

  const getSkillScore = (level) => {

    const scores = {
      Beginner: 20,
      Basic: 40,
      Intermediate: 60,
      Advanced: 80,
      Expert: 100,
    }

    return scores[level] || 0
  }


  /* =====================================================
     FIND SKILL GAPS
     ===================================================== */

  const skillGaps = useMemo(() => {

    if (!assessment) {
      return []
    }

    const requiredLevels = {

      programming: 70,
      python: 75,
      javascript: 70,
      database: 65,
      machineLearning: 80,
      communication: 70,
      teamwork: 75,
      problemSolving: 75,
      leadership: 70,

    }


    return Object.entries(requiredLevels)
      .map(([skill, required]) => {

        const current =
          getSkillScore(
            assessment[skill]
          )

        const gap =
          Math.max(
            required - current,
            0
          )

        return {
          skill,
          current,
          required,
          gap,
        }

      })
      .filter(
        (item) => item.gap > 0
      )
      .sort(
        (a, b) => b.gap - a.gap
      )

  }, [assessment])


  /* =====================================================
     RECOMMEND COURSES FROM SKILL GAPS
     ===================================================== */

  const recommendedCourses = useMemo(() => {

    if (!assessment) {
      return courses
    }

    const gapSkills =
      skillGaps.map(
        (item) => item.skill
      )

    const matched =
      courses.filter(
        (course) =>
          course.relatedSkills.some(
            (skill) =>
              gapSkills.includes(skill)
          )
      )

    return matched.length > 0
      ? matched
      : courses

  }, [assessment, skillGaps])


  /* =====================================================
     COURSE PROGRESS
     ===================================================== */

  const getCourseProgress = (courseId) => {

    const value =
      Number(
        courseProgress[courseId] || 0
      )

    return Math.min(
      Math.max(value, 0),
      100
    )

  }


  /* =====================================================
     START COURSE
     ===================================================== */

  const startCourse = (course) => {

    localStorage.setItem(
      'activeLearningCourse',
      JSON.stringify(course)
    )

    setStartedCourse(course)

    setCourseProgress(
      (previous) => {

        if (
          previous[course.id] !== undefined
        ) {
          return previous
        }

        return {
          ...previous,
          [course.id]: 0,
        }

      }
    )

    /* Compatibility with old code */

    const existingProgress =
      getCourseProgress(course.id)

    localStorage.setItem(
      'learningProgress',
      String(existingProgress)
    )

    setSelectedCourse(null)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  }


  /* =====================================================
     CONTINUE LEARNING
     ===================================================== */

  const continueLearning = () => {

    if (!startedCourse) {
      return
    }

    const currentProgress =
      getCourseProgress(
        startedCourse.id
      )

    const newProgress =
      Math.min(
        currentProgress + 10,
        100
      )

    setCourseProgress(
      (previous) => ({
        ...previous,
        [startedCourse.id]:
          newProgress,
      })
    )

    localStorage.setItem(
      'learningProgress',
      String(newProgress)
    )

  }


  /* =====================================================
     RESET ACTIVE COURSE
     ===================================================== */

  const resetCourse = () => {

    if (!startedCourse) {
      return
    }

    const courseId =
      startedCourse.id

    setCourseProgress(
      (previous) => {

        const updated = {
          ...previous,
        }

        delete updated[courseId]

        return updated

      }
    )

    localStorage.removeItem(
      'activeLearningCourse'
    )

    localStorage.removeItem(
      'learningProgress'
    )

    setStartedCourse(null)

  }


  /* =====================================================
     VIEW COURSE
     ===================================================== */

  const viewCourse = (course) => {

    setSelectedCourse(course)

  }


  /* =====================================================
     ASSESSMENT STATUS
     ===================================================== */

  const hasAssessment =
    Boolean(assessment)


  /* =====================================================
     ACTIVE COURSE PROGRESS
     ===================================================== */

  const activeProgress =
    startedCourse
      ? getCourseProgress(
          startedCourse.id
        )
      : 0


  /* =====================================================
     COMPLETED COURSES
     ===================================================== */

  const completedCourses =
    courses.filter(
      (course) =>
        getCourseProgress(
          course.id
        ) >= 100
    ).length


  /* =====================================================
     TOTAL LEARNING PROGRESS
     ===================================================== */

  const overallProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce(
            (total, course) =>
              total +
              getCourseProgress(
                course.id
              ),
            0
          ) /
          courses.length
        )
      : 0


  /* =====================================================
     RETURN
     ===================================================== */

  return (

    <div className="learning-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <header className="learning-header">

        <div>

          <p className="learning-tag">
            📚 STUDENT LEARNING
          </p>

          <h1>
            Learning
          </h1>

          <p className="learning-subtitle">
            Build your skills through personalized
            learning paths based on your skill gaps
            and career goals.
          </p>

        </div>


        <div className="learning-status">

          <span className="status-dot"></span>

          Learning Portal

        </div>

      </header>


      {/* =================================================
          ASSESSMENT NOTICE
      ================================================= */}

      {!hasAssessment && (

        <section className="active-learning-card">

          <div className="active-learning-left">

            <div className="active-icon">
              🎯
            </div>

            <div>

              <p className="active-label">
                PERSONALIZED LEARNING
              </p>

              <h2>
                Complete your Skill Assessment
              </h2>

              <p className="active-provider">
                Complete the assessment to receive
                learning recommendations based on
                your skill gaps.
              </p>

            </div>

          </div>


          <div className="active-learning-right">

            <p>
              Your learning recommendations will be
              personalized after completing the
              Skill Assessment.
            </p>

          </div>

        </section>

      )}


      {/* =================================================
          ACTIVE LEARNING
      ================================================= */}

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
                {activeProgress}%
              </strong>

            </div>


            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{
                  width:
                    `${activeProgress}%`,
                }}
              />

            </div>


            <div className="active-actions">

              <button
                className="continue-btn"
                onClick={
                  continueLearning
                }
                disabled={
                  activeProgress >= 100
                }
              >

                {activeProgress >= 100
                  ? '✓ Course Completed'
                  : 'Continue Learning →'}

              </button>


              <button
                className="reset-btn"
                onClick={
                  resetCourse
                }
              >
                Reset
              </button>

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          LEARNING STATS
      ================================================= */}

      <section className="learning-stats">


        <div className="learning-stat-card">

          <div className="stat-icon">
            📚
          </div>

          <div>

            <span>
              Recommended Courses
            </span>

            <strong>
              {recommendedCourses.length}
            </strong>

          </div>

        </div>


        <div className="learning-stat-card">

          <div className="stat-icon">
            🚀
          </div>

          <div>

            <span>
              Active Course
            </span>

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

            <span>
              Overall Progress
            </span>

            <strong>
              {overallProgress}%
            </strong>

          </div>

        </div>


        <div className="learning-stat-card">

          <div className="stat-icon">
            🏆
          </div>

          <div>

            <span>
              Completed
            </span>

            <strong>
              {completedCourses}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          SKILL GAP SUMMARY
      ================================================= */}

      {hasAssessment &&
        skillGaps.length > 0 && (

        <section className="active-learning-card">

          <div className="active-learning-left">

            <div className="active-icon">
              🎯
            </div>

            <div>

              <p className="active-label">
                BASED ON YOUR ASSESSMENT
              </p>

              <h2>
                Close your skill gaps
              </h2>

              <p className="active-provider">
                These learning resources are selected
                according to the skills you need to improve.
              </p>

            </div>

          </div>


          <div className="active-learning-right">

            <div className="active-meta">

              {skillGaps
                .slice(0, 3)
                .map((gap) => (

                  <span key={gap.skill}>

                    {gap.skill}
                    {' '}
                    {gap.gap}% gap

                  </span>

                ))}

            </div>

          </div>

        </section>

      )}


      {/* =================================================
          RECOMMENDED COURSES
      ================================================= */}

      <section className="learning-section">


        <div className="section-heading">

          <div>

            <p className="section-tag">
              {hasAssessment
                ? 'PERSONALIZED FOR YOU'
                : 'RECOMMENDED FOR YOU'}
            </p>

            <h2>
              Learning Courses
            </h2>

            <p>
              {hasAssessment
                ? 'Courses selected according to your skill assessment and identified skill gaps.'
                : 'Complete your skill assessment to receive personalized learning recommendations.'}
            </p>

          </div>


          <span className="course-count">

            {recommendedCourses.length}
            {' '}
            Courses

          </span>

        </div>


        <div className="learning-grid">

          {recommendedCourses.map(
            (course) => {

              const isActive =
                startedCourse?.id ===
                course.id

              const progress =
                getCourseProgress(
                  course.id
                )

              return (

                <div
                  className={`learning-course-card ${
                    isActive
                      ? 'active-course'
                      : ''
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

                    {course.skills
                      .slice(0, 4)
                      .map(
                        (
                          skill,
                          index
                        ) => (

                          <span key={index}>
                            {skill}
                          </span>

                        )
                      )}

                  </div>


                  {/* PROGRESS */}

                  {progress > 0 && (

                    <div
                      style={{
                        marginTop:
                          '14px',
                      }}
                    >

                      <div
                        style={{
                          display:
                            'flex',
                          justifyContent:
                            'space-between',
                          marginBottom:
                            '6px',
                          fontSize:
                            '13px',
                        }}
                      >

                        <span>
                          Progress
                        </span>

                        <strong>
                          {progress}%
                        </strong>

                      </div>


                      <div className="progress-bar">

                        <div
                          className="progress-fill"
                          style={{
                            width:
                              `${progress}%`,
                          }}
                        />

                      </div>

                    </div>

                  )}


                  {/* BUTTONS */}

                  <div className="course-actions">

                    <button
                      className="view-course-btn"
                      type="button"
                      onClick={() =>
                        viewCourse(
                          course
                        )
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
                      type="button"
                      onClick={() =>
                        startCourse(
                          course
                        )
                      }
                    >

                      {isActive
                        ? 'Continue →'
                        : 'Start Learning →'}

                    </button>

                  </div>

                </div>

              )

            }
          )}

        </div>

      </section>


      {/* =================================================
          COURSE DETAILS MODAL
      ================================================= */}

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
              type="button"
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
              {hasAssessment
                ? 'PERSONALIZED COURSE'
                : 'COURSE DETAILS'}
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


            {/* DESCRIPTION */}

            <div className="modal-description">

              <h3>
                About this course
              </h3>

              <p>
                {selectedCourse.description}
              </p>

            </div>


            {/* WHY RECOMMENDED */}

            {hasAssessment && (

              <div className="modal-description">

                <h3>
                  Why this course?
                </h3>

                <p>

                  This course is recommended
                  because it is related to
                  the skills identified in
                  your skill assessment.

                </p>

              </div>

            )}


            {/* SKILLS */}

            <div className="modal-section">

              <h3>
                What you will learn
              </h3>


              <div className="modal-skills">

                {selectedCourse.skills.map(
                  (
                    skill,
                    index
                  ) => (

                    <span key={index}>
                      ✓ {skill}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* MODULES */}

            <div className="modal-section">

              <h3>
                Course Modules
              </h3>


              <div className="module-list">

                {selectedCourse.modules.map(
                  (
                    module,
                    index
                  ) => (

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


            {/* ACTIONS */}

            <div className="modal-actions">

              <button
                className="modal-secondary-btn"
                type="button"
                onClick={() =>
                  setSelectedCourse(null)
                }
              >
                Close
              </button>


              <button
                className="modal-primary-btn"
                type="button"
                onClick={() =>
                  startCourse(
                    selectedCourse
                  )
                }
              >

                {startedCourse?.id ===
                  selectedCourse.id

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