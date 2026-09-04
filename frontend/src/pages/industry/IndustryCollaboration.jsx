import { useState } from "react";

function IndustryCollaboration() {

  const [collaborations] = useState([
    {
      id: 1,
      title: "AI Innovation Challenge",
      company: "XYZ Technologies",
      participants: "Students",
      deadline: "20 Sept 2026",
      type: "Innovation Challenge",
    },
    {
      id: 2,
      title: "Industry Guest Lecture",
      company: "ABC Solutions",
      participants: "Students & Faculty",
      deadline: "25 Sept 2026",
      type: "Guest Lecture",
    },
    {
      id: 3,
      title: "Live Data Science Project",
      company: "DataTech",
      participants: "Students",
      deadline: "30 Sept 2026",
      type: "Live Project",
    },
    {
      id: 4,
      title: "Research Collaboration",
      company: "Tech Research Labs",
      participants: "Faculty",
      deadline: "10 Oct 2026",
      type: "Research",
    },
  ]);

  const [selected, setSelected] = useState(null);

  return (
    <div className="industry-page">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            ACADEMIA–INDUSTRY
          </p>

          <h1>Collaboration</h1>

          <p>
            Build meaningful partnerships with
            students, faculty and institutions.
          </p>
        </div>

      </div>

      <div className="collaboration-tabs">

        {[
          "All",
          "Mentorship",
          "Workshops",
          "Guest Lectures",
          "Live Projects",
          "Innovation Challenges",
          "Research",
        ].map((item) => (
          <button key={item}>
            {item}
          </button>
        ))}

      </div>

      <div className="collaboration-grid">

        {collaborations.map((item) => (
          <div
            className="collaboration-card"
            key={item.id}
          >

            <span className="opportunity-type">
              {item.type}
            </span>

            <h2>{item.title}</h2>

            <p className="collaboration-company">
              🏢 {item.company}
            </p>

            <div className="collaboration-info">

              <div>
                <span>Participants</span>
                <strong>
                  {item.participants}
                </strong>
              </div>

              <div>
                <span>Deadline</span>
                <strong>
                  {item.deadline}
                </strong>
              </div>

            </div>

            <button
              className="industry-primary-btn"
              onClick={() => setSelected(item)}
            >
              View Details
            </button>

          </div>
        ))}

      </div>

      {selected && (
        <div className="industry-modal-overlay">

          <div className="industry-modal">

            <button
              className="modal-close"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <span className="opportunity-type">
              {selected.type}
            </span>

            <h2>{selected.title}</h2>

            <p>
              This collaboration is organised by{" "}
              <strong>
                {selected.company}
              </strong>.
            </p>

            <div className="modal-details">

              <p>
                <strong>Participants:</strong>{" "}
                {selected.participants}
              </p>

              <p>
                <strong>Deadline:</strong>{" "}
                {selected.deadline}
              </p>

            </div>

            <button
              className="industry-primary-btn"
              onClick={() => setSelected(null)}
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default IndustryCollaboration;