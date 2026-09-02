import './SkillProfile.css'

function SkillProfile({
  answers,
  onExplore,
  onViewProjects,
  onNavigate,
}) {
  const levels = {
    Beginner: 20,
    Basic: 40,
    Intermediate: 60,
    Advanced: 80,
    Expert: 100,
  }

  const skillData = answers || {}

  const getScore = (skill) => {
    return levels[skillData[skill]] || 0
  }

  /* =========================
     SKILLS
  ========================= */

  const technicalSkills = [
    {
      key: 'programming',
      name: 'Programming',
    },
    {
      key: 'python',
      name: 'Python',
    },
    {
      key: 'javascript',
      name: 'JavaScript',
    },
    {
      key: 'database',
      name: 'Database / SQL',
    },
    {
      key: 'machineLearning',
      name: 'Machine Learning',
    },
  ]

  const softSkills = [
    {
      key: 'communication',
      name: 'Communication',
    },
    {
      key: 'teamwork',
      name: 'Teamwork',
    },
    {
      key: 'problemSolving',
      name: 'Problem Solving',
    },
    {
      key: 'leadership',
      name: 'Leadership',
    },
  ]

  const allSkills = [
    ...technicalSkills,
    ...softSkills,
  ]

  /* =========================
     SCORE CALCULATION
  ========================= */

  const totalScore = allSkills.reduce(
    (total, skill) =>
      total + getScore(skill.key),
    0
  )

  const overallScore = answers
    ? Math.round(
        totalScore / allSkills.length
      )
    : 0

  const assessedSkills = allSkills.filter(
    (skill) =>
      getScore(skill.key) > 0
  ).length

  const strengths = allSkills
    .filter(
      (skill) =>
        getScore(skill.key) >= 80
    )
    .map(
      (skill) => skill.name
    )

  const skillGaps = allSkills
    .filter(
      (skill) =>
        getScore(skill.key) < 60
    )
    .map(
      (skill) => skill.name
    )

  /* =========================
     SCORE CLASS
  ========================= */

  const getScoreClass = (score) => {
    if (score >= 80) {
      return 'excellent'
    }

    if (score >= 60) {
      return 'good'
    }

    if (score >= 40) {
      return 'average'
    }

    return 'low'
  }

  /* =========================
     SCORE LABEL
  ========================= */

  const getScoreLabel = (score) => {
    if (score >= 80) {
      return 'Strong'
    }

    if (score >= 60) {
      return 'Good'
    }

    if (score >= 40) {
      return 'Needs Improvement'
    }

    return 'Beginner'
  }

  /* =========================
     NAVIGATION HELPERS
  ========================= */

  const navigateTo = (page) => {
    if (onNavigate) {
      onNavigate(page)
    }
  }

  return (
    <div className="skill-profile-page">

      <div className="skill-profile-container">

        {/* =========================
            HEADER
        ========================= */}

        <section className="skill-profile-header">

          <div>

            <p className="skill-profile-tag">
              SKILL DEVELOPMENT
            </p>

            <h1>
              My Skill Profile
            </h1>

            <p className="skill-profile-description">
              Your personalized skill profile based on your
              assessment results.
            </p>

          </div>


          <div className="overall-score-box">

            <div className="score-circle">
              <strong>
                {overallScore}%
              </strong>
            </div>

            <div>

              <span>
                Overall Skill Score
              </span>

              <small>
                {overallScore >= 80
                  ? 'Excellent'
                  : overallScore >= 60
                  ? 'Good Progress'
                  : 'Needs Improvement'}
              </small>

            </div>

          </div>

        </section>


        {/* =========================
            SUMMARY CARDS
        ========================= */}

        <section className="skill-summary-grid">

          {/* STRENGTHS */}

          <div className="skill-summary-card">

            <div className="summary-icon strength-icon">
              💪
            </div>

            <div>

              <span>
                Strengths
              </span>

              <h2>
                {strengths.length}
              </h2>

              <small>
                Strong skill areas
              </small>

            </div>

          </div>


          {/* SKILL GAPS */}

          <div className="skill-summary-card">

            <div className="summary-icon gap-icon">
              📋
            </div>

            <div>

              <span>
                Skill Gaps
              </span>

              <h2>
                {skillGaps.length}
              </h2>

              <small>
                Areas to improve
              </small>

            </div>

          </div>


          {/* ASSESSED */}

          <div className="skill-summary-card">

            <div className="summary-icon assessed-icon">
              🎯
            </div>

            <div>

              <span>
                Skills Assessed
              </span>

              <h2>
                {assessedSkills}
              </h2>

              <small>
                Out of {allSkills.length} skills
              </small>

            </div>

          </div>


          {/* CAREER READINESS */}

          <div className="skill-summary-card">

            <div className="summary-icon score-icon">
              ⭐
            </div>

            <div>

              <span>
                Career Readiness
              </span>

              <h2>
                {overallScore}%
              </h2>

              <small>
                Current readiness
              </small>

            </div>

          </div>

        </section>


        {/* =========================
            TECHNICAL SKILLS
        ========================= */}

        <section className="skill-section">

          <div className="skill-section-header">

            <div>

              <p className="skill-section-tag">
                TECHNICAL SKILLS
              </p>

              <h2>
                Technical Skill Assessment
              </h2>

              <p>
                Your current technical competency based
                on the assessment.
              </p>

            </div>

            <div className="skill-section-icon">
              💻
            </div>

          </div>


          <div className="skill-list">

            {technicalSkills.map(
              (skill) => {

                const score =
                  getScore(skill.key)

                return (

                  <div
                    className="skill-row"
                    key={skill.key}
                  >

                    <div className="skill-name">

                      <strong>
                        {skill.name}
                      </strong>

                      <span
                        className={`skill-level ${getScoreClass(
                          score
                        )}`}
                      >
                        {skillData[skill.key] ||
                          'Not assessed'}
                      </span>

                    </div>


                    <div className="skill-progress-area">

                      <div className="skill-progress-bar">

                        <div
                          className={`skill-progress-fill ${getScoreClass(
                            score
                          )}`}
                          style={{
                            width: `${score}%`,
                          }}
                        />

                      </div>


                      <div className="skill-score">

                        <strong>
                          {score}%
                        </strong>

                        <small>
                          {getScoreLabel(score)}
                        </small>

                      </div>

                    </div>

                  </div>

                )
              }
            )}

          </div>

        </section>


        {/* =========================
            SOFT SKILLS
        ========================= */}

        <section className="skill-section">

          <div className="skill-section-header">

            <div>

              <p className="skill-section-tag">
                SOFT SKILLS
              </p>

              <h2>
                Professional Skills
              </h2>

              <p>
                Your interpersonal and professional
                competencies.
              </p>

            </div>

            <div className="skill-section-icon">
              🤝
            </div>

          </div>


          <div className="skill-list">

            {softSkills.map(
              (skill) => {

                const score =
                  getScore(skill.key)

                return (

                  <div
                    className="skill-row"
                    key={skill.key}
                  >

                    <div className="skill-name">

                      <strong>
                        {skill.name}
                      </strong>

                      <span
                        className={`skill-level ${getScoreClass(
                          score
                        )}`}
                      >
                        {skillData[skill.key] ||
                          'Not assessed'}
                      </span>

                    </div>


                    <div className="skill-progress-area">

                      <div className="skill-progress-bar">

                        <div
                          className={`skill-progress-fill ${getScoreClass(
                            score
                          )}`}
                          style={{
                            width: `${score}%`,
                          }}
                        />

                      </div>


                      <div className="skill-score">

                        <strong>
                          {score}%
                        </strong>

                        <small>
                          {getScoreLabel(score)}
                        </small>

                      </div>

                    </div>

                  </div>

                )
              }
            )}

          </div>

        </section>


        {/* =========================
            STRENGTHS & GAPS
        ========================= */}

        <section className="strength-gap-grid">

          {/* STRENGTHS */}

          <div className="strength-card">

            <div className="insight-header">

              <div className="insight-icon strength-icon">
                💪
              </div>

              <div>

                <p>
                  YOUR STRENGTHS
                </p>

                <h3>
                  Strong Skill Areas
                </h3>

              </div>

            </div>


            {strengths.length > 0 ? (

              <div className="skill-tags">

                {strengths.map(
                  (skill) => (

                    <span
                      className="strength-tag"
                      key={skill}
                    >
                      ✓ {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="empty-message">
                Complete your assessment to
                identify your strengths.
              </p>

            )}

          </div>


          {/* SKILL GAPS */}

          <div className="gap-card">

            <div className="insight-header">

              <div className="insight-icon gap-icon">
                📋
              </div>

              <div>

                <p>
                  SKILL GAPS
                </p>

                <h3>
                  Areas to Improve
                </h3>

              </div>

            </div>


            {skillGaps.length > 0 ? (

              <div className="skill-tags">

                {skillGaps.map(
                  (skill) => (

                    <span
                      className="gap-tag"
                      key={skill}
                    >
                      ! {skill}
                    </span>

                  )
                )}

              </div>

            ) : (

              <p className="empty-message">
                No major skill gaps identified.
              </p>

            )}

          </div>

        </section>


        {/* =========================
            RECOMMENDATION
        ========================= */}

        <section className="recommendation-card">

          <div className="recommendation-icon">
            🎯
          </div>


          <div className="recommendation-content">

            <p className="skill-section-tag">
              PERSONALIZED RECOMMENDATION
            </p>

            <h2>
              Recommended Skill Development
            </h2>

            <p>
              Based on your assessment, focus on
              improving your skill gaps before applying
              for relevant internships, projects and
              placement opportunities.
            </p>


            {/* RECOMMENDATION LIST */}

            {skillGaps.length > 0 && (

              <div className="recommendation-list">

                {skillGaps.map(
                  (skill) => (

                    <div
                      key={skill}
                      className="recommendation-item"
                    >

                      <span>
                        →
                      </span>

                      <strong>
                        Improve {skill}
                      </strong>

                    </div>

                  )
                )}

              </div>

            )}


            {/* ACTION BUTTONS */}

            <div className="recommendation-actions">

              {/* INTERNSHIPS */}

              <button
                className="primary-action-btn"
                onClick={() =>
                  navigateTo('internships')
                }
              >
                Explore Opportunities →
              </button>


              {/* PROJECTS */}

              <button
                className="secondary-action-btn"
                onClick={() =>
                  navigateTo('projects')
                }
              >
                View Projects
              </button>

            </div>

          </div>

        </section>


        {/* =========================
            BOTTOM ACTIONS
        ========================= */}

        <div className="profile-bottom-actions">

          <button
            className="back-dashboard-btn"
            onClick={() =>
              navigateTo('dashboard')
            }
          >
            ← Back to Dashboard
          </button>


          <button
            className="retake-btn"
            onClick={() =>
              navigateTo('skill-assessment')
            }
          >
            Retake Assessment
          </button>

        </div>

      </div>

    </div>
  )
}

export default SkillProfile