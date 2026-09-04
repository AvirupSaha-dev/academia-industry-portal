import { Link } from "react-router-dom";

function IndustryDashboard() {
  const stats = [
    ["💼", "Active Internships", "12", "+3 this month"],
    ["🏢", "Active Jobs", "8", "+2 this month"],
    ["📄", "Total Applications", "246", "+18% this month"],
    ["⭐", "Shortlisted", "34", "+7 this week"],
    ["🎤", "Interviews", "18", "6 scheduled"],
    ["✅", "Selected", "9", "This recruitment cycle"],
  ];

  const candidates = [
    {
      name: "Rahul Sharma",
      role: "Machine Learning Intern",
      match: 94,
      skills: ["Python", "ML", "SQL"],
    },
    {
      name: "Ananya Das",
      role: "Data Analyst",
      match: 91,
      skills: ["Python", "Power BI", "SQL"],
    },
    {
      name: "Arjun Roy",
      role: "Software Developer",
      match: 87,
      skills: ["Java", "React", "SQL"],
    },
  ];

  return (
    <div className="industry-page">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            INDUSTRY DASHBOARD
          </p>

          <h1>Welcome back, Industry Partner</h1>

          <p>
            Manage opportunities, candidates,
            recruitment and industry-academia
            collaboration.
          </p>
        </div>

        <Link
          to="/industry/post-opportunity"
          className="industry-primary-btn"
        >
          + Post Opportunity
        </Link>

      </div>

      <div className="industry-stat-grid">

        {stats.map((item) => (
          <div className="industry-stat-card" key={item[1]}>

            <div className="industry-stat-icon">
              {item[0]}
            </div>

            <div>
              <span>{item[1]}</span>
              <strong>{item[2]}</strong>
              <small>{item[3]}</small>
            </div>

          </div>
        ))}

      </div>

      <div className="industry-two-column">

        <section className="industry-card">

          <div className="industry-card-header">
            <div>
              <h2>🤖 AI Recommended Candidates</h2>
              <p>
                Students matching your active opportunities
              </p>
            </div>

            <Link to="/industry/candidates">
              View all
            </Link>
          </div>

          <div className="candidate-list">

            {candidates.map((candidate) => (
              <div
                className="candidate-row"
                key={candidate.name}
              >

                <div className="candidate-avatar">
                  {candidate.name.charAt(0)}
                </div>

                <div className="candidate-info">
                  <strong>{candidate.name}</strong>
                  <span>{candidate.role}</span>

                  <div className="candidate-skills">
                    {candidate.skills.map((skill) => (
                      <small key={skill}>
                        {skill}
                      </small>
                    ))}
                  </div>
                </div>

                <div className="match-score">
                  <strong>{candidate.match}%</strong>
                  <span>Match</span>
                </div>

                <Link
                  to="/industry/candidates"
                  className="small-outline-btn"
                >
                  View
                </Link>

              </div>
            ))}

          </div>

        </section>

        <section className="industry-card">

          <div className="industry-card-header">
            <div>
              <h2>📌 Recruitment Overview</h2>
              <p>Current recruitment activity</p>
            </div>
          </div>

          <div className="recruitment-item">
            <span>Applications Received</span>
            <strong>246</strong>
          </div>

          <div className="recruitment-item">
            <span>Under Review</span>
            <strong>82</strong>
          </div>

          <div className="recruitment-item">
            <span>Shortlisted</span>
            <strong>34</strong>
          </div>

          <div className="recruitment-item">
            <span>Interviews</span>
            <strong>18</strong>
          </div>

          <div className="recruitment-item">
            <span>Selected</span>
            <strong>9</strong>
          </div>

        </section>

      </div>

      <section className="industry-card">

        <div className="industry-card-header">

          <div>
            <h2>📈 Skill Demand Snapshot</h2>
            <p>
              Skills currently in demand across your opportunities
            </p>
          </div>

        </div>

        <div className="skill-demand-list">

          {[
            ["Python", 92],
            ["Machine Learning", 86],
            ["SQL", 78],
            ["React", 71],
            ["Power BI", 62],
          ].map(([skill, value]) => (
            <div className="skill-demand-item" key={skill}>

              <div>
                <strong>{skill}</strong>
                <span>{value}% demand</span>
              </div>

              <div className="demand-bar">
                <div style={{ width: `${value}%` }} />
              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}

export default IndustryDashboard;