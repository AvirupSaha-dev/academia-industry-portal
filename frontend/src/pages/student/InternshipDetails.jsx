import { useState } from 'react'
import './InternshipDetails.css'

function InternshipDetails({ internship, onBack, onApply }) {
  const [applied, setApplied] = useState(false)

  if (!internship) {
    return (
      <div className="internship-details-page">
        <button className="back-btn" onClick={onBack}>
          ← Back to Internships
        </button>

        <div className="details-empty">
          <h2>Internship not found</h2>
          <p>Please select an internship from the internship portal.</p>
        </div>
      </div>
    )
  }

  const handleApply = () => {
    setApplied(true)

    if (onApply) {
      onApply(internship)
    }
  }

  return (
    <div className="internship-details-page">

      <button className="back-btn" onClick={onBack}>
        ← Back to Internships
      </button>

      <div className="details-layout">

        {/* MAIN CONTENT */}
        <div className="details-main">

          <div className="details-header">

            <span className="details-label">
              INTERNSHIP
            </span>

            <h1>{internship.title}</h1>

            <p className="details-company">
              🏢 {internship.company}
            </p>

          </div>


          {/* OVERVIEW */}
          <section className="details-card">

            <h2>About the Internship</h2>

            <p>
              {internship.description}
            </p>

            <p>
              This internship provides an opportunity to work on
              real-world industry projects and gain practical
              experience while working with experienced professionals.
            </p>

          </section>


          {/* SKILLS */}
          <section className="details-card">

            <h2>Required Skills</h2>

            <div className="required-skills">

              {internship.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}

            </div>

          </section>


          {/* RESPONSIBILITIES */}
          <section className="details-card">

            <h2>What You Will Learn</h2>

            <ul className="learning-list">
              <li>Work on real-world industry projects</li>
              <li>Apply technical knowledge in practical situations</li>
              <li>Collaborate with industry professionals</li>
              <li>Develop professional and communication skills</li>
              <li>Build valuable experience for your career</li>
            </ul>

          </section>


          {/* ELIGIBILITY */}
          <section className="details-card">

            <h2>Eligibility</h2>

            <ul className="learning-list">
              <li>Currently pursuing a Bachelor's degree</li>
              <li>Basic knowledge of required technical skills</li>
              <li>Good communication and teamwork skills</li>
              <li>Ability to commit for the internship duration</li>
            </ul>

          </section>

        </div>


        {/* SIDE PANEL */}
        <aside className="details-sidebar">

          <div className="apply-card">

            <div className="apply-status">
              {applied ? '✓ Application Submitted' : 'Open for Applications'}
            </div>

            <h2>
              {applied ? 'You have applied!' : 'Interested in this internship?'}
            </h2>

            <p>
              {applied
                ? 'Your application has been recorded. You can track its status from Applications.'
                : 'Apply now and take the next step toward gaining industry experience.'}
            </p>

            {!applied && (
              <button
                className="apply-now-btn"
                onClick={handleApply}
              >
                Apply Now →
              </button>
            )}

            {applied && (
              <button
                className="application-submitted-btn"
                disabled
              >
                Application Submitted ✓
              </button>
            )}

          </div>


          {/* QUICK INFO */}
          <div className="quick-info-card">

            <h3>Internship Details</h3>

            <div className="quick-info-row">
              <span>📍 Location</span>
              <strong>{internship.location}</strong>
            </div>

            <div className="quick-info-row">
              <span>💼 Work Type</span>
              <strong>{internship.type}</strong>
            </div>

            <div className="quick-info-row">
              <span>⏱ Duration</span>
              <strong>{internship.duration}</strong>
            </div>

            <div className="quick-info-row">
              <span>💰 Stipend</span>
              <strong>{internship.stipend}</strong>
            </div>

          </div>

        </aside>

      </div>

    </div>
  )
}

export default InternshipDetails