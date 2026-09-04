import { useState } from "react";

function IndustryShortlist() {

  const [shortlisted, setShortlisted] = useState([
    {
      id: 1,
      name: "Ananya Das",
      role: "Data Analyst",
      match: 91,
      status: "Shortlisted",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      role: "Machine Learning Intern",
      match: 94,
      status: "Interview",
    },
  ]);

  const removeCandidate = (id) => {
    setShortlisted((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="industry-page">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            RECRUITMENT
          </p>

          <h1>Shortlisted Candidates</h1>

          <p>
            Manage candidates selected for the
            next recruitment stage.
          </p>
        </div>

      </div>

      <div className="industry-card">

        {shortlisted.length === 0 ? (

          <div className="industry-empty">
            <div>⭐</div>
            <h3>No shortlisted candidates</h3>
            <p>
              Candidates you shortlist will appear here.
            </p>
          </div>

        ) : (

          <div className="shortlist-list">

            {shortlisted.map((candidate) => (
              <div
                className="shortlist-row"
                key={candidate.id}
              >

                <div className="table-avatar">
                  {candidate.name.charAt(0)}
                </div>

                <div>
                  <strong>{candidate.name}</strong>
                  <span>{candidate.role}</span>
                </div>

                <span className="ai-match">
                  🤖 {candidate.match}% Match
                </span>

                <span className="application-status shortlisted">
                  {candidate.status}
                </span>

                <button
                  className="industry-secondary-btn"
                  onClick={() =>
                    removeCandidate(candidate.id)
                  }
                >
                  Remove
                </button>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default IndustryShortlist;