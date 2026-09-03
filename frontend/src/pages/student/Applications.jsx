import { useEffect, useState } from 'react'
import './Applications.css'

function Applications() {

  /* =========================
     LOAD APPLICATIONS
  ========================= */

  const [applications, setApplications] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem('applications')

        if (!saved) return []

        const parsed =
          JSON.parse(saved)

        return Array.isArray(parsed)
          ? parsed
          : []

      } catch (error) {

        console.error(
          'Failed to load applications:',
          error
        )

        return []

      }

    })


  /* =========================
     LOAD LATEST DATA
  ========================= */

  const loadApplications = () => {

    try {

      const saved =
        localStorage.getItem('applications')

      if (!saved) {

        setApplications([])

        return

      }

      const parsed =
        JSON.parse(saved)

      setApplications(
        Array.isArray(parsed)
          ? parsed
          : []
      )

    } catch (error) {

      console.error(
        'Failed to load applications:',
        error
      )

      setApplications([])

    }

  }


  /* =========================
     SYNC
  ========================= */

  useEffect(() => {

    loadApplications()

    window.addEventListener(
      'storage',
      loadApplications
    )

    window.addEventListener(
      'applicationsUpdated',
      loadApplications
    )

    window.addEventListener(
      'focus',
      loadApplications
    )

    return () => {

      window.removeEventListener(
        'storage',
        loadApplications
      )

      window.removeEventListener(
        'applicationsUpdated',
        loadApplications
      )

      window.removeEventListener(
        'focus',
        loadApplications
      )

    }

  }, [])


  /* =========================
     REMOVE ONE APPLICATION
  ========================= */

  const handleRemove = (applicationId) => {

    if (!applicationId) {

      alert(
        'This application cannot be removed because it has no valid ID.'
      )

      return

    }


    try {

      /* Always read latest storage */

      const saved =
        localStorage.getItem('applications')

      let currentApplications = []

      if (saved) {

        const parsed =
          JSON.parse(saved)

        if (Array.isArray(parsed)) {

          currentApplications =
            parsed

        }

      }


      /* =========================
         REMOVE ONLY MATCHING ID
      ========================= */

      const updatedApplications =
        currentApplications.filter(
          (application) =>
            String(
              application.applicationId || ''
            ) !==
            String(applicationId)
        )


      /* =========================
         SAVE
      ========================= */

      localStorage.setItem(
        'applications',
        JSON.stringify(
          updatedApplications
        )
      )


      /* =========================
         UPDATE STATE
      ========================= */

      setApplications(
        updatedApplications
      )


      /* =========================
         NOTIFY OTHER PAGES
      ========================= */

      window.dispatchEvent(
        new Event(
          'applicationsUpdated'
        )
      )

    } catch (error) {

      console.error(
        'Failed to remove application:',
        error
      )

      alert(
        'Failed to remove application.'
      )

    }

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


      {/* EMPTY */}

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

          {applications.map(
            (application, index) => {

              /*
                Old applications may not have
                applicationId.

                Generate a temporary unique key
                for display only.
              */

              const safeApplicationId =
                application.applicationId ||
                `${String(
                  application.type || 'application'
                ).toLowerCase()}-${String(
                  application.id || index
                )}-${index}`


              return (

                <div
                  className="application-card"
                  key={safeApplicationId}
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

                    {application.location && (

                      <span>
                        📍 {application.location}
                      </span>

                    )}

                    {application.mode && (

                      <span>
                        💼 {application.mode}
                      </span>

                    )}

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


                  {application.stipend && (

                    <div className="application-salary">
                      💰 {application.stipend}
                    </div>

                  )}


                  <div className="application-footer">

                    <span>
                      Applied on {application.appliedDate}
                    </span>


                    <button
                      type="button"
                      onClick={() =>
                        handleRemove(
                          application.applicationId
                        )
                      }
                      disabled={
                        !application.applicationId
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              )

            }
          )}

        </div>

      )}

    </div>

  )

}

export default Applications