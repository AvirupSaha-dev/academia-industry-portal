import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function IndustryOpportunities() {

  const defaultOpportunities = [
    {
      id: 1,
      title: "Machine Learning Intern",
      type: "Internship",
      location: "Kolkata",
      mode: "Hybrid",
      duration: "3 Months",
      applications: 42,
      skills: ["Python", "ML", "SQL"],
      status: "Active",
    },
    {
      id: 2,
      title: "Frontend Developer",
      type: "Job",
      location: "Bangalore",
      mode: "Remote",
      duration: "Full Time",
      applications: 67,
      skills: ["React", "JavaScript", "CSS"],
      status: "Active",
    },
  ];

  const [opportunities, setOpportunities] =
    useState(defaultOpportunities);

  useEffect(() => {

    const load = () => {

      const saved =
        JSON.parse(
          localStorage.getItem(
            "industryOpportunities"
          ) || "[]"
        );

      if (saved.length > 0) {
        setOpportunities([
          ...saved,
          ...defaultOpportunities,
        ]);
      }

    };

    load();

    window.addEventListener(
      "opportunitiesUpdated",
      load
    );

    return () => {
      window.removeEventListener(
        "opportunitiesUpdated",
        load
      );
    };

  }, []);

  return (
    <div className="industry-page">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            OPPORTUNITIES
          </p>

          <h1>My Opportunities</h1>

          <p>
            Manage your internships, jobs and
            industry projects.
          </p>
        </div>

        <Link
          to="/industry/post-opportunity"
          className="industry-primary-btn"
        >
          + Post Opportunity
        </Link>

      </div>

      <div className="industry-opportunity-grid">

        {opportunities.map((item) => (
          <div
            className="opportunity-card"
            key={item.id}
          >

            <div className="opportunity-top">

              <span className="opportunity-type">
                {item.type}
              </span>

              <span className="status-active">
                ● Active
              </span>

            </div>

            <h2>{item.title}</h2>

            <div className="opportunity-meta">
              <span>📍 {item.location}</span>
              <span>💻 {item.mode}</span>
              <span>⏱ {item.duration}</span>
            </div>

            <div className="opportunity-skills">

              {item.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}

            </div>

            <div className="opportunity-bottom">

              <strong>
                {item.applications || 0} Applications
              </strong>

              <Link
                to="/industry/applications"
                className="small-outline-btn"
              >
                View Applications
              </Link>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default IndustryOpportunities;