import { useState } from 'react'
import './CareerGuidance.css'

function CareerGuidance({ onStartLearning }) {
  const [selectedCareer, setSelectedCareer] = useState(null)

  const careerRoles = [
    {
      id: 1,
      title: 'Machine Learning Engineer',
      icon: '🤖',
      match: 92,
      salary: '₹6 - 12 LPA',
      description:
        'Build and deploy machine learning models to solve real-world problems.',

      requiredSkills: [
        { name: 'Python', status: 'matched' },
        { name: 'Machine Learning', status: 'matched' },
        { name: 'Statistics', status: 'missing' },
        { name: 'SQL', status: 'matched' },
        { name: 'Deep Learning', status: 'missing' },
      ],

      improveSkills: ['Statistics', 'Deep Learning'],

      roadmap: [
        'Master Python for machine learning',
        'Learn statistics and probability',
        'Improve SQL and data handling',
        'Learn machine learning algorithms',
        'Study deep learning',
        'Build end-to-end ML projects',
      ],

      jobRoles: [
        'ML Engineer',
        'AI Engineer',
        'Data Scientist',
      ],
    },

    {
      id: 2,
      title: 'Data Scientist',
      icon: '📊',
      match: 87,
      salary: '₹7 - 14 LPA',
      description:
        'Analyze complex datasets and generate meaningful insights using data science techniques.',

      requiredSkills: [
        { name: 'Python', status: 'matched' },
        { name: 'Statistics', status: 'missing' },
        { name: 'Machine Learning', status: 'matched' },
        { name: 'SQL', status: 'matched' },
        { name: 'Data Visualization', status: 'missing' },
      ],

      improveSkills: ['Statistics', 'Data Visualization'],

      roadmap: [
        'Master Python for data analysis',
        'Learn statistics and probability',
        'Improve SQL and database skills',
        'Learn data visualization',
        'Study machine learning',
        'Build end-to-end data science projects',
      ],

      jobRoles: [
        'Data Scientist',
        'Data Analyst',
        'Business Analyst',
        'ML Analyst',
      ],
    },

    {
      id: 3,
      title: 'AI Engineer',
      icon: '🧠',
      match: 82,
      salary: '₹7 - 15 LPA',
      description:
        'Develop intelligent applications using artificial intelligence and deep learning.',

      requiredSkills: [
        { name: 'Python', status: 'matched' },
        { name: 'Artificial Intelligence', status: 'matched' },
        { name: 'Deep Learning', status: 'missing' },
        { name: 'NLP', status: 'missing' },
        { name: 'Machine Learning', status: 'matched' },
      ],

      improveSkills: ['Deep Learning', 'NLP'],

      roadmap: [
        'Strengthen Python programming',
        'Learn machine learning fundamentals',
        'Study deep learning',
        'Learn NLP and generative AI',
        'Build AI applications',
        'Deploy AI models',
      ],

      jobRoles: [
        'AI Engineer',
        'ML Engineer',
        'NLP Engineer',
        'AI Developer',
      ],
    },
  ]

  const handleStartLearning = () => {
    if (!selectedCareer) return

    // Save selected career
    localStorage.setItem(
      'selectedCareer',
      JSON.stringify(selectedCareer)
    )

    localStorage.setItem(
      'learningStarted',
      'true'
    )

    localStorage.setItem(
      'learningStartedAt',
      new Date().toISOString()
    )

    // Close modal
    setSelectedCareer(null)

    // Go to Learning page
    if (onStartLearning) {
      onStartLearning(selectedCareer)
    }
  }

  return (
    <div className="career-guidance-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="career-page-header">

        <div>
          <p className="career-page-tag">
            AI CAREER GUIDANCE
          </p>

          <h1>
            Career Guidance
          </h1>

          <p className="career-page-description">
            Discover career paths that match your skills,
            interests and industry requirements.
          </p>
        </div>

        <div className="career-ai-badge">
          🤖 AI Powered
        </div>

      </div>


      {/* =========================
          READINESS CARD
      ========================= */}

      <section className="career-readiness-card">

        <div className="readiness-content">

          <p className="readiness-label">
            CAREER READINESS
          </p>

          <h2>
            Your Career Readiness Score
          </h2>

          <p>
            Based on your current skills,
            assessment performance and industry requirements.
          </p>

        </div>

        <div className="readiness-score">

          <strong>
            78%
          </strong>

          <span>
            Ready
          </span>

        </div>

      </section>


      {/* =========================
          CAREER RECOMMENDATION
      ========================= */}

      <section className="career-recommendation-section">

        <div className="career-section-heading">

          <div>
            <p className="career-section-tag">
              AI RECOMMENDATION
            </p>

            <h2>
              Recommended Career Roles
            </h2>

            <p>
              Career paths ranked according to your current profile.
            </p>
          </div>

          <span className="career-match-badge">
            🤖 AI Matched
          </span>

        </div>


        {/* =========================
            CAREER CARDS
        ========================= */}

        <div className="career-card-grid">

          {careerRoles.map((career) => (

            <div
              className="career-role-card"
              key={career.id}
            >

              {/* TOP */}

              <div className="career-card-top">

                <div className="career-role-icon">
                  {career.icon}
                </div>

                <div className="career-match">

                  <strong>
                    {career.match}%
                  </strong>

                  <span>
                    Match
                  </span>

                </div>

              </div>


              {/* TITLE */}

              <h3>
                {career.title}
              </h3>


              {/* DESCRIPTION */}

              <p className="career-role-description">
                {career.description}
              </p>


              {/* SKILLS */}

              <div className="career-skills-section">

                <h4>
                  Required Skills
                </h4>

                <div className="career-skills">

                  {career.requiredSkills.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className={
                          skill.status === 'matched'
                            ? 'skill-chip matched'
                            : 'skill-chip missing'
                        }
                      >

                        {skill.status === 'matched'
                          ? '✓'
                          : '△'
                        }

                        {' '}

                        {skill.name}

                      </span>

                    )
                  )}

                </div>

              </div>


              {/* IMPROVE */}

              <div className="career-improve-box">

                <h4>
                  Skills to Improve
                </h4>

                <p>
                  {career.improveSkills.join(' • ')}
                </p>

              </div>


              {/* BUTTON */}

              <button
                className="career-view-btn"
                type="button"
                onClick={() =>
                  setSelectedCareer(career)
                }
              >
                View Career Path →
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* =========================
          LEARNING PATH PREVIEW
      ========================= */}

      <section className="career-learning-preview">

        <div className="career-preview-heading">

          <div>
            <p className="career-section-tag">
              PERSONALIZED LEARNING PATH
            </p>

            <h2>
              Build Your Career Step by Step
            </h2>

            <p>
              Follow a recommended learning path to close
              your skill gaps and become industry ready.
            </p>
          </div>

        </div>


        <div className="career-preview-card">

          <div className="preview-step">
            <span>01</span>

            <div>
              <h3>
                Identify Your Skill Gaps
              </h3>

              <p>
                Understand which skills you need to improve
                for your target career.
              </p>
            </div>
          </div>


          <div className="preview-step">
            <span>02</span>

            <div>
              <h3>
                Follow Recommended Courses
              </h3>

              <p>
                Learn the skills recommended by your
                personalized career roadmap.
              </p>
            </div>
          </div>


          <div className="preview-step">
            <span>03</span>

            <div>
              <h3>
                Build Real Projects
              </h3>

              <p>
                Apply your knowledge through practical
                industry-oriented projects.
              </p>
            </div>
          </div>


          <div className="preview-step">
            <span>04</span>

            <div>
              <h3>
                Become Industry Ready
              </h3>

              <p>
                Improve your career readiness and prepare
                for internships and jobs.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* =========================
          CAREER MODAL
      ========================= */}

      {selectedCareer && (

        <div
          className="career-modal-overlay"
          onClick={() => setSelectedCareer(null)}
        >

          <div
            className="career-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* CLOSE */}

            <button
              className="career-modal-close"
              type="button"
              onClick={() => setSelectedCareer(null)}
            >
              ×
            </button>


            {/* MODAL HEADER */}

            <div className="career-modal-header">

              <div className="career-modal-icon">
                {selectedCareer.icon}
              </div>

              <div>

                <p>
                  RECOMMENDED CAREER
                </p>

                <h2>
                  {selectedCareer.title}
                </h2>

                <span>
                  {selectedCareer.match}% Career Match
                </span>

              </div>

            </div>


            {/* SALARY */}

            <div className="career-modal-stats">

              <div>
                <span>
                  Career Match
                </span>

                <strong>
                  {selectedCareer.match}%
                </strong>
              </div>

              <div>
                <span>
                  Expected Salary
                </span>

                <strong>
                  {selectedCareer.salary}
                </strong>
              </div>

            </div>


            {/* ABOUT */}

            <div className="career-modal-section">

              <h3>
                About This Career
              </h3>

              <p>
                {selectedCareer.description}
              </p>

            </div>


            {/* REQUIRED SKILLS */}

            <div className="career-modal-section">

              <h3>
                Required Skills
              </h3>

              <div className="career-skills">

                {selectedCareer.requiredSkills.map(
                  (skill, index) => (

                    <span
                      key={index}
                      className={
                        skill.status === 'matched'
                          ? 'skill-chip matched'
                          : 'skill-chip missing'
                      }
                    >
                      {skill.status === 'matched'
                        ? '✓'
                        : '△'
                      }{' '}
                      {skill.name}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* IMPROVE */}

            <div className="career-modal-section">

              <h3>
                Skills You Should Improve
              </h3>

              <div className="improve-chips">

                {selectedCareer.improveSkills.map(
                  (skill, index) => (

                    <span key={index}>
                      {skill}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* ROADMAP */}

            <div className="career-modal-section">

              <h3>
                Career Roadmap
              </h3>

              <div className="career-roadmap">

                {selectedCareer.roadmap.map(
                  (step, index) => (

                    <div
                      className="roadmap-item"
                      key={index}
                    >

                      <span>
                        {index + 1}
                      </span>

                      <p>
                        {step}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* JOB ROLES */}

            <div className="career-modal-section">

              <h3>
                Possible Job Roles
              </h3>

              <div className="job-role-chips">

                {selectedCareer.jobRoles.map(
                  (role, index) => (

                    <span key={index}>
                      {role}
                    </span>

                  )
                )}

              </div>

            </div>


            {/* ACTIONS */}

            <div className="career-modal-actions">

              <button
                className="career-close-btn"
                type="button"
                onClick={() => setSelectedCareer(null)}
              >
                Close
              </button>

              <button
                className="career-start-btn"
                type="button"
                onClick={handleStartLearning}
              >
                Start Learning →
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default CareerGuidance