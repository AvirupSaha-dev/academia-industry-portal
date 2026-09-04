import { useState } from "react";

function IndustryApplications() {

  const [applications, setApplications] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      opportunity: "Machine Learning Intern",
      date: "02 Sep 2026",
      match: 94,
      status: "Under Review",
    },
    {
      id: 2,
      name: "Ananya Das",
      opportunity: "Data Analyst",
      date: "01 Sep 2026",
      match: 91,
      status: "Shortlisted",
    },
    {
      id: 3,
      name: "Arjun Roy",
      opportunity: "Frontend Developer",
      date: "30 Aug 2026",
      match: 87,
      status: "Applied",
    },
    {
      id: 4,
      name: "Priya Sen",
      opportunity: "ML Intern",
      date: "28 Aug 2026",
      match: 82,
      status: "Interview",
    },
  ]);

  const updateStatus = (id, status) => {

    setApplications((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );

  };

  return (
    <div className="industry-page">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            RECRUITMENT
          </p>

          <h1>Applications</h1>

          <p>
            Review and manage student applications.
          </p>
        </div>

      </div>

      <div className="industry-card">

        <div className="application-table-wrapper">

          <table className="industry-table">

            <thead>
              <tr>
                <th>Candidate</th>
                <th>Opportunity</th>
                <th>AI Match</th>
                <th>Applied</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {applications.map((application) => (
                <tr key={application.id}>

                  <td>
                    <div className="table-user">
                      <div className="table-avatar">
                        {application.name.charAt(0)}
                      </div>

                      <strong>
                        {application.name}
                      </strong>
                    </div>
                  </td>

                  <td>
                    {application.opportunity}
                  </td>

                  <td>
                    <span className="ai-match">
                      🤖 {application.match}%
                    </span>
                  </td>

                  <td>
                    {application.date}
                  </td>

                  <td>
                    <span
                      className={`application-status ${application.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td>

                    <select
                      className="status-select"
                      value={application.status}
                      onChange={(e) =>
                        updateStatus(
                          application.id,
                          e.target.value
                        )
                      }
                    >
                      <option>Applied</option>
                      <option>Under Review</option>
                      <option>Shortlisted</option>
                      <option>Interview</option>
                      <option>Selected</option>
                      <option>Rejected</option>
                    </select>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default IndustryApplications;