import { useEffect, useState } from 'react'
import './Internships.css'

function Internships({
  onBack,
  onViewDetails,
}) {

  /* =========================
     INTERNSHIP DATA
  ========================= */

  const internships = [
    {
      id: 'internship-1',
      title: 'Frontend Development Intern',
      company: 'Digital Solutions India',
      location: 'Kolkata',
      type: 'Hybrid',
      duration: '6 Months',
      stipend: '₹15,000 / month',
      skills: ['React', 'JavaScript', 'CSS'],
      description:
        'Work with our frontend development team to build modern and responsive web applications using React and JavaScript.',
      eligibility:
        'B.Tech / BCA / MCA students with basic frontend development knowledge.',
      deadline: '30 September 2026',
    },

    {
      id: 'internship-2',
      title: 'Machine Learning Intern',
      company: 'Tech Innovations Pvt. Ltd.',
      location: 'Remote',
      type: 'Remote',
      duration: '3 Months',
      stipend: '₹20,000 / month',
      skills: [
        'Python',
        'Machine Learning',
        'Pandas',
        'NumPy',
      ],
      description:
        'Work on real-world machine learning projects involving data preprocessing, model development and evaluation.',
      eligibility:
        'B.Tech / BCA / MCA students with knowledge of Python and basic Machine Learning.',
      deadline: '5 October 2026',
    },

    {
      id: 'internship-3',
      title: 'Data Science Intern',
      company: 'Analytics Hub',
      location: 'Bangalore',
      type: 'Hybrid',
      duration: '4 Months',
      stipend: '₹18,000 / month',
      skills: [
        'Python',
        'Data Science',
        'SQL',
        'Power BI',
      ],
      description:
        'Analyze real-world datasets and create meaningful business insights using data science and visualization techniques.',
      eligibility:
        'Students pursuing Computer Science, Data Science or related fields.',
      deadline: '12 October 2026',
    },

    {
      id: 'internship-4',
      title: 'AI Research Intern',
      company: 'Future AI Labs',
      location: 'Kolkata',
      type: 'On-site',
      duration: '6 Months',
      stipend: '₹25,000 / month',
      skills: [
        'Python',
        'Artificial Intelligence',
        'Machine Learning',
        'Deep Learning',
      ],
      description:
        'Assist the research team in developing AI models and experimenting with modern machine learning techniques.',
      eligibility:
        'B.Tech / M.Tech students with strong interest in AI and Machine Learning.',
      deadline: '20 October 2026',
    },

    {
      id: 'internship-5',
      title: 'Full Stack Development Intern',
      company: 'NextGen Technologies',
      location: 'Remote',
      type: 'Remote',
      duration: '5 Months',
      stipend: '₹22,000 / month',
      skills: [
        'React',
        'Node.js',
        'JavaScript',
        'MongoDB',
      ],
      description:
        'Develop full-stack web applications and work with both frontend and backend technologies.',
      eligibility:
        'Students with basic knowledge of JavaScript, React and backend development.',
      deadline: '25 October 2026',
    },

    {
      id: 'internship-6',
      title: 'Data Analyst Intern',
      company: 'Insight Technologies',
      location: 'Mumbai',
      type: 'Hybrid',
      duration: '3 Months',
      stipend: '₹16,000 / month',
      skills: [
        'SQL',
        'Excel',
        'Python',
        'Power BI',
      ],
      description:
        'Work with business datasets, create dashboards and generate analytical reports for decision making.',
      eligibility:
        'Students interested in data analytics with basic SQL and Excel knowledge.',
      deadline: '31 October 2026',
    },
  ]


  /* =========================
     SEARCH
  ========================= */

  const [search, setSearch] = useState('')


  /* =========================
     LOCATION FILTER
  ========================= */

  const [locationFilter, setLocationFilter] =
    useState('All Internships')


  /* =========================
     APPLICATIONS
     
     IMPORTANT:
     Jobs, Internships and Projects
     all use the SAME storage key:
     
     applications
  ========================= */

  const [applications, setApplications] =
    useState(() => {

      try {

        const saved =
          localStorage.getItem('applications')

        if (!saved) {
          return []
        }

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
     LOAD LATEST APPLICATIONS
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

      if (Array.isArray(parsed)) {

        setApplications(parsed)

      } else {

        setApplications([])

      }

    } catch (error) {

      console.error(
        'Failed to load applications:',
        error
      )

      setApplications([])

    }

  }


  /* =========================
     APPLICATION SYNC
     
     Updates this page when:
     
     - Job is applied
     - Project is applied
     - Internship is applied
     - Application is removed
     - Another tab changes data
     - User returns to this page
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
     CHECK IF INTERNSHIP
     IS ALREADY APPLIED
  ========================= */

  const isInternshipApplied = (
    internshipId
  ) => {

    return applications.some(
      (application) => {

        const sameId =
          String(application.id || '') ===
          String(internshipId)

        const sameType =
          String(
            application.type || ''
          ).toLowerCase() ===
          'internship'

        return (
          sameId &&
          sameType
        )

      }
    )

  }


  /* =========================
     SEARCH + FILTER
  ========================= */

  const filteredInternships =
    internships.filter(
      (internship) => {

        const searchText =
          search
            .toLowerCase()
            .trim()


        const matchesSearch =

          internship.title
            .toLowerCase()
            .includes(searchText)

          ||

          internship.company
            .toLowerCase()
            .includes(searchText)

          ||

          internship.location
            .toLowerCase()
            .includes(searchText)

          ||

          internship.type
            .toLowerCase()
            .includes(searchText)

          ||

          internship.skills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(searchText)
          )


        const matchesLocation =

          locationFilter ===
            'All Internships'

          ||

          internship.location ===
            locationFilter


        return (
          matchesSearch &&
          matchesLocation
        )

      }
    )


  /* =========================
     VIEW DETAILS
  ========================= */

  const handleViewDetails = (
    internship
  ) => {

    if (onViewDetails) {

      onViewDetails(internship)

    }

  }


  /* =========================
     APPLY INTERNSHIP
  ========================= */

  const handleApplyClick = (
    internship
  ) => {

    try {

      /* =========================
         GET LATEST APPLICATIONS
      ========================= */

      const saved =
        localStorage.getItem(
          'applications'
        )

      let currentApplications = []


      if (saved) {

        try {

          const parsed =
            JSON.parse(saved)

          if (Array.isArray(parsed)) {

            currentApplications =
              parsed

          }

        } catch (error) {

          console.error(
            'Invalid applications data:',
            error
          )

          currentApplications = []

        }

      }


      /* =========================
         DUPLICATE CHECK
      ========================= */

      const alreadyApplied =
        currentApplications.some(
          (application) => {

            const sameId =
              String(
                application.id || ''
              ) ===
              String(internship.id)

            const sameType =
              String(
                application.type || ''
              ).toLowerCase() ===
              'internship'

            return (
              sameId &&
              sameType
            )

          }
        )


      /* =========================
         ALREADY APPLIED
      ========================= */

      if (alreadyApplied) {

        setApplications(
          currentApplications
        )

        alert(
          'You have already applied for this internship.'
        )

        return

      }


      /* =========================
         UNIQUE APPLICATION ID
         
         IMPORTANT:
         Do NOT use Date.now()
         here.
         
         This keeps one permanent
         ID for this internship.
      ========================= */

      const applicationId =
        `internship-${internship.id}`


      /* =========================
         CREATE APPLICATION
      ========================= */

      const newApplication = {

        applicationId:

          applicationId,

        id:

          internship.id,

        type:

          'Internship',

        title:

          internship.title,

        company:

          internship.company,

        location:

          internship.location,

        mode:

          internship.type,

        duration:

          internship.duration,

        stipend:

          internship.stipend,

        salary:

          '',

        skills:

          internship.skills || [],

        description:

          internship.description || '',

        eligibility:

          internship.eligibility || '',

        deadline:

          internship.deadline || '',

        status:

          'Applied',

        appliedDate:

          new Date().toLocaleDateString(
            'en-IN',
            {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            }
          )

      }


      /* =========================
         ADD WITHOUT REMOVING
         EXISTING JOB / PROJECT
         APPLICATIONS
      ========================= */

      const updatedApplications = [

        ...currentApplications,

        newApplication

      ]


      /* =========================
         SAVE TO LOCAL STORAGE
      ========================= */

      localStorage.setItem(
        'applications',
        JSON.stringify(
          updatedApplications
        )
      )


      /* =========================
         UPDATE CURRENT PAGE
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


      /* =========================
         PARENT CALLBACK
      ========================= */

      if (onViewDetails) {

        onViewDetails(
          internship
        )

      }


      /* =========================
         SUCCESS
      ========================= */

      alert(
        `Application submitted for ${internship.title}!`
      )

    } catch (error) {

      console.error(
        'Failed to apply for internship:',
        error
      )

      alert(
        'Something went wrong while applying.'
      )

    }

  }


  return (

    <div className="internships-page">


      {/* =========================
          HEADER
      ========================= */}

      <div className="internships-header">

        <div>

          <p className="page-tag">
            OPPORTUNITIES
          </p>

          <h1>
            Internships
          </h1>

          <p className="page-description">
            Discover internships and gain
            real-world industry experience.
          </p>

        </div>


        <div className="internship-count">

          <strong>
            {internships.length}
          </strong>

          <span>
            Available Internships
          </span>

        </div>

      </div>


      {/* =========================
          TOOLBAR
      ========================= */}

      <div className="internships-toolbar">

        <input
          type="text"
          className="search-input"
          placeholder="Search internships, skills or companies..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />


        <select
          className="filter-select"
          value={locationFilter}
          onChange={(e) =>
            setLocationFilter(
              e.target.value
            )
          }
        >

          <option value="All Internships">
            All Internships
          </option>

          <option value="Remote">
            Remote
          </option>

          <option value="Kolkata">
            Kolkata
          </option>

          <option value="Bangalore">
            Bangalore
          </option>

          <option value="Mumbai">
            Mumbai
          </option>

        </select>

      </div>


      {/* =========================
          RESULT COUNT
      ========================= */}

      <p className="internship-result-count">

        Showing {filteredInternships.length} internships

      </p>


      {/* =========================
          INTERNSHIP GRID
      ========================= */}

      <div className="internships-grid">

        {filteredInternships.map(
          (internship) => {

            const isApplied =
              isInternshipApplied(
                internship.id
              )


            return (

              <div
                className={
                  isApplied
                    ? 'internship-card applied-internship-card'
                    : 'internship-card'
                }
                key={internship.id}
              >


                {/* =========================
                    TOP
                ========================= */}

                <div className="internship-top">

                  <span className="internship-label">
                    Internship
                  </span>

                  <button
                    className="heart-btn"
                    type="button"
                  >
                    ♡
                  </button>

                </div>


                {/* =========================
                    TITLE
                ========================= */}

                <h2>
                  {internship.title}
                </h2>


                {/* =========================
                    COMPANY
                ========================= */}

                <p className="company-name">
                  🏢 {internship.company}
                </p>


                {/* =========================
                    META
                ========================= */}

                <div className="internship-meta">

                  <span>
                    📍 {internship.location}
                  </span>

                  <span>
                    💼 {internship.type}
                  </span>

                  <span>
                    ◷ {internship.duration}
                  </span>

                </div>


                {/* =========================
                    STIPEND
                ========================= */}

                <div className="internship-stipend">

                  💰 {internship.stipend}

                </div>


                {/* =========================
                    SKILLS
                ========================= */}

                <div className="skills">

                  {internship.skills.map(
                    (skill, index) => (

                      <span key={index}>
                        {skill}
                      </span>

                    )
                  )}

                </div>


                {/* =========================
                    DESCRIPTION
                ========================= */}

                <p className="internship-description">

                  {internship.description}

                </p>


                {/* =========================
                    DEADLINE
                ========================= */}

                <div className="internship-deadline">

                  <span>
                    Application Deadline
                  </span>

                  <strong>
                    {internship.deadline}
                  </strong>

                </div>


                {/* =========================
                    APPLY BUTTON
                ========================= */}

                <button
                  type="button"
                  className={
                    isApplied
                      ? 'view-internship-btn applied-btn'
                      : 'view-internship-btn'
                  }
                  onClick={() =>
                    handleApplyClick(
                      internship
                    )
                  }
                  disabled={isApplied}
                >

                  {isApplied
                    ? '✓ Applied'
                    : 'View & Apply'}

                </button>


              </div>

            )

          }
        )}

      </div>


      {/* =========================
          EMPTY STATE
      ========================= */}

      {filteredInternships.length === 0 && (

        <div className="no-internships">

          <h3>
            No internships found
          </h3>

          <p>
            Try changing your search
            or filter.
          </p>

        </div>

      )}

    </div>

  )

}

export default Internships