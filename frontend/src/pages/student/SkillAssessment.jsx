import { useState } from 'react'
import './SkillAssessment.css'

function SkillAssessment({ onComplete }) {

  const [currentSection, setCurrentSection] = useState(0)

  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem('skillAssessment')

      if (saved) {
        const parsed = JSON.parse(saved)

        if (parsed && typeof parsed === 'object') {
          return {
            programming: parsed.programming || '',
            python: parsed.python || '',
            javascript: parsed.javascript || '',
            database: parsed.database || '',
            machineLearning: parsed.machineLearning || '',
            communication: parsed.communication || '',
            teamwork: parsed.teamwork || '',
            problemSolving: parsed.problemSolving || '',
            leadership: parsed.leadership || '',
          }
        }
      }
    } catch (error) {
      console.error('Failed to load skill assessment:', error)
    }

    return {
      programming: '',
      python: '',
      javascript: '',
      database: '',
      machineLearning: '',
      communication: '',
      teamwork: '',
      problemSolving: '',
      leadership: '',
    }
  })


  /* =========================
     ASSESSMENT SECTIONS
  ========================= */

  const sections = [
    {
      title: 'Technical Skills',
      subtitle:
        'Tell us about your current technical skill level.',

      questions: [
        {
          key: 'programming',
          question:
            'How would you rate your Programming skills?',
        },
        {
          key: 'python',
          question:
            'How would you rate your Python skills?',
        },
        {
          key: 'javascript',
          question:
            'How would you rate your JavaScript skills?',
        },
        {
          key: 'database',
          question:
            'How would you rate your Database / SQL skills?',
        },
        {
          key: 'machineLearning',
          question:
            'How would you rate your Machine Learning skills?',
        },
      ],
    },

    {
      title: 'Soft Skills',
      subtitle:
        'Help us understand your professional and interpersonal skills.',

      questions: [
        {
          key: 'communication',
          question:
            'How would you rate your Communication skills?',
        },
        {
          key: 'teamwork',
          question:
            'How would you rate your Teamwork skills?',
        },
        {
          key: 'problemSolving',
          question:
            'How would you rate your Problem Solving skills?',
        },
        {
          key: 'leadership',
          question:
            'How would you rate your Leadership skills?',
        },
      ],
    },
  ]


  const current = sections[currentSection]


  /* =========================
     RATING LEVELS
  ========================= */

  const ratingLevels = [
    ['Beginner', 'I am just starting'],
    ['Basic', 'I know the fundamentals'],
    ['Intermediate', 'I can work independently'],
    ['Advanced', 'I have strong practical skills'],
    ['Expert', 'I can mentor others'],
  ]


  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (key, value) => {

    setAnswers((previous) => ({
      ...previous,
      [key]: value,
    }))

  }


  /* =========================
     NEXT SECTION
  ========================= */

  const handleNext = () => {

    if (
      currentSection <
      sections.length - 1
    ) {

      setCurrentSection(
        currentSection + 1
      )

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

    }

  }


  /* =========================
     PREVIOUS SECTION
  ========================= */

  const handlePrevious = () => {

    if (currentSection > 0) {

      setCurrentSection(
        currentSection - 1
      )

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

    }

  }


  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = () => {

    const unanswered =
      Object.values(answers).filter(
        (answer) => answer === ''
      ).length


    if (unanswered > 0) {

      alert(
        `Please answer all ${unanswered} remaining question(s).`
      )

      return

    }


    /* =========================
       SAVE LATEST ASSESSMENT
    ========================= */

    try {

      localStorage.setItem(
        'skillAssessment',
        JSON.stringify(answers)
      )

    } catch (error) {

      console.error(
        'Failed to save skill assessment:',
        error
      )

      alert(
        'Unable to save your assessment. Please try again.'
      )

      return

    }


    /* =========================
       NOTIFY OTHER COMPONENTS
    ========================= */

    window.dispatchEvent(
      new Event('skillAssessmentUpdated')
    )


    /* =========================
       SEND DATA TO APP
    ========================= */

    if (onComplete) {

      onComplete(answers)

    }


    /* =========================
       SUCCESS MESSAGE
    ========================= */

    alert(
      'Skill Assessment submitted successfully! Your skill profile has been updated.'
    )

  }


  /* =========================
     PROGRESS
  ========================= */

  const totalQuestions =
    sections.reduce(
      (total, section) =>
        total + section.questions.length,
      0
    )


  const answeredQuestions =
    Object.values(answers).filter(
      (answer) => answer !== ''
    ).length


  const progress =
    Math.round(
      (answeredQuestions /
        totalQuestions) *
        100
    )


  return (

    <div className="assessment-page">

      <div className="assessment-container">


        {/* =========================
            HEADER
        ========================= */}

        <div className="assessment-header">

          <div>

            <p className="assessment-tag">
              SKILL DEVELOPMENT
            </p>

            <h1>
              Skill Assessment
            </h1>

            <p className="assessment-description">
              Evaluate your skills and discover
              opportunities that match your
              career goals.
            </p>

          </div>


          <div className="progress-box">

            <div className="progress-number">
              {progress}%
            </div>

            <span>
              Completed
            </span>

          </div>

        </div>


        {/* =========================
            PROGRESS BAR
        ========================= */}

        <div className="progress-section">

          <div className="progress-info">

            <span>
              Section {currentSection + 1} of {sections.length}
            </span>

            <span>
              {answeredQuestions}/{totalQuestions} answered
            </span>

          </div>


          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>


        {/* =========================
            SECTION TABS
        ========================= */}

        <div className="section-tabs">

          {sections.map(
            (section, index) => (

              <button
                key={section.title}
                type="button"
                className={`section-tab ${
                  currentSection === index
                    ? 'active'
                    : ''
                }`}
                onClick={() =>
                  setCurrentSection(index)
                }
              >

                <span className="tab-number">
                  {index + 1}
                </span>

                <span>
                  {section.title}
                </span>

              </button>

            )
          )}

        </div>


        {/* =========================
            ASSESSMENT CARD
        ========================= */}

        <div className="assessment-card">


          <div className="card-heading">

            <div>

              <h2>
                {current.title}
              </h2>

              <p>
                {current.subtitle}
              </p>

            </div>


            <div className="card-icon">

              {currentSection === 0
                ? '💻'
                : '🤝'}

            </div>

          </div>


          {/* =========================
              QUESTIONS
          ========================= */}

          <div className="questions">

            {current.questions.map(
              (item, index) => (

                <div
                  className="question"
                  key={item.key}
                >

                  <div className="question-top">

                    <span className="question-number">
                      {index + 1}
                    </span>

                    <h3>
                      {item.question}
                    </h3>

                  </div>


                  <div className="rating-options">

                    {ratingLevels.map(
                      ([level, description]) => (

                        <label
                          className={`rating-option ${
                            answers[item.key] ===
                            level
                              ? 'selected'
                              : ''
                          }`}
                          key={level}
                        >

                          <input
                            type="radio"
                            name={item.key}
                            value={level}
                            checked={
                              answers[item.key] ===
                              level
                            }
                            onChange={(event) =>
                              handleChange(
                                item.key,
                                event.target.value
                              )
                            }
                          />


                          <span className="radio-circle" />


                          <span className="rating-content">

                            <strong>
                              {level}
                            </strong>

                            <small>
                              {description}
                            </small>

                          </span>

                        </label>

                      )
                    )}

                  </div>

                </div>

              )
            )}

          </div>


          {/* =========================
              ACTION BUTTONS
          ========================= */}

          <div className="assessment-actions">

            <button
              type="button"
              className="previous-btn"
              onClick={handlePrevious}
              disabled={currentSection === 0}
            >
              ← Previous
            </button>


            {currentSection <
            sections.length - 1 ? (

              <button
                type="button"
                className="next-btn"
                onClick={handleNext}
              >
                Next Section →
              </button>

            ) : (

              <button
                type="button"
                className="submit-btn"
                onClick={handleSubmit}
              >
                Submit Assessment ✓
              </button>

            )}

          </div>

        </div>


        {/* =========================
            INFORMATION CARD
        ========================= */}

        <div className="assessment-info">

          <div className="info-icon">
            💡
          </div>


          <div>

            <h3>
              Why complete your skill assessment?
            </h3>

            <p>
              Your responses help the platform
              identify your strengths and skill
              gaps. Based on your profile, you can
              receive relevant internship, project,
              job and learning recommendations.
            </p>

          </div>

        </div>


      </div>

    </div>

  )

}


export default SkillAssessment