import { useState } from 'react'
import './Applications.css'

function Applications() {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('applications')

    try {
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Failed to load applications:', error)
      return []
    }
  })

  /* =========================
     WITHDRAW APPLICATION
  ========================= */

  const handleWithdraw = (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to withdraw this application?'
    )

    if (!confirmed) return

    const updatedApplications = applications.filter(
      (application) => application.id !== id
    )

    setApplications(updatedApplications)

    localStorage.setItem(
      'applications',
      JSON.stringify(updatedApplications)
    )
  }
  window.dispatchEvent(
  new Event('applicationsUpdated')
    )

  /* =========================
     STATUS COUNTS
  ========================= */

  const totalApplications = applications.length

  const underReviewCount = applications.filter(
    (application) =>
      application.status === 'Under Review'
  ).length

  const selectedCount = applications.filter(
    (application) =>
      application.status === 'Selected'
  ).length

  /* =========================
     TYPE
  ========================= */

  const getApplicationType = (application) => {
    if (
      application.type &&
      application.type.toLowerCase() === 'project'
    ) {
      return 'Project'
    }

    return 'Internship'
  }

  /* =========================
     STATUS CLASS
  ========================= */

  const getStatusClass = (status) => {
    if (!status) return 'under-review'

    return status
      .toLowerCase()
      .replace(/\s+/g, '-')
  }

  return (
    <div className="applications-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="applications-header">

        <div>
          <p className="page-tag">
            MY APPLICATIONS
          </p>

          <h1>
            Applications
          </h1>

          <p className="page-description">
            Track your internship and project applications.
          </p>
        </div>

        <div className="application-count">

          <strong>
            {totalApplications}
          </strong>

          <span>
            Total Applications
          </span>

        </div>

      </div>


      {/* =========================
          SUMMARY CARDS
      ========================= */}

      <div className="application-summary">

        {/* TOTAL */}

        <div className="application-summary-card">

          <div className="application-summary-icon blue">
            📄
          </div>

          <div>
            <p>
              Total Applications
            </p>

            <h2>
              {totalApplications}
            </h2>
          </div>

        </div>


        {/* UNDER REVIEW */}

        <div className="application-summary-card">

          <div className="application-summary-icon orange">
            ⏳
          </div>

          <div>
            <p>
              Under Review
            </p>

            <h2>
              {underReviewCount}
            </h2>
          </div>

        </div>


        {/* SELECTED */}

        <div className="application-summary-card">

          <div className="application-summary-icon green">
            ✓
          </div>

          <div>
            <p>
              Selected
            </p>

            <h2>
              {selectedCount}
            </h2>
          </div>

        </div>

      </div>


      {/* =========================
          APPLICATION LIST
      ========================= */}

      {applications.length > 0 ? (

        <div className="applications-list">

          {applications.map((application) => {

            const applicationType =
              getApplicationType(application)

            return (

              <div
                className="application-card"
                key={application.id}
              >

                {/* =========================
                    TOP SECTION
                ========================= */}

                <div className="application-top">

                  <div>

                    {/* PROJECT / INTERNSHIP LABEL */}

                    <span
                      className={`application-label ${
                        applicationType.toLowerCase()
                      }`}
                    >
                      {applicationType}
                    </span>


                    {/* TITLE */}

                    <h2>
                      {application.title}
                    </h2>


                    {/* COMPANY */}

                    <p className="application-company">
                      🏢 {application.company}
                    </p>

                  </div>


                  {/* STATUS */}

                  <span
                    className={`application-status ${getStatusClass(
                      application.status
                    )}`}
                  >
                    {application.status || 'Under Review'}
                  </span>

                </div>


                {/* =========================
                    DETAILS
                ========================= */}

                <div className="application-details">

                  {/* LOCATION */}

                  <div>

                    <span>
                      📍 Location
                    </span>

                    <strong>
                      {application.location || 'Not specified'}
                    </strong>

                  </div>


                  {/* WORK TYPE */}

                  <div>

                    <span>
                      💼 Work Type
                    </span>

                    <strong>
                      {application.type || applicationType}
                    </strong>

                  </div>


                  {/* DURATION */}

                  <div>

                    <span>
                      ◷ Duration
                    </span>

                    <strong>
                      {application.duration || 'Not specified'}
                    </strong>

                  </div>


                  {/* STIPEND */}

                  <div>

                    <span>
                      💰 Stipend
                    </span>

                    <strong>
                      {application.stipend || 'Not specified'}
                    </strong>

                  </div>

                </div>


                {/* =========================
                    SKILLS
                ========================= */}

                {application.skills &&
                  application.skills.length > 0 && (

                    <div className="application-skills">

                      {application.skills.map(
                        (skill, index) => (

                          <span key={index}>
                            {skill}
                          </span>

                        )
                      )}

                    </div>

                  )}


                {/* =========================
                    FOOTER
                ========================= */}

                <div className="application-footer">

                  <div>

                    <small>
                      Applied on
                    </small>

                    <strong>
                      {application.appliedDate ||
                        'Recently'}
                    </strong>

                  </div>


                  {/* WITHDRAW */}

                  <button
                    className="withdraw-btn"
                    onClick={() =>
                      handleWithdraw(application.id)
                    }
                  >
                    Withdraw
                  </button>

                </div>

              </div>

            )
          })}

        </div>

      ) : (

        /* =========================
           EMPTY STATE
        ========================= */

        <div className="applications-empty">

          <div className="empty-icon">
            📄
          </div>

          <h2>
            No applications yet
          </h2>

          <p>
            You haven't applied to any internships or
            projects yet. Explore available opportunities
            and start building your career.
          </p>

        </div>

      )}

    </div>
  )
}

export default Applications