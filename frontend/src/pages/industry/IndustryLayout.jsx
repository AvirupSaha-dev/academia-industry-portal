import { useState } from "react";
import "./Industry.css";

function IndustryLayout({ onLogout }) {

  const [currentPage, setCurrentPage] = useState("dashboard");

  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      title: "Frontend Development Intern",
      type: "Internship",
      skills: ["React", "JavaScript", "CSS"],
      location: "Kolkata",
      mode: "Hybrid",
      duration: "6 Months",
      stipend: "₹15,000/month",
      deadline: "30 Sep 2026",
      applications: 24,
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      type: "Job",
      skills: ["Python", "Machine Learning", "SQL"],
      location: "Bangalore",
      mode: "On-site",
      duration: "Full Time",
      stipend: "₹7-10 LPA",
      deadline: "15 Oct 2026",
      applications: 18,
    },
    {
      id: 3,
      title: "AI Student Analytics",
      type: "Live Project",
      skills: ["Python", "ML", "React"],
      location: "Remote",
      mode: "Remote",
      duration: "3 Months",
      stipend: "Certificate",
      deadline: "25 Sep 2026",
      applications: 12,
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      student: "Rahul Sharma",
      position: "Frontend Development Intern",
      skills: ["React", "JavaScript", "CSS"],
      match: 94,
      status: "Under Review",
    },
    {
      id: 2,
      student: "Priya Das",
      position: "Machine Learning Engineer",
      skills: ["Python", "ML", "TensorFlow"],
      match: 91,
      status: "Shortlisted",
    },
    {
      id: 3,
      student: "Arjun Singh",
      position: "AI Student Analytics",
      skills: ["Python", "React", "SQL"],
      match: 87,
      status: "Applied",
    },
    {
      id: 4,
      student: "Sneha Roy",
      position: "Frontend Development Intern",
      skills: ["React", "HTML", "CSS"],
      match: 84,
      status: "Interview",
    },
  ]);

  const [shortlisted, setShortlisted] = useState([
    {
      id: 1,
      name: "Priya Das",
      role: "Machine Learning Engineer",
      match: 91,
    },
  ]);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handlePostOpportunity = (data) => {

    const newOpportunity = {
      id: Date.now(),
      title: data.title,
      type: data.type,
      skills: data.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      location: data.location,
      mode: data.mode,
      duration: data.duration,
      stipend: data.salary,
      deadline: data.deadline,
      applications: 0,
    };

    setOpportunities([
      newOpportunity,
      ...opportunities,
    ]);

    alert("Opportunity posted successfully!");

    navigate("opportunities");
  };

  const shortlistCandidate = (application) => {

    const already =
      shortlisted.some(
        (item) => item.id === application.id
      );

    if (already) {
      alert("Candidate already shortlisted.");
      return;
    }

    setShortlisted([
      ...shortlisted,
      {
        id: application.id,
        name: application.student,
        role: application.position,
        match: application.match,
      },
    ]);

    setApplications(
      applications.map((app) =>
        app.id === application.id
          ? {
              ...app,
              status: "Shortlisted",
            }
          : app
      )
    );

    alert(
      `${application.student} has been shortlisted.`
    );
  };

  const updateApplicationStatus = (
    id,
    status
  ) => {

    setApplications(
      applications.map((app) =>
        app.id === id
          ? { ...app, status }
          : app
      )
    );
  };


  /* =====================================================
     SIDEBAR
  ===================================================== */

  const Sidebar = () => (

    <aside className="industry-sidebar">

      <div className="industry-logo">
        <div className="industry-logo-icon">
          AI
        </div>

        <div>
          <strong>
            AcademiaIndustry
          </strong>

          <small>
            Industry Portal
          </small>
        </div>
      </div>


      <div className="industry-role">
        INDUSTRY
      </div>


      <nav className="industry-nav">

        <button
          className={
            currentPage === "dashboard"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("dashboard")
          }
        >
          📊 Dashboard
        </button>


        <button
          className={
            currentPage === "profile"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("profile")
          }
        >
          🏢 Company Profile
        </button>


        <button
          className={
            currentPage === "post-opportunity"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("post-opportunity")
          }
        >
          ➕ Post Opportunity
        </button>


        <button
          className={
            currentPage === "opportunities"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("opportunities")
          }
        >
          💼 Opportunities
        </button>


        <button
          className={
            currentPage === "applications"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("applications")
          }
        >
          📄 Applications
        </button>


        <button
          className={
            currentPage === "candidates"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("candidates")
          }
        >
          👥 Candidates
        </button>


        <button
          className={
            currentPage === "shortlist"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("shortlist")
          }
        >
          ⭐ Shortlist
        </button>


        <button
          className={
            currentPage === "training"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("training")
          }
        >
          🎓 Training Programs
        </button>


        <button
          className={
            currentPage === "mentorship"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("mentorship")
          }
        >
          🤝 Mentorship
        </button>


        <button
          className={
            currentPage === "collaboration"
              ? "active"
              : ""
          }
          onClick={() =>
            navigate("collaboration")
          }
        >
          🌐 Collaboration
        </button>

      </nav>


      <div className="industry-sidebar-bottom">

        <div>
          💡
        </div>

        <div>
          <strong>
            Industry Hub
          </strong>

          <small>
            Connect with talented students
          </small>
        </div>

      </div>


      <button
        className="industry-logout"
        onClick={onLogout}
      >
        ↪ Logout
      </button>

    </aside>
  );


  /* =====================================================
     TOP HEADER
  ===================================================== */

  const Header = () => (

    <header className="industry-header">

      <div className="industry-search">
        🔍
        <input
          placeholder="Search students, opportunities..."
        />
      </div>


      <div className="industry-header-right">

        <button className="notification-btn">
          🔔
        </button>

        <div className="industry-admin">

          <div className="admin-avatar">
            IT
          </div>

          <div>
            <strong>
              Industry Admin
            </strong>

            <small>
              Company Account
            </small>
          </div>

        </div>

      </div>

    </header>

  );


  /* =====================================================
     DASHBOARD
  ===================================================== */

  const Dashboard = () => (

    <div className="industry-content">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            INDUSTRY PORTAL
          </p>

          <h1>
            Industry Dashboard
          </h1>

          <p>
            Manage opportunities, candidates
            and industry-academia collaboration.
          </p>
        </div>

        <button
          className="industry-primary-btn"
          onClick={() =>
            navigate("post-opportunity")
          }
        >
          + Post Opportunity
        </button>

      </div>


      <div className="industry-stats">

        <Stat
          icon="🎯"
          title="Active Internships"
          value="12"
        />

        <Stat
          icon="💼"
          title="Active Jobs"
          value="8"
        />

        <Stat
          icon="📄"
          title="Total Applications"
          value={applications.length}
        />

        <Stat
          icon="⭐"
          title="Shortlisted"
          value={shortlisted.length}
        />

        <Stat
          icon="🎤"
          title="Interviews"
          value="6"
        />

        <Stat
          icon="🏆"
          title="Selected"
          value="3"
        />

      </div>


      <section className="industry-section">

        <div className="industry-section-header">

          <div>
            <p className="industry-tag">
              OPPORTUNITIES
            </p>

            <h2>
              Active Opportunities
            </h2>
          </div>

          <button
            className="industry-outline-btn"
            onClick={() =>
              navigate("opportunities")
            }
          >
            View All
          </button>

        </div>


        <div className="industry-card-grid">

          {opportunities
            .slice(0, 3)
            .map((opportunity) => (

              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onView={() =>
                  navigate("opportunities")
                }
              />

            ))}

        </div>

      </section>


      <section className="industry-section">

        <div className="industry-section-header">

          <div>
            <p className="industry-tag">
              AI POWERED
            </p>

            <h2>
              Recommended Candidates
            </h2>
          </div>

          <button
            className="industry-outline-btn"
            onClick={() =>
              navigate("candidates")
            }
          >
            View Candidates
          </button>

        </div>


        <div className="candidate-mini-grid">

          {applications
            .slice(0, 3)
            .map((candidate) => (

              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onShortlist={() =>
                  shortlistCandidate(candidate)
                }
              />

            ))}

        </div>

      </section>

    </div>

  );


  /* =====================================================
     COMPANY PROFILE
  ===================================================== */

  const Profile = () => {

    const [editing, setEditing] =
      useState(false);

    return (

      <div className="industry-content">

        <PageTitle
          tag="COMPANY"
          title="Company Profile"
          description="Manage your company information and profile."
        />


        <div className="industry-profile-card">

          <div className="company-cover">
            <div className="company-big-logo">
              AI
            </div>
          </div>


          <div className="company-profile-body">

            <div className="company-profile-heading">

              <div>
                <h2>
                  Tech Innovations Pvt. Ltd.
                </h2>

                <p>
                  Technology • Software Development
                </p>
              </div>

              <button
                className="industry-primary-btn"
                onClick={() =>
                  setEditing(!editing)
                }
              >
                {editing
                  ? "Save Profile"
                  : "Edit Profile"}
              </button>

            </div>


            <div className="profile-info-grid">

              <Info
                label="Company Email"
                value="hr@techinnovations.com"
              />

              <Info
                label="Website"
                value="www.techinnovations.com"
              />

              <Info
                label="Location"
                value="Kolkata, India"
              />

              <Info
                label="Employees"
                value="100 - 500"
              />

              <Info
                label="Industry"
                value="Information Technology"
              />

              <Info
                label="Founded"
                value="2018"
              />

            </div>


            <div className="company-about">

              <h3>
                About Company
              </h3>

              <p>
                Tech Innovations is a technology
                company focused on building
                innovative software solutions,
                artificial intelligence and
                digital products.
              </p>

            </div>

          </div>

        </div>

      </div>

    );
  };


  /* =====================================================
     POST OPPORTUNITY
  ===================================================== */

  const PostOpportunity = () => {

    const [form, setForm] = useState({
      type: "Internship",
      title: "",
      description: "",
      skills: "",
      qualification: "",
      cgpa: "",
      experience: "",
      location: "",
      mode: "Hybrid",
      duration: "",
      salary: "",
      deadline: "",
    });


    const update = (key, value) => {

      setForm({
        ...form,
        [key]: value,
      });

    };


    const submit = (e) => {

      e.preventDefault();

      if (!form.title || !form.skills) {
        alert(
          "Please enter title and required skills."
        );
        return;
      }

      handlePostOpportunity(form);
    };


    return (

      <div className="industry-content">

        <PageTitle
          tag="CREATE"
          title="Post Opportunity"
          description="Create internships, jobs, projects and training opportunities."
        />


        <form
          className="opportunity-form"
          onSubmit={submit}
        >

          <div className="form-section">

            <h3>
              Opportunity Information
            </h3>

            <div className="form-grid">

              <FormField
                label="Opportunity Type"
              >
                <select
                  value={form.type}
                  onChange={(e) =>
                    update(
                      "type",
                      e.target.value
                    )
                  }
                >
                  <option>
                    Internship
                  </option>

                  <option>
                    Job
                  </option>

                  <option>
                    Apprenticeship
                  </option>

                  <option>
                    Live Project
                  </option>

                  <option>
                    Industrial Training
                  </option>
                </select>
              </FormField>


              <FormField
                label="Title"
              >
                <input
                  value={form.title}
                  onChange={(e) =>
                    update(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Machine Learning Intern"
                />
              </FormField>


              <FormField
                label="Location"
              >
                <input
                  value={form.location}
                  onChange={(e) =>
                    update(
                      "location",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Kolkata"
                />
              </FormField>


              <FormField
                label="Work Mode"
              >
                <select
                  value={form.mode}
                  onChange={(e) =>
                    update(
                      "mode",
                      e.target.value
                    )
                  }
                >
                  <option>
                    Remote
                  </option>

                  <option>
                    Hybrid
                  </option>

                  <option>
                    On-site
                  </option>
                </select>
              </FormField>


              <FormField
                label="Duration"
              >
                <input
                  value={form.duration}
                  onChange={(e) =>
                    update(
                      "duration",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 6 Months"
                />
              </FormField>


              <FormField
                label="Stipend / Salary"
              >
                <input
                  value={form.salary}
                  onChange={(e) =>
                    update(
                      "salary",
                      e.target.value
                    )
                  }
                  placeholder="e.g. ₹20,000/month"
                />
              </FormField>


              <FormField
                label="Minimum Qualification"
              >
                <input
                  value={form.qualification}
                  onChange={(e) =>
                    update(
                      "qualification",
                      e.target.value
                    )
                  }
                  placeholder="e.g. B.Tech CSE"
                />
              </FormField>


              <FormField
                label="Minimum CGPA"
              >
                <input
                  value={form.cgpa}
                  onChange={(e) =>
                    update(
                      "cgpa",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 7.0"
                />
              </FormField>


              <FormField
                label="Experience"
              >
                <input
                  value={form.experience}
                  onChange={(e) =>
                    update(
                      "experience",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Fresher"
                />
              </FormField>


              <FormField
                label="Application Deadline"
              >
                <input
                  type="date"
                  value={form.deadline}
                  onChange={(e) =>
                    update(
                      "deadline",
                      e.target.value
                    )
                  }
                />
              </FormField>

            </div>


            <FormField
              label="Required Skills"
            >
              <input
                value={form.skills}
                onChange={(e) =>
                  update(
                    "skills",
                    e.target.value
                  )
                }
                placeholder="Python, Machine Learning, SQL"
              />

              <small>
                Separate skills using commas.
              </small>
            </FormField>


            <FormField
              label="Description"
            >
              <textarea
                rows="6"
                value={form.description}
                onChange={(e) =>
                  update(
                    "description",
                    e.target.value
                  )
                }
                placeholder="Describe the opportunity..."
              />
            </FormField>

          </div>


          <div className="form-actions">

            <button
              type="button"
              className="industry-outline-btn"
              onClick={() =>
                navigate("dashboard")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="industry-primary-btn"
            >
              Publish Opportunity
            </button>

          </div>

        </form>

      </div>

    );
  };


  /* =====================================================
     OPPORTUNITIES
  ===================================================== */

  const Opportunities = () => {

    const [filter, setFilter] =
      useState("All");

    const filtered =
      filter === "All"
        ? opportunities
        : opportunities.filter(
            (item) =>
              item.type === filter
          );

    return (

      <div className="industry-content">

        <PageTitle
          tag="OPPORTUNITIES"
          title="My Opportunities"
          description="Manage all internships, jobs and projects posted by your company."
        />


        <div className="filter-bar">

          {[
            "All",
            "Internship",
            "Job",
            "Live Project",
          ].map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>

          ))}

        </div>


        <div className="industry-card-grid">

          {filtered.map(
            (opportunity) => (

              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                detailed
              />

            )
          )}

        </div>

      </div>

    );
  };


  /* =====================================================
     APPLICATIONS
  ===================================================== */

  const Applications = () => (

    <div className="industry-content">

      <PageTitle
        tag="RECRUITMENT"
        title="Applications"
        description="Review applications and manage the recruitment lifecycle."
      />


      <div className="application-summary">

        <Summary
          title="Total"
          value={applications.length}
        />

        <Summary
          title="Under Review"
          value={
            applications.filter(
              (a) =>
                a.status ===
                "Under Review"
            ).length
          }
        />

        <Summary
          title="Shortlisted"
          value={
            applications.filter(
              (a) =>
                a.status ===
                "Shortlisted"
            ).length
          }
        />

        <Summary
          title="Interview"
          value={
            applications.filter(
              (a) =>
                a.status ===
                "Interview"
            ).length
          }
        />

      </div>


      <div className="industry-table-wrap">

        <table className="industry-table">

          <thead>

            <tr>

              <th>
                Candidate
              </th>

              <th>
                Position
              </th>

              <th>
                AI Match
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {applications.map(
              (application) => (

                <tr
                  key={
                    application.id
                  }
                >

                  <td>

                    <strong>
                      {application.student}
                    </strong>

                    <small>
                      {application.skills.join(
                        ", "
                      )}
                    </small>

                  </td>

                  <td>
                    {application.position}
                  </td>

                  <td>

                    <span className="match-score">
                      {application.match}%
                    </span>

                  </td>

                  <td>

                    <span
                      className={
                        "status " +
                        application.status
                          .toLowerCase()
                          .replace(
                            " ",
                            "-"
                          )
                      }
                    >
                      {application.status}
                    </span>

                  </td>

                  <td>

                    <select
                      value={
                        application.status
                      }
                      onChange={(e) =>
                        updateApplicationStatus(
                          application.id,
                          e.target.value
                        )
                      }
                    >

                      <option>
                        Applied
                      </option>

                      <option>
                        Under Review
                      </option>

                      <option>
                        Shortlisted
                      </option>

                      <option>
                        Interview
                      </option>

                      <option>
                        Selected
                      </option>

                      <option>
                        Rejected
                      </option>

                    </select>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );


  /* =====================================================
     CANDIDATES
  ===================================================== */

  const Candidates = () => {

    const [search, setSearch] =
      useState("");

    const filtered =
      applications.filter(
        (candidate) =>
          candidate.student
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          candidate.skills.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                )
          )
      );

    return (

      <div className="industry-content">

        <PageTitle
          tag="TALENT"
          title="Candidate Search"
          description="Find students based on skills, CGPA, experience and career interests."
        />


        <div className="candidate-search">

          🔍

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search by name or skill..."
          />

        </div>


        <div className="candidate-grid">

          {filtered.map(
            (candidate) => (

              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onShortlist={() =>
                  shortlistCandidate(
                    candidate
                  )
                }
              />

            )
          )}

        </div>

      </div>

    );
  };


  /* =====================================================
     SHORTLIST
  ===================================================== */

  const Shortlist = () => (

    <div className="industry-content">

      <PageTitle
        tag="HIRING"
        title="Shortlisted Candidates"
        description="Candidates selected for further recruitment stages."
      />


      {shortlisted.length === 0 ? (

        <EmptyState
          text="No candidates shortlisted yet."
        />

      ) : (

        <div className="candidate-grid">

          {shortlisted.map(
            (candidate) => (

              <div
                className="candidate-card"
                key={candidate.id}
              >

                <div className="candidate-avatar">
                  {candidate.name
                    .charAt(0)}
                </div>

                <div className="candidate-main">

                  <h3>
                    {candidate.name}
                  </h3>

                  <p>
                    {candidate.role}
                  </p>

                  <div className="match-large">
                    {candidate.match}%
                    <span>
                      AI Match
                    </span>
                  </div>

                </div>

                <div className="candidate-actions">

                  <button
                    className="industry-outline-btn"
                    onClick={() =>
                      navigate(
                        "candidates"
                      )
                    }
                  >
                    View Profile
                  </button>

                  <button
                    className="industry-primary-btn"
                    onClick={() =>
                      alert(
                        `Interview scheduled with ${candidate.name}`
                      )
                    }
                  >
                    Schedule Interview
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>

  );


  /* =====================================================
     TRAINING
  ===================================================== */

  const Training = () => {

    const programs = [
      {
        title:
          "React & Modern Frontend Development",
        type: "Training",
        participants: 48,
        duration: "6 Weeks",
      },
      {
        title:
          "Machine Learning Career Bootcamp",
        type: "Certification",
        participants: 72,
        duration: "8 Weeks",
      },
      {
        title:
          "AI & Data Science Workshop",
        type: "Workshop",
        participants: 35,
        duration: "3 Days",
      },
    ];

    return (

      <div className="industry-content">

        <PageTitle
          tag="LEARNING"
          title="Training Programs"
          description="Publish courses, certifications, workshops and training programs."
        />


        <div className="industry-card-grid">

          {programs.map(
            (program) => (

              <div
                className="training-card"
                key={program.title}
              >

                <span className="program-badge">
                  {program.type}
                </span>

                <h3>
                  {program.title}
                </h3>

                <p>
                  Industry-focused learning
                  program for students.
                </p>

                <div className="training-info">

                  <span>
                    👥 {program.participants} participants
                  </span>

                  <span>
                    ⏱ {program.duration}
                  </span>

                </div>

                <button
                  className="industry-primary-btn"
                  onClick={() =>
                    alert(
                      "Training program management opened."
                    )
                  }
                >
                  Manage Program
                </button>

              </div>

            )
          )}

        </div>


        <button
          className="industry-primary-btn"
          onClick={() =>
            alert(
              "Create Training Program form opened."
            )
          }
        >
          + Create Training Program
        </button>

      </div>

    );
  };


  /* =====================================================
     MENTORSHIP
  ===================================================== */

  const Mentorship = () => (

    <div className="industry-content">

      <PageTitle
        tag="MENTORSHIP"
        title="Mentorship Programs"
        description="Connect industry professionals with students for mentorship."
      />


      <div className="mentorship-grid">

        <div className="mentorship-card">

          <div className="mentor-icon">
            👨‍💻
          </div>

          <h3>
            Technical Mentorship
          </h3>

          <p>
            Help students improve their
            technical and industry skills.
          </p>

          <div className="mentor-stat">
            24 Active Students
          </div>

          <button
            className="industry-primary-btn"
            onClick={() =>
              alert(
                "Technical mentorship management opened."
              )
            }
          >
            Manage Mentorship
          </button>

        </div>


        <div className="mentorship-card">

          <div className="mentor-icon">
            🎯
          </div>

          <h3>
            Career Mentorship
          </h3>

          <p>
            Guide students towards suitable
            career roles and opportunities.
          </p>

          <div className="mentor-stat">
            18 Active Students
          </div>

          <button
            className="industry-primary-btn"
            onClick={() =>
              alert(
                "Career mentorship management opened."
              )
            }
          >
            Manage Mentorship
          </button>

        </div>


        <div className="mentorship-card">

          <div className="mentor-icon">
            🚀
          </div>

          <h3>
            Project Mentorship
          </h3>

          <p>
            Mentor students working on
            real-world industry projects.
          </p>

          <div className="mentor-stat">
            12 Active Projects
          </div>

          <button
            className="industry-primary-btn"
            onClick={() =>
              alert(
                "Project mentorship management opened."
              )
            }
          >
            Manage Mentorship
          </button>

        </div>

      </div>

    </div>

  );


  /* =====================================================
     COLLABORATION
  ===================================================== */

  const Collaboration = () => (

    <div className="industry-content">

      <PageTitle
        tag="ACADEMIA × INDUSTRY"
        title="Collaboration"
        description="Build partnerships with educational institutions."
      />


      <div className="collaboration-grid">

        <CollaborationCard
          icon="🎤"
          title="Guest Lectures"
          description="Invite industry professionals to interact with students."
          count="8"
        />

        <CollaborationCard
          icon="💡"
          title="Innovation Challenges"
          description="Organize industry problem statements and innovation challenges."
          count="5"
        />

        <CollaborationCard
          icon="🔬"
          title="Research Projects"
          description="Collaborate with faculty on industry-oriented research."
          count="4"
        />

        <CollaborationCard
          icon="🏗️"
          title="Live Industry Projects"
          description="Give students practical exposure through real projects."
          count="11"
        />

        <CollaborationCard
          icon="🤝"
          title="Consultancy"
          description="Develop consultancy and technical collaboration opportunities."
          count="3"
        />

        <CollaborationCard
          icon="🎓"
          title="Faculty Development"
          description="Support faculty internships, FDPs and industrial training."
          count="6"
        />

      </div>

    </div>

  );


  /* =====================================================
     PAGE COMPONENTS
  ===================================================== */

  let Page;

  if (currentPage === "dashboard") {
    Page = Dashboard;
  } else if (currentPage === "profile") {
    Page = Profile;
  } else if (currentPage === "post-opportunity") {
    Page = PostOpportunity;
  } else if (currentPage === "opportunities") {
    Page = Opportunities;
  } else if (currentPage === "applications") {
    Page = Applications;
  } else if (currentPage === "candidates") {
    Page = Candidates;
  } else if (currentPage === "shortlist") {
    Page = Shortlist;
  } else if (currentPage === "training") {
    Page = Training;
  } else if (currentPage === "mentorship") {
    Page = Mentorship;
  } else if (currentPage === "collaboration") {
    Page = Collaboration;
  } else {
    Page = Dashboard;
  }


  return (

    <div className="industry-dashboard">

      <Sidebar />

      <div className="industry-main">

        <Header />

        <main>
          <Page />
        </main>

      </div>

    </div>

  );
}


/* =====================================================
   REUSABLE COMPONENTS
===================================================== */

function Stat({
  icon,
  title,
  value,
}) {

  return (

    <div className="industry-stat-card">

      <div className="stat-icon-box">
        {icon}
      </div>

      <div>
        <p>
          {title}
        </p>

        <h2>
          {value}
        </h2>
      </div>

    </div>

  );
}


function PageTitle({
  tag,
  title,
  description,
}) {

  return (

    <div className="industry-page-header">

      <div>

        <p className="industry-tag">
          {tag}
        </p>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>

      </div>

    </div>

  );
}


function Info({
  label,
  value,
}) {

  return (

    <div className="info-item">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );
}


function FormField({
  label,
  children,
}) {

  return (

    <label className="form-field">

      <span>
        {label}
      </span>

      {children}

    </label>

  );
}


function OpportunityCard({
  opportunity,
  detailed,
}) {

  return (

    <div className="industry-opportunity-card">

      <div className="opportunity-card-top">

        <span className="industry-badge">
          {opportunity.type}
        </span>

        <span>
          ⋮
        </span>

      </div>


      <h3>
        {opportunity.title}
      </h3>


      <p className="company-name">
        Tech Innovations Pvt. Ltd.
      </p>


      <div className="opportunity-meta">

        <span>
          📍 {opportunity.location}
        </span>

        <span>
          💻 {opportunity.mode}
        </span>

        <span>
          ⏱ {opportunity.duration}
        </span>

      </div>


      <div className="skill-list">

        {opportunity.skills.map(
          (skill) => (

            <span key={skill}>
              {skill}
            </span>

          )
        )}

      </div>


      <div className="opportunity-footer">

        <div>
          <small>
            Applications
          </small>

          <strong>
            {opportunity.applications}
          </strong>
        </div>

        <div>
          <small>
            Deadline
          </small>

          <strong>
            {opportunity.deadline ||
              "Not specified"}
          </strong>
        </div>

      </div>


      {detailed && (

        <button
          className="industry-primary-btn full-btn"
          onClick={() =>
            alert(
              `Managing ${opportunity.title}`
            )
          }
        >
          Manage Opportunity
        </button>

      )}

    </div>

  );
}


function CandidateCard({
  candidate,
  onShortlist,
}) {

  return (

    <div className="candidate-card">

      <div className="candidate-avatar">

        {candidate.student
          .charAt(0)}

      </div>


      <div className="candidate-main">

        <h3>
          {candidate.student}
        </h3>

        <p>
          {candidate.position}
        </p>


        <div className="candidate-skills">

          {candidate.skills.map(
            (skill) => (

              <span key={skill}>
                {skill}
              </span>

            )
          )}

        </div>

      </div>


      <div className="candidate-match">

        <strong>
          {candidate.match}%
        </strong>

        <span>
          AI Match
        </span>

      </div>


      <div className="candidate-actions">

        <button
          className="industry-outline-btn"
          onClick={() =>
            alert(
              `Viewing ${candidate.student}'s profile`
            )
          }
        >
          View Profile
        </button>

        <button
          className="industry-primary-btn"
          onClick={onShortlist}
        >
          Shortlist
        </button>

      </div>

    </div>

  );
}


function Summary({
  title,
  value,
}) {

  return (

    <div className="application-summary-card">

      <span>
        {title}
      </span>

      <strong>
        {value}
      </strong>

    </div>

  );
}


function EmptyState({
  text,
}) {

  return (

    <div className="industry-empty">

      <div>
        📭
      </div>

      <h3>
        Nothing here yet
      </h3>

      <p>
        {text}
      </p>

    </div>

  );
}


function CollaborationCard({
  icon,
  title,
  description,
  count,
}) {

  return (

    <div className="collaboration-card">

      <div className="collaboration-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <div className="collaboration-count">
        {count} Active
      </div>

      <button
        className="industry-primary-btn"
        onClick={() =>
          alert(
            `${title} management opened.`
          )
        }
      >
        Explore
      </button>

    </div>

  );
}


export default IndustryLayout;