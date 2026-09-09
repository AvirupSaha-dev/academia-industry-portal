import { useEffect, useState } from "react";

const STORAGE_KEY = "industryShortlistedCandidates";

function IndustryCandidates() {

  const candidates = [
    {
      id: 1,
      name: "Rahul Sharma",
      education: "B.Tech CSE",
      qualification: "B.Tech",
      cgpa: 8.7,
      location: "Kolkata",
      match: 94,
      skills: ["Python", "Machine Learning", "SQL"],
      experience: "2 Projects",
      role: "Machine Learning Intern",
    },
    {
      id: 2,
      name: "Ananya Das",
      education: "B.Tech CSE",
      qualification: "B.Tech",
      cgpa: 9.1,
      location: "Delhi",
      match: 91,
      skills: ["Python", "Power BI", "SQL"],
      experience: "1 Internship",
      role: "Data Analyst",
    },
    {
      id: 3,
      name: "Arjun Roy",
      education: "B.Tech IT",
      qualification: "B.Tech",
      cgpa: 8.3,
      location: "Kolkata",
      match: 87,
      skills: ["React", "JavaScript", "Node.js"],
      experience: "3 Projects",
      role: "Frontend Developer",
    },
    {
      id: 4,
      name: "Priya Sen",
      education: "MCA",
      qualification: "MCA",
      cgpa: 8.8,
      location: "Bangalore",
      match: 84,
      skills: ["Python", "AI", "TensorFlow"],
      experience: "1 Project",
      role: "AI Engineer",
    },
    {
      id: 5,
      name: "Sneha Roy",
      education: "B.Tech CSE",
      qualification: "B.Tech",
      cgpa: 8.5,
      location: "Kolkata",
      match: 82,
      skills: ["React", "HTML", "CSS"],
      experience: "2 Projects",
      role: "Frontend Developer",
    },
  ];


  /* =====================================================
     FILTER STATES
  ===================================================== */

  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");
  const [qualification, setQualification] = useState("");
  const [minimumCgpa, setMinimumCgpa] = useState("");


  /* =====================================================
     SHORTLIST STATE
  ===================================================== */

  const [shortlisted, setShortlisted] = useState(() => {

    const saved =
      localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }

  });


  /* =====================================================
     SYNC SHORTLIST
  ===================================================== */

  useEffect(() => {

    const syncShortlist = () => {

      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        setShortlisted([]);
        return;
      }

      try {
        setShortlisted(JSON.parse(saved));
      } catch {
        setShortlisted([]);
      }

    };


    window.addEventListener(
      "shortlistUpdated",
      syncShortlist
    );

    window.addEventListener(
      "storage",
      syncShortlist
    );


    return () => {

      window.removeEventListener(
        "shortlistUpdated",
        syncShortlist
      );

      window.removeEventListener(
        "storage",
        syncShortlist
      );

    };

  }, []);


  /* =====================================================
     SHORTLIST / REMOVE
  ===================================================== */

  const toggleShortlist = (candidate) => {

    const alreadyShortlisted =
      shortlisted.some(
        (item) =>
          String(item.id) === String(candidate.id)
      );


    let updated;


    if (alreadyShortlisted) {

      // REMOVE
      updated =
        shortlisted.filter(
          (item) =>
            String(item.id) !==
            String(candidate.id)
        );

    } else {

      // ADD
      updated = [
        ...shortlisted,
        {
          id: candidate.id,
          name: candidate.name,
          role: candidate.role,
          match: candidate.match,
          status: "Shortlisted",
          education: candidate.education,
          qualification: candidate.qualification,
          cgpa: candidate.cgpa,
          location: candidate.location,
          skills: candidate.skills,
          experience: candidate.experience,
        },
      ];

    }


    setShortlisted(updated);


    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );


    /*
     * Notify all industry pages
     */
    window.dispatchEvent(
      new Event("shortlistUpdated")
    );

  };


  /* =====================================================
     FILTER
  ===================================================== */

  const filtered = candidates.filter(
    (candidate) => {

      const searchText =
        search.trim().toLowerCase();


      const skillText =
        skill.trim().toLowerCase();


      const searchMatch =
        !searchText ||
        candidate.name
          .toLowerCase()
          .includes(searchText) ||
        candidate.education
          .toLowerCase()
          .includes(searchText) ||
        candidate.location
          .toLowerCase()
          .includes(searchText) ||
        candidate.role
          .toLowerCase()
          .includes(searchText);


      const skillMatch =
        !skillText ||
        candidate.skills.some(
          (item) =>
            item
              .toLowerCase()
              .includes(skillText)
        );


      const qualificationMatch =
        !qualification ||
        candidate.qualification ===
          qualification;


      const cgpaMatch =
        !minimumCgpa ||
        candidate.cgpa >=
          Number(minimumCgpa);


      return (
        searchMatch &&
        skillMatch &&
        qualificationMatch &&
        cgpaMatch
      );

    }
  );


  return (

    <div className="industry-page">


      {/* =================================================
         HEADER
      ================================================= */}

      <div className="industry-page-header">

        <div>

          <p className="industry-tag">
            TALENT DISCOVERY
          </p>

          <h1>
            Find Candidates
          </h1>

          <p>
            Discover students based on skills,
            qualifications and AI compatibility.
          </p>

        </div>


        {/* SHORTLIST COUNT */}

        <div className="shortlist-count-card">

          <span>
            Shortlisted Candidates
          </span>

          <strong>
            {shortlisted.length}
          </strong>

        </div>

      </div>


      {/* =================================================
         FILTER CARD
      ================================================= */}

      <div className="industry-card">

        <div className="candidate-filters">


          <input
            type="text"
            placeholder="Search name, role, location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />


          <input
            type="text"
            placeholder="Filter by skill..."
            value={skill}
            onChange={(e) =>
              setSkill(e.target.value)
            }
          />


          <select
            value={qualification}
            onChange={(e) =>
              setQualification(e.target.value)
            }
          >

            <option value="">
              All Qualifications
            </option>

            <option value="B.Tech">
              B.Tech
            </option>

            <option value="BCA">
              BCA
            </option>

            <option value="MCA">
              MCA
            </option>

          </select>


          <select
            value={minimumCgpa}
            onChange={(e) =>
              setMinimumCgpa(e.target.value)
            }
          >

            <option value="">
              Any CGPA
            </option>

            <option value="8">
              8+
            </option>

            <option value="8.5">
              8.5+
            </option>

            <option value="9">
              9+
            </option>

          </select>


        </div>

      </div>


      {/* =================================================
         RESULTS
      ================================================= */}

      <div className="candidate-results-header">

        <span>
          {filtered.length} candidates found
        </span>

        <span className="candidate-shortlist-info">
          ⭐ {shortlisted.length} shortlisted
        </span>

      </div>


      {/* =================================================
         CANDIDATE GRID
      ================================================= */}

      <div className="candidate-grid">

        {filtered.length === 0 ? (

          <div className="industry-empty">

            <div className="empty-icon">
              🔍
            </div>

            <h3>
              No candidates found
            </h3>

            <p>
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          filtered.map((candidate) => {

            const isShortlisted =
              shortlisted.some(
                (item) =>
                  String(item.id) ===
                  String(candidate.id)
              );


            return (

              <div
                className={
                  `candidate-profile-card ${
                    isShortlisted
                      ? "candidate-is-shortlisted"
                      : ""
                  }`
                }
                key={candidate.id}
              >


                {/* TOP */}

                <div className="candidate-card-top">


                  <div className="candidate-large-avatar">

                    {candidate.name
                      .charAt(0)
                      .toUpperCase()}

                  </div>


                  <div className="candidate-main-info">

                    <h2>
                      {candidate.name}
                    </h2>

                    <p>
                      {candidate.role}
                    </p>

                    <small>
                      {candidate.education}
                    </small>

                  </div>


                  <div className="candidate-match">

                    <span>
                      🤖
                    </span>

                    <strong>
                      {candidate.match}%
                    </strong>

                    <small>
                      AI Match
                    </small>

                  </div>


                </div>


                {/* DETAILS */}

                <div className="candidate-details">

                  <span>
                    🎓 CGPA: {candidate.cgpa}
                  </span>

                  <span>
                    📍 {candidate.location}
                  </span>

                  <span>
                    💼 {candidate.experience}
                  </span>

                </div>


                {/* SKILLS */}

                <div className="candidate-card-skills">

                  {candidate.skills.map(
                    (item) => (

                      <span key={item}>
                        {item}
                      </span>

                    )
                  )}

                </div>


                {/* SHORTLIST STATUS */}

                {isShortlisted && (

                  <div className="candidate-shortlisted-label">

                    ✓ Currently Shortlisted

                  </div>

                )}


                {/* ACTIONS */}

                <div className="candidate-card-actions">


                  <button
                    className="industry-secondary-btn"
                    onClick={() =>
                      alert(
                        `${candidate.name}'s profile`
                      )
                    }
                  >
                    View Profile
                  </button>


                  <button
                    className="industry-secondary-btn"
                    onClick={() =>
                      alert(
                        `Resume of ${candidate.name}`
                      )
                    }
                  >
                    View Resume
                  </button>


                  <button
                    className={
                      isShortlisted
                        ? "industry-remove-btn"
                        : "industry-primary-btn"
                    }
                    onClick={() =>
                      toggleShortlist(candidate)
                    }
                  >

                    {isShortlisted
                      ? "✕ Remove"
                      : "⭐ Shortlist"}

                  </button>


                </div>

              </div>

            );

          })

        )}

      </div>

    </div>

  );

}

export default IndustryCandidates;