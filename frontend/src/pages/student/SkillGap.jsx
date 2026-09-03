import { useEffect, useMemo, useState } from 'react'
import './SkillGap.css'

function SkillGap() {

  const [activeFilter, setActiveFilter] = useState('All')

  /* =====================================================
     ASSESSMENT DATA
  ===================================================== */

  const [assessment, setAssessment] = useState(() => {

    try {

      const saved =
        localStorage.getItem('skillAssessment')

      return saved
        ? JSON.parse(saved)
        : {}

    } catch (error) {

      console.error(
        'Failed to load skill assessment:',
        error
      )

      return {}

    }

  })


  /* =====================================================
     LOAD LATEST ASSESSMENT
  ===================================================== */

  const loadAssessment = () => {

    try {

      const saved =
        localStorage.getItem('skillAssessment')

      if (!saved) {

        setAssessment({})

        return

      }

      const parsed =
        JSON.parse(saved)

      setAssessment(
        parsed &&
        typeof parsed === 'object'
          ? parsed
          : {}
      )

    } catch (error) {

      console.error(
        'Failed to load skill assessment:',
        error
      )

      setAssessment({})

    }

  }


  /* =====================================================
     LISTEN FOR ASSESSMENT UPDATE
  ===================================================== */

  useEffect(() => {

    loadAssessment()

    window.addEventListener(
      'skillAssessmentUpdated',
      loadAssessment
    )

    window.addEventListener(
      'storage',
      loadAssessment
    )

    window.addEventListener(
      'focus',
      loadAssessment
    )

    return () => {

      window.removeEventListener(
        'skillAssessmentUpdated',
        loadAssessment
      )

      window.removeEventListener(
        'storage',
        loadAssessment
      )

      window.removeEventListener(
        'focus',
        loadAssessment
      )

    }

  }, [])


  /* =====================================================
     CONVERT ASSESSMENT LEVEL TO PERCENTAGE
  ===================================================== */

  const getSkillPercentage = (level) => {

    const percentages = {

      Beginner: 20,

      Basic: 40,

      Intermediate: 60,

      Advanced: 80,

      Expert: 100,

    }

    return percentages[level] || 0

  }


  /* =====================================================
     SKILL DATA
  ===================================================== */

  const skills = useMemo(() => {

    return [

      {
        id: 1,

        name: 'Python',

        assessmentKey: 'python',

        category: 'Technical',

        current:
          getSkillPercentage(
            assessment.python
          ),

        required: 75,

        severity: 'High',

        icon: '🐍',

        color: 'red',

        learning: [
          'Python Advanced Course',
          'Build a Python Project',
          'Python Certification',
        ],
      },


      {
        id: 2,

        name: 'Machine Learning',

        assessmentKey: 'machineLearning',

        category: 'Technical',

        current:
          getSkillPercentage(
            assessment.machineLearning
          ),

        required: 80,

        severity: 'High',

        icon: '🤖',

        color: 'red',

        learning: [
          'Machine Learning Fundamentals',
          'ML Model Building Project',
          'ML Certification',
        ],
      },


      {
        id: 3,

        name: 'JavaScript',

        assessmentKey: 'javascript',

        category: 'Technical',

        current:
          getSkillPercentage(
            assessment.javascript
          ),

        required: 70,

        severity: 'High',

        icon: '💻',

        color: 'red',

        learning: [
          'JavaScript Fundamentals',
          'React Development Project',
          'Frontend Certification',
        ],
      },


      {
        id: 4,

        name: 'SQL',

        assessmentKey: 'database',

        category: 'Technical',

        current:
          getSkillPercentage(
            assessment.database
          ),

        required: 65,

        severity: 'Medium',

        icon: '🗄️',

        color: 'orange',

        learning: [
          'SQL for Data Analysis',
          'Database Project',
          'SQL Practice Assessment',
        ],
      },


      {
        id: 5,

        name: 'Teamwork',

        assessmentKey: 'teamwork',

        category: 'Soft Skill',

        current:
          getSkillPercentage(
            assessment.teamwork
          ),

        required: 75,

        severity: 'Medium',

        icon: '🤝',

        color: 'orange',

        learning: [
          'Team Collaboration Workshop',
          'Group Project',
          'Communication Practice',
        ],
      },


      {
        id: 6,

        name: 'Leadership',

        assessmentKey: 'leadership',

        category: 'Soft Skill',

        current:
          getSkillPercentage(
            assessment.leadership
          ),

        required: 70,

        severity: 'Medium',

        icon: '⭐',

        color: 'orange',

        learning: [
          'Leadership Workshop',
          'Team Leadership Activity',
          'Leadership Training',
        ],
      },

    ]

  }, [assessment])


  /* =====================================================
     FILTER
  ===================================================== */

  const filteredSkills = useMemo(() => {

    if (activeFilter === 'All') {

      return skills

    }


    if (activeFilter === 'High') {

      return skills.filter(
        (skill) =>
          skill.severity === 'High'
      )

    }


    if (activeFilter === 'Medium') {

      return skills.filter(
        (skill) =>
          skill.severity === 'Medium'
      )

    }


    if (activeFilter === 'Technical') {

      return skills.filter(
        (skill) =>
          skill.category === 'Technical'
      )

    }


    return skills.filter(
      (skill) =>
        skill.category === 'Soft Skill'
    )

  }, [activeFilter, skills])


  /* =====================================================
     GAP CALCULATIONS
  ===================================================== */

  const totalGap = skills.reduce(
    (total, skill) =>
      total +
      Math.max(
        skill.required -
        skill.current,
        0
      ),
    0
  )


  const averageGap =
    skills.length > 0
      ? Math.round(
          totalGap / skills.length
        )
      : 0


  const highGaps =
    skills.filter(
      (skill) =>
        skill.required >
        skill.current &&
        skill.severity === 'High'
    ).length


  const mediumGaps =
    skills.filter(
      (skill) =>
        skill.required >
        skill.current &&
        skill.severity === 'Medium'
    ).length


  const getGapWidth = (skill) => {

    return Math.min(
      Math.max(
        skill.required -
        skill.current,
        0
      ),
      100
    )

  }


  /* =====================================================
     TOP SKILL GAPS
  ===================================================== */

  const biggestGaps = [...skills]
    .sort(
      (a, b) =>
        (b.required - b.current) -
        (a.required - a.current)
    )
    .filter(
      (skill) =>
        skill.required >
        skill.current
    )
    .slice(0, 3)


  const biggestGapText =
    biggestGaps.length > 0
      ? biggestGaps
          .map(
            (skill) =>
              skill.name
          )
          .join(', ')
      : 'No major skill gaps'


  return (

    <div className="skill-gap-page">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="skill-gap-header">

        <div>

          <p className="skill-gap-tag">
            SKILL DEVELOPMENT
          </p>

          <h1>
            Skill Gap Analysis
          </h1>

          <p className="skill-gap-subtitle">
            Identify the skills you need to improve
            for your target career.
          </p>

        </div>


        <div className="ai-badge">

          <span>
            🤖
          </span>

          <div>

            <strong>
              AI Powered
            </strong>

            <small>
              Skill Analysis
            </small>

          </div>

        </div>

      </div>


      {/* =================================================
          OVERVIEW CARDS
      ================================================= */}

      <div className="gap-summary-grid">


        <div className="gap-summary-card">

          <div className="summary-icon purple">
            🎯
          </div>

          <div>

            <span>
              Skills Analyzed
            </span>

            <strong>
              {skills.length}
            </strong>

            <small>
              Based on your assessment
            </small>

          </div>

        </div>


        <div className="gap-summary-card">

          <div className="summary-icon red">
            ⚠️
          </div>

          <div>

            <span>
              High Priority Gaps
            </span>

            <strong>
              {highGaps}
            </strong>

            <small>
              Needs immediate improvement
            </small>

          </div>

        </div>


        <div className="gap-summary-card">

          <div className="summary-icon orange">
            📊
          </div>

          <div>

            <span>
              Average Skill Gap
            </span>

            <strong>
              {averageGap}%
            </strong>

            <small>
              Across identified skills
            </small>

          </div>

        </div>


        <div className="gap-summary-card">

          <div className="summary-icon green">
            🚀
          </div>

          <div>

            <span>
              Learning Areas
            </span>

            <strong>
              {
                skills.filter(
                  (skill) =>
                    skill.required >
                    skill.current
                ).length
              }
            </strong>

            <small>
              Recommended for you
            </small>

          </div>

        </div>

      </div>


      {/* =================================================
          AI INSIGHT
      ================================================= */}

      <div className="ai-insight">

        <div className="ai-insight-icon">
          🤖
        </div>

        <div className="ai-insight-content">

          <div className="ai-insight-title">

            <strong>
              AI Skill Gap Insight
            </strong>

            <span>
              Personalized
            </span>

          </div>

          <p>

            {biggestGaps.length > 0 ? (

              <>
                Your biggest improvement opportunities are
                <strong>
                  {' '}
                  {biggestGapText}
                </strong>.
                Strengthening these skills can significantly
                improve your readiness for your target
                career roles.
              </>

            ) : (

              <>
                Great work! Your current skill levels
                meet or exceed the selected industry
                requirements.
              </>

            )}

          </p>

        </div>

      </div>


      {/* =================================================
          FILTER
      ================================================= */}

      <div className="gap-section-header">

        <div>

          <p className="section-tag">
            IDENTIFIED GAPS
          </p>

          <h2>
            Skills to Improve
          </h2>

          <p>
            Compare your current proficiency with
            industry requirements.
          </p>

        </div>


        <div className="gap-filters">

          {[
            'All',
            'High',
            'Medium',
            'Technical',
            'Soft Skill',
          ].map(
            (filter) => (

              <button
                key={filter}
                type="button"
                className={
                  activeFilter === filter
                    ? 'active'
                    : ''
                }
                onClick={() =>
                  setActiveFilter(filter)
                }
              >
                {filter}
              </button>

            )
          )}

        </div>

      </div>


      {/* =================================================
          SKILL GAP LIST
      ================================================= */}

      <div className="skill-gap-list">

        {filteredSkills.map(
          (skill) => {

            const gap =
              Math.max(
                skill.required -
                skill.current,
                0
              )


            const gapWidth =
              getGapWidth(skill)


            return (

              <div
                className="skill-gap-card"
                key={skill.id}
              >


                {/* CARD TOP */}

                <div className="skill-gap-card-top">

                  <div className="skill-info">

                    <div
                      className={`skill-icon ${skill.color}`}
                    >
                      {skill.icon}
                    </div>

                    <div>

                      <h3>
                        {skill.name}
                      </h3>

                      <span>
                        {skill.category}
                      </span>

                    </div>

                  </div>


                  <div
                    className={`severity ${skill.color}`}
                  >

                    {gap > 0
                      ? skill.severity === 'High'
                        ? '● High Priority'
                        : '● Medium Priority'
                      : '✓ Skill Target Met'}

                  </div>

                </div>


                {/* SCORE ROW */}

                <div className="skill-score-row">

                  <div className="score-box current">

                    <span>
                      Your Current
                    </span>

                    <strong>
                      {skill.current}%
                    </strong>

                  </div>


                  <div className="gap-arrow">
                    →
                  </div>


                  <div className="score-box required">

                    <span>
                      Industry Required
                    </span>

                    <strong>
                      {skill.required}%
                    </strong>

                  </div>


                  <div className="gap-result">

                    <span>
                      Skill Gap
                    </span>

                    <strong>
                      {gap}%
                    </strong>

                  </div>

                </div>


                {/* =================================================
                    PROGRESS
                ================================================= */}

                <div className="comparison-section">

                  <div className="comparison-labels">

                    <span>
                      Current proficiency
                    </span>

                    <span>
                      Required proficiency
                    </span>

                  </div>


                  <div className="progress-wrapper">

                    <div className="current-progress">

                      <div
                        style={{
                          width:
                            `${skill.current}%`,
                        }}
                      />

                    </div>


                    <div
                      className="required-marker"
                      style={{
                        left:
                          `${skill.required}%`,
                      }}
                    />

                  </div>


                  <div className="progress-numbers">

                    <span>
                      {skill.current}%
                    </span>

                    <span>
                      Target {skill.required}%
                    </span>

                  </div>

                </div>


                {/* =================================================
                    GAP VISUAL
                ================================================= */}

                <div className="gap-visual">

                  <div className="gap-visual-header">

                    <span>
                      Improvement needed
                    </span>

                    <strong>
                      {gap}%
                    </strong>

                  </div>


                  <div className="gap-track">

                    <div
                      className={`gap-fill ${skill.color}`}
                      style={{
                        width:
                          `${gapWidth}%`,
                      }}
                    />

                  </div>

                </div>


                {/* =================================================
                    LEARNING
                ================================================= */}

                <div className="learning-section">

                  <div className="learning-header">

                    <div>

                      <span className="learning-tag">
                        RECOMMENDED LEARNING
                      </span>

                      <h4>
                        Close this skill gap
                      </h4>

                    </div>


                    <span className="ai-mini">
                      🤖 AI Recommended
                    </span>

                  </div>


                  <div className="learning-items">

                    {skill.learning.map(
                      (item, index) => (

                        <div
                          className="learning-item"
                          key={index}
                        >

                          <span className="learning-number">
                            {index + 1}
                          </span>

                          <span>
                            {item}
                          </span>

                          <span className="learning-arrow">
                            →
                          </span>

                        </div>

                      )
                    )}

                  </div>

                </div>

              </div>

            )

          }
        )}

      </div>


      {/* =================================================
          LEARNING PATH
      ================================================= */}

      <div className="learning-path-card">

        <div className="learning-path-left">

          <div className="path-icon">
            🚀
          </div>

          <div>

            <p className="section-tag">
              YOUR NEXT STEP
            </p>

            <h2>
              Follow a Personalized Learning Path
            </h2>

            <p>
              Start with your highest-priority skill
              gaps and gradually build the skills
              required for your target career.
            </p>

          </div>

        </div>


        <button
          type="button"
          className="learning-path-btn"
        >

          View Learning Recommendations

          <span>
            →
          </span>

        </button>

      </div>


      {/* =================================================
          EMPTY
      ================================================= */}

      {filteredSkills.length === 0 && (

        <div className="no-gaps">

          <div>
            🔍
          </div>

          <h3>
            No skill gaps found
          </h3>

          <p>
            Try selecting another filter.
          </p>

        </div>

      )}

    </div>

  )

}

export default SkillGap