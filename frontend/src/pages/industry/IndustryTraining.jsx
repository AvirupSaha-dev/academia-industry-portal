import { useState } from "react";

function IndustryTraining() {

  const [programs, setPrograms] = useState([
    {
      id: 1,
      title: "AI & Machine Learning Bootcamp",
      type: "Training",
      duration: "6 Weeks",
      participants: 85,
      status: "Active",
    },
    {
      id: 2,
      title: "Industry Ready Python Certification",
      type: "Certification",
      duration: "4 Weeks",
      participants: 120,
      status: "Active",
    },
    {
      id: 3,
      title: "Data Analytics Workshop",
      type: "Workshop",
      duration: "2 Days",
      participants: 60,
      status: "Upcoming",
    },
  ]);

  const addProgram = () => {

    const title =
      window.prompt(
        "Enter training/program title:"
      );

    if (!title) return;

    setPrograms((previous) => [
      {
        id: Date.now(),
        title,
        type: "Training",
        duration: "4 Weeks",
        participants: 0,
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
            LEARNING & DEVELOPMENT
          </p>

          <h1>Training Programs</h1>

          <p>
            Publish training, courses,
            certifications and workshops.
          </p>
        </div>

        <button
          className="industry-primary-btn"
          onClick={addProgram}
        >
          + Create Program
        </button>

      </div>

      <div className="training-grid">

        {programs.map((program) => (
          <div
            className="training-card"
            key={program.id}
          >

            <div className="training-icon">
              🎓
            </div>

            <span className="opportunity-type">
              {program.type}
            </span>

            <h2>{program.title}</h2>

            <div className="training-meta">
              <span>⏱ {program.duration}</span>
              <span>
                👥 {program.participants} participants
              </span>
            </div>

            <span className="status-active">
              ● {program.status}
            </span>

            <button className="industry-secondary-btn">
              Manage Program
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default IndustryTraining;