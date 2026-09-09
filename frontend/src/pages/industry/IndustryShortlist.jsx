import { useState } from "react";

function IndustryShortlist() {
  const [shortlisted, setShortlisted] = useState([
    {
      id: 1,
      name: "Sneha Roy",
      role: "Frontend Development Intern",
      match: 84,
      skills: ["React", "HTML", "CSS"],
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Arjun Singh",
      role: "AI Student Analytics",
      match: 87,
      skills: ["Python", "React", "SQL"],
      status: "Shortlisted",
    },
    {
      id: 3,
      name: "Ananya Das",
      role: "Data Analyst",
      match: 89,
      skills: ["Python", "Power BI", "SQL"],
      status: "Shortlisted",
    },
    {
      id: 4,
      name: "Rahul Sharma",
      role: "Frontend Development Intern",
      match: 94,
      skills: ["React", "JavaScript", "CSS"],
      status: "Shortlisted",
    },
    {
      id: 5,
      name: "Priya Das",
      role: "Machine Learning Engineer",
      match: 91,
      skills: ["Python", "ML", "TensorFlow"],
      status: "Shortlisted",
    },
  ]);

  const removeCandidate = (id) => {
    const candidate = shortlisted.find(
      (item) => item.id === id
    );

    if (!candidate) return;

    const confirmRemove = window.confirm(
      `Remove ${candidate.name} from shortlist?`
    );

    if (!confirmRemove) return;

    setShortlisted((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <div className="industry-page">

      {/* HEADER */}
      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            HIRING
          </p>

          <h1>
            Shortlisted Candidates
          </h1>

          <p>
            Manage candidates selected for the
            next recruitment stage.
          </p>
        </div>

        <div className="shortlist-count">
          <strong>
            {shortlisted.length}
          </strong>

          <span>
            Shortlisted
          </span>
        </div>

      </div>


      {/* LIST */}
      <div className="industry-card">

        {shortlisted.length === 0 ? (

          <div className="industry-empty">

            <div className="empty-icon">
              ⭐
            </div>

            <h3>
              No shortlisted candidates
            </h3>

            <p>
              Candidates you shortlist will
              appear here.
            </p>

          </div>

        ) : (

          <div className="shortlist-list">

            {shortlisted.map((candidate) => (

              <div
                className="shortlist-row"
                key={candidate.id}
              >

                {/* AVATAR */}
                <div className="table-avatar">
                  {candidate.name.charAt(0)}
                </div>


                {/* INFO */}
                <div className="shortlist-info">

                  <strong>
                    {candidate.name}
                  </strong>

                  <span>
                    {candidate.role}
                  </span>

                  <div className="shortlist-skills">

                    {candidate.skills.map(
                      (skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                </div>


                {/* MATCH */}
                <div className="shortlist-match">

                  <strong>
                    {candidate.match}%
                  </strong>

                  <small>
                    🤖 AI Match
                  </small>

                </div>


                {/* STATUS */}
                <span className="application-status shortlisted">
                  {candidate.status}
                </span>


                {/* ACTIONS */}
                <div className="shortlist-actions">

                  <button
                    className="industry-secondary-btn"
                    onClick={() =>
                      alert(
                        `Opening profile of ${candidate.name}`
                      )
                    }
                  >
                    View Profile
                  </button>

                  <button
                    className="industry-primary-btn"
                    onClick={() =>
                      alert(
                        `Interview scheduling for ${candidate.name}`
                      )
                    }
                  >
                    Schedule Interview
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeCandidate(candidate.id)
                    }
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default IndustryShortlist;