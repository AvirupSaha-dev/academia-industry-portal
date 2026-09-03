import { useState } from 'react'
import './Applications.css'

function Applications() {

  const [applications, setApplications] = useState(() => {

    const saved =
      localStorage.getItem('applications')

    return saved
      ? JSON.parse(saved)
      : []

  })


  /* =========================
     REMOVE APPLICATION
  ========================= */

  const handleRemove = (applicationId) => {

    const updated =
      applications.filter(
        (application) =>
          application.applicationId !== applicationId
      )

    localStorage.setItem(
      'applications',
      JSON.stringify(updated)
    )

    setApplications(updated)

  }


  return (

    <div className="applications-page">

      {/* HEADER */}

      <div className="applications-header">

        <div>

          <p className="page-tag">
            📄 APPLICATIONS
          </p>

          <h1>
            My Applications
          </h1>

          <p className="page-description">
            Track the internships and jobs you have applied for.
          </p>

        </div>


        <div className="application-count">

          <strong>
            {applications.length}
          </strong>

          <span>
            Applications
          </span>

        </div>

      </div>


      {/* EMPTY STATE */}

      {applications.length === 0 ? (

        <div className="empty-applications">

          <div className="empty-icon">
            📄
          </div>

          <h2>
            No Applications Yet
          </h2>

          <p>
            You haven't applied to any internship or job yet.
            Explore recommendations and apply to opportunities
            that match your skills.
          </p>

        </div>

      ) : (

        <div className="applications-grid">

          {applications.map((application) => (

            <div
              className="application-card"
              key={application.applicationId}
            >

              <div className="application-top">

                <span className="application-type">
                  {application.type}
                </span>

                <span className="application-status">
                  ✓ {application.status}
                </span>

              </div>


              <h2>
                {application.title}
              </h2>


              <p className="application-company">
                🏢 {application.company}
              </p>


              <div className="application-info">

                <span>
                  📍 {application.location}
                </span>

                <span>
                  💼 {application.mode}
                </span>

                {application.duration && (
                  <span>
                    ◷ {application.duration}
                  </span>
                )}

              </div>


              {application.salary && (

                <div className="application-salary">
                  💰 {application.salary}
                </div>

              )}


              <div className="application-footer">

                <span>
                  Applied on {application.appliedDate}
                </span>

                <button
                  onClick={() =>
                    handleRemove(
                      application.applicationId
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  )

}

export default Applications