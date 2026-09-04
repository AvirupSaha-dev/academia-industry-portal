import { useState } from "react";

function IndustryMentorship() {

  const [mentorships, setMentorships] = useState([
    {
      id: 1,
      title: "AI Career Mentorship",
      mentor: "Senior ML Engineer",
      students: 24,
      duration: "8 Weeks",
      status: "Active",
    },
    {
      id: 2,
      title: "Software Engineering Mentorship",
      mentor: "Lead Software Engineer",
      students: 18,
      duration: "6 Weeks",
      status: "Active",
    },
  ]);

  const createMentorship = () => {

    const title = window.prompt(
      "Enter mentorship program title:"
    );

    if (!title) return;

    setMentorships((previous) => [
      {
        id: Date.now(),
        title,
        mentor: "Industry Mentor",
        students: 0,
        duration: "6 Weeks",
        status: "Draft",
      },
      ...previous,
    ]);
  };

  return (
    <div className="industry-page">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            MENTORSHIP
          </p>

          <h1>Mentorship Programs</h1>

          <p>
            Connect industry professionals
            with students and academicians.
          </p>
        </div>

        <button
          className="industry-primary-btn"
          onClick={createMentorship}
        >
          + Create Mentorship
        </button>

      </div>

      <div className="training-grid">

        {mentorships.map((item) => (
          <div
            className="training-card"
            key={item.id}
          >

            <div className="training-icon">
              🤝
            </div>

            <span className="opportunity-type">
              Mentorship
            </span>

            <h2>{item.title}</h2>

            <div className="training-meta">

              <span>
                👨‍💼 {item.mentor}
              </span>

              <span>
                👥 {item.students} Students
              </span>

              <span>
                ⏱ {item.duration}
              </span>

            </div>

            <span className="status-active">
              ● {item.status}
            </span>

            <button className="industry-secondary-btn">
              Manage Mentorship
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default IndustryMentorship;