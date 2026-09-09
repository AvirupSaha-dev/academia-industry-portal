import { useEffect, useMemo, useState } from "react";
import "./Faculty.css";

const DEFAULT_OPPORTUNITIES = [
  {
    id: 1,
    title: "Industry Internship - AI & ML",
    type: "Faculty Internship",
    company: "Tech Innovations Pvt. Ltd.",
    location: "Kolkata",
    mode: "Hybrid",
    duration: "3 Months",
    deadline: "30 Sep 2026",
    skills: ["AI", "Machine Learning", "Python"],
    description:
      "Work with industry experts on practical AI and machine learning projects.",
  },
  {
    id: 2,
    title: "Advanced Data Analytics Training",
    type: "Industrial Training",
    company: "DataTech Solutions",
    location: "Bangalore",
    mode: "Online",
    duration: "4 Weeks",
    deadline: "10 Oct 2026",
    skills: ["Data Analytics", "SQL", "Power BI"],
    description:
      "Industry-oriented training program focused on modern data analytics.",
  },
  {
    id: 3,
    title: "AI & Emerging Technologies FDP",
    type: "FDP",
    company: "Tech Innovations Pvt. Ltd.",
    location: "Online",
    mode: "Online",
    duration: "5 Days",
    deadline: "18 Sep 2026",
    skills: ["AI", "Cloud", "Emerging Technologies"],
    description:
      "Faculty development program covering AI, cloud and emerging technologies.",
  },
  {
    id: 4,
    title: "Industry Research Collaboration",
    type: "Research",
    company: "Innovate Labs",
    location: "Kolkata",
    mode: "Hybrid",
    duration: "6 Months",
    deadline: "20 Oct 2026",
    skills: ["Research", "AI", "Data Science"],
    description:
      "Collaborative research opportunity for faculty and industry professionals.",
  },
  {
    id: 5,
    title: "Technology Consultancy Program",
    type: "Consultancy",
    company: "NextGen Technologies",
    location: "Remote",
    mode: "Remote",
    duration: "6 Months",
    deadline: "30 Oct 2026",
    skills: ["Software", "Consultancy", "Technology"],
    description:
      "Industry consultancy opportunity for faculty with technical expertise.",
  },
  {
    id: 6,
    title: "Guest Lecture & Industry Workshop",
    type: "Workshop",
    company: "FutureTech",
    location: "Delhi",
    mode: "Hybrid",
    duration: "2 Days",
    deadline: "25 Sep 2026",
    skills: ["Workshop", "Teaching", "Industry Knowledge"],
    description:
      "Conduct and participate in practical industry workshops and guest lectures.",
  },
];

const DEFAULT_APPLICATIONS = [
  {
    id: 101,
    opportunityId: 3,
    title: "AI & Emerging Technologies FDP",
    company: "Tech Innovations Pvt. Ltd.",
    type: "FDP",
    status: "Applied",
    date: "08 Sep 2026",
  },
];

const DEFAULT_PROFILE = {
  name: "Dr. Faculty Member",
  department: "Computer Science & Engineering",
  designation: "Assistant Professor",
  institution: "Academic Institution",
  email: "faculty@example.com",
  phone: "+91 9876543210",
  experience: "6 Years",
  qualification: "Ph.D. / M.Tech",
  specialization: "Artificial Intelligence & Machine Learning",
  skills: "Python, AI, Machine Learning, Data Science, Research",
};

const STATUS_FLOW = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
];

function readLS(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function Faculty({
  onLogout,
  currentPage: parentPage,
  setCurrentPage: parentSetPage,
}) {
  const [currentPage, setCurrentPage] = useState(parentPage || "dashboard");

  const [profile, setProfile] = useState(() =>
    readLS("facultyProfileV1", DEFAULT_PROFILE)
  );

  const [opportunities] = useState(() =>
    readLS("facultyOpportunitiesV1", DEFAULT_OPPORTUNITIES)
  );

  const [applications, setApplications] = useState(() =>
    readLS("facultyApplicationsV1", DEFAULT_APPLICATIONS)
  );

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const [selectedCollaboration, setSelectedCollaboration] = useState(null);

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [toast, setToast] = useState("");

  const [resume, setResume] = useState(() =>
    readLS("facultyResumeV1", null)
  );

  useEffect(() => {
    if (parentPage) {
      setCurrentPage(parentPage);
    }
  }, [parentPage]);

  useEffect(() => {
    localStorage.setItem(
      "facultyProfileV1",
      JSON.stringify(profile)
    );
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(
      "facultyApplicationsV1",
      JSON.stringify(applications)
    );
  }, [applications]);

  useEffect(() => {
    if (resume) {
      localStorage.setItem(
        "facultyResumeV1",
        JSON.stringify(resume)
      );
    }
  }, [resume]);

  const navigate = (page) => {
    setCurrentPage(page);

    if (parentSetPage) {
      parentSetPage(page);
    }

    setSearch("");
    setFilter("All");
  };

  const notify = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =========================
     RESUME UPLOAD
  ========================= */

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      notify("Please upload a PDF resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      notify("Resume must be smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const resumeData = {
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toLocaleString("en-IN"),
        data: reader.result,
      };

      setResume(resumeData);

      notify("Resume uploaded successfully.");
    };

    reader.readAsDataURL(file);
  };

  const removeResume = () => {
    setResume(null);
    localStorage.removeItem("facultyResumeV1");
    notify("Resume removed.");
  };

  const viewResume = () => {
    if (!resume?.data) {
      notify("Please upload a resume first.");
      return;
    }

    const newWindow = window.open();

    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${resume.name}</title>
            <style>
              html,body{
                margin:0;
                width:100%;
                height:100%;
                overflow:hidden;
              }
              iframe{
                width:100%;
                height:100%;
                border:0;
              }
            </style>
          </head>
          <body>
            <iframe src="${resume.data}"></iframe>
          </body>
        </html>
      `);

      newWindow.document.close();
    }
  };

  /* =========================
     APPLICATION
  ========================= */

  const applyOpportunity = (opportunity) => {
    const alreadyApplied = applications.some(
      (item) => item.opportunityId === opportunity.id
    );

    if (alreadyApplied) {
      notify("You have already applied for this opportunity.");
      return;
    }

    const application = {
      id: Date.now(),
      opportunityId: opportunity.id,
      title: opportunity.title,
      company: opportunity.company,
      type: opportunity.type,
      status: "Applied",
      date: new Date().toLocaleDateString("en-IN"),
    };

    setApplications((previous) => [
      application,
      ...previous,
    ]);

    setSelectedOpportunity(null);

    notify("Application submitted successfully.");
  };

  const updateApplicationStatus = (id, status) => {
    setApplications((previous) =>
      previous.map((application) =>
        application.id === id
          ? {
              ...application,
              status,
            }
          : application
      )
    );

    notify(`Application status updated to ${status}.`);
  };

  /* =========================
     SEARCH
  ========================= */

  const filteredOpportunities = useMemo(() => {
    const query = search.toLowerCase().trim();

    return opportunities.filter((opportunity) => {
      const matchesSearch =
        !query ||
        `${opportunity.title}
        ${opportunity.company}
        ${opportunity.type}
        ${opportunity.location}
        ${opportunity.skills.join(" ")}`
          .toLowerCase()
          .includes(query);

      const matchesFilter =
        filter === "All" ||
        opportunity.type === filter;

      return matchesSearch && matchesFilter;
    });
  }, [opportunities, search, filter]);

  const stats = {
    total: applications.length,

    underReview: applications.filter(
      (a) => a.status === "Under Review"
    ).length,

    shortlisted: applications.filter(
      (a) => a.status === "Shortlisted"
    ).length,

    selected: applications.filter(
      (a) => a.status === "Selected"
    ).length,
  };

  /* =========================
     SIDEBAR
  ========================= */

  const Sidebar = () => (
    <aside className="faculty-sidebar">

      <div className="faculty-logo">
        <div className="faculty-logo-icon">
          AI
        </div>

        <div>
          <strong>AcademiaIndustry</strong>
          <small>Faculty Portal</small>
        </div>
      </div>

      <div className="faculty-role">
        FACULTY / ACADEMICIAN
      </div>

      <nav className="faculty-nav">

        {[
          ["dashboard", "📊 Dashboard"],
          ["profile", "👤 My Profile"],
          ["internships", "💼 Faculty Internships"],
          ["industrial-training", "🏭 Industrial Training"],
          ["fdp", "🎓 FDP"],
          ["consultancy", "💡 Consultancy"],
          ["research", "🔬 Research"],
          ["collaboration", "🤝 Collaboration"],
          ["applications", "📄 My Applications"],
        ].map(([page, label]) => (
          <button
            key={page}
            className={
              currentPage === page
                ? "active"
                : ""
            }
            onClick={() => navigate(page)}
          >
            {label}
          </button>
        ))}

      </nav>

      <div className="faculty-sidebar-bottom">

        <div>💡</div>

        <div>
          <strong>Faculty Hub</strong>

          <small>
            Connect with industry opportunities
          </small>
        </div>

      </div>

      <button
        className="faculty-logout"
        onClick={onLogout}
      >
        ↪ Logout
      </button>

    </aside>
  );

  /* =========================
     HEADER
  ========================= */

  const Header = () => (
    <header className="faculty-header">

      <div className="faculty-search">

        🔍

        <input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search opportunities, research, FDP..."
        />

      </div>

      <div className="faculty-header-right">

        <div className="faculty-notification-wrap">

          <button
            className="faculty-notification-btn"
            onClick={() =>
              setNotificationsOpen(
                (value) => !value
              )
            }
          >
            🔔

            <span>3</span>
          </button>

          {notificationsOpen && (
            <div className="faculty-notification-panel">

              <h3>Notifications</h3>

              <p>
                🔔 New FDP opportunity available
              </p>

              <p>
                🔬 Research collaboration invitation
              </p>

              <p>
                📄 Application status updated
              </p>

            </div>
          )}

        </div>

        <div className="faculty-admin">

          <div className="faculty-avatar">
            {profile.name.charAt(0)}
          </div>

          <div>
            <strong>
              {profile.name}
            </strong>

            <small>
              Faculty Account
            </small>
          </div>

        </div>

      </div>

    </header>
  );

  /* =========================
     PAGE TITLE
  ========================= */

  const PageTitle = ({
    tag,
    title,
    description,
    action,
  }) => (
    <div className="faculty-page-header">

      <div>

        <p className="faculty-tag">
          {tag}
        </p>

        <h1>{title}</h1>

        <p>{description}</p>

      </div>

      {action}

    </div>
  );

  /* =========================
     DASHBOARD
  ========================= */

  const Dashboard = () => (
    <div className="faculty-content">

      <PageTitle
        tag="FACULTY PORTAL"
        title="Faculty Dashboard"
        description="Discover industry internships, training, research and collaboration opportunities."
        action={
          <button
            className="faculty-primary-btn"
            onClick={() =>
              navigate("internships")
            }
          >
            Explore Opportunities
          </button>
        }
      />

      <div className="faculty-stats">

        <Stat
          icon="💼"
          title="Available Opportunities"
          value={opportunities.length}
        />

        <Stat
          icon="📄"
          title="My Applications"
          value={stats.total}
        />

        <Stat
          icon="⭐"
          title="Shortlisted"
          value={stats.shortlisted}
        />

        <Stat
          icon="🏆"
          title="Selected"
          value={stats.selected}
        />

      </div>

      <section className="faculty-section">

        <div className="faculty-section-header">

          <div>

            <p className="faculty-tag">
              AI POWERED
            </p>

            <h2>
              Recommended Opportunities
            </h2>

          </div>

          <button
            className="faculty-outline-btn"
            onClick={() =>
              navigate("internships")
            }
          >
            View All
          </button>

        </div>

        <div className="faculty-opportunity-grid">

          {opportunities
            .slice(0, 3)
            .map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onView={() =>
                  setSelectedOpportunity(
                    opportunity
                  )
                }
              />
            ))}

        </div>

      </section>

      <section className="faculty-dashboard-grid">

        <div className="faculty-card">

          <p className="faculty-tag">
            APPLICATIONS
          </p>

          <h2>
            Application Overview
          </h2>

          <div className="faculty-overview-list">

            <div>
              <span>Applied</span>
              <strong>{stats.total}</strong>
            </div>

            <div>
              <span>Under Review</span>
              <strong>
                {stats.underReview}
              </strong>
            </div>

            <div>
              <span>Shortlisted</span>
              <strong>
                {stats.shortlisted}
              </strong>
            </div>

            <div>
              <span>Selected</span>
              <strong>
                {stats.selected}
              </strong>
            </div>

          </div>

        </div>

        <div className="faculty-card">

          <p className="faculty-tag">
            QUICK ACTIONS
          </p>

          <h2>
            Faculty Services
          </h2>

          <div className="faculty-quick-actions">

            <button
              onClick={() =>
                navigate("fdp")
              }
            >
              🎓 Find FDP
            </button>

            <button
              onClick={() =>
                navigate("research")
              }
            >
              🔬 Research Collaboration
            </button>

            <button
              onClick={() =>
                navigate("consultancy")
              }
            >
              💡 Consultancy
            </button>

            <button
              onClick={() =>
                navigate("collaboration")
              }
            >
              🤝 Industry Collaboration
            </button>

          </div>

        </div>

      </section>

    </div>
  );

  /* =========================
     PROFILE
  ========================= */

  const Profile = () => {

    const updateProfile = (e) => {
      setProfile({
        ...profile,
        [e.target.name]:
          e.target.value,
      });
    };

    return (
      <div className="faculty-content">

        <PageTitle
          tag="FACULTY"
          title="My Profile"
          description="Manage your academic profile and professional information."
        />

        <div className="faculty-card">

          <div className="faculty-profile-header">

            <div className="faculty-profile-avatar">
              {profile.name.charAt(0)}
            </div>

            <div>

              <h2>
                {profile.name}
              </h2>

              <p>
                {profile.designation}
              </p>

              <span>
                {profile.department}
              </span>

            </div>

          </div>

          <div className="faculty-form-grid">

            {[
              ["name", "Full Name"],
              ["department", "Department"],
              ["designation", "Designation"],
              ["institution", "Institution"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["experience", "Experience"],
              ["qualification", "Qualification"],
              [
                "specialization",
                "Specialization",
              ],
            ].map(([name, label]) => (
              <div
                className="faculty-field"
                key={name}
              >

                <label>
                  {label}
                </label>

                <input
                  name={name}
                  value={profile[name]}
                  onChange={updateProfile}
                />

              </div>
            ))}

            <div className="faculty-field faculty-full">

              <label>
                Skills
              </label>

              <textarea
                name="skills"
                value={profile.skills}
                onChange={updateProfile}
                rows="4"
              />

            </div>

          </div>

          {/* =========================
              RESUME
          ========================= */}

          <div className="faculty-resume-section">

            <div>

              <p className="faculty-tag">
                DOCUMENT
              </p>

              <h2>
                Resume
              </h2>

              <p>
                Upload your latest resume in PDF format.
              </p>

            </div>

            {!resume ? (
              <label className="faculty-resume-upload">

                <div className="faculty-resume-upload-icon">
                  📄
                </div>

                <strong>
                  Upload Resume
                </strong>

                <span>
                  PDF only · Maximum 5 MB
                </span>

                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={
                    handleResumeUpload
                  }
                />

              </label>
            ) : (
              <div className="faculty-resume-file">

                <div className="faculty-resume-file-icon">
                  📄
                </div>

                <div className="faculty-resume-file-info">

                  <strong>
                    {resume.name}
                  </strong>

                  <small>
                    Uploaded {resume.uploadedAt}
                  </small>

                </div>

                <div className="faculty-resume-actions">

                  <button
                    className="faculty-outline-btn"
                    onClick={viewResume}
                  >
                    View Resume
                  </button>

                  <label className="faculty-outline-btn faculty-upload-again">

                    Replace

                    <input
                      type="file"
                      accept="application/pdf,.pdf"
                      onChange={
                        handleResumeUpload
                      }
                    />

                  </label>

                  <button
                    className="faculty-danger-btn"
                    onClick={removeResume}
                  >
                    Remove
                  </button>

                </div>

              </div>
            )}

          </div>

          <div className="faculty-form-actions">

            <button
              className="faculty-primary-btn"
              onClick={() => {

                localStorage.setItem(
                  "facultyProfileV1",
                  JSON.stringify(profile)
                );

                notify(
                  "Profile saved successfully."
                );

              }}
            >
              Save Profile
            </button>

          </div>

        </div>

      </div>
    );
  };

  /* =========================
     OPPORTUNITY PAGE
  ========================= */

  const OpportunityPage = ({
    title,
    description,
    opportunityType,
  }) => {

    const pageOpportunities =
      opportunities.filter(
        (item) =>
          opportunityType === "All" ||
          item.type === opportunityType
      );

    const displayOpportunities =
      search || filter !== "All"
        ? filteredOpportunities.filter(
            (item) =>
              opportunityType === "All" ||
              item.type === opportunityType
          )
        : pageOpportunities;

    return (
      <div className="faculty-content">

        <PageTitle
          tag="OPPORTUNITIES"
          title={title}
          description={description}
        />

        <div className="faculty-filter-bar">

          {[
            "All",
            "Faculty Internship",
            "Industrial Training",
            "FDP",
            "Consultancy",
            "Research",
            "Workshop",
          ].map((item) => (
            <button
              key={item}
              className={
                filter === item
                  ? "active"
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

        <div className="faculty-opportunity-grid">

          {displayOpportunities.map(
            (opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onView={() =>
                  setSelectedOpportunity(
                    opportunity
                  )
                }
              />
            )
          )}

        </div>

        {!displayOpportunities.length && (
          <EmptyState
            text="No matching opportunities found."
          />
        )}

      </div>
    );
  };

  /* =========================
     APPLICATIONS
  ========================= */

  const Applications = () => (
    <div className="faculty-content">

      <PageTitle
        tag="APPLICATIONS"
        title="My Applications"
        description="Track your faculty opportunities and application progress."
      />

      {applications.length === 0 ? (
        <EmptyState
          text="You have not applied to any opportunity yet."
        />
      ) : (
        <div className="faculty-application-list">

          {applications.map(
            (application) => (
              <div
                className="faculty-application-card"
                key={application.id}
              >

                <div className="faculty-application-info">

                  <span className="faculty-badge">
                    {application.type}
                  </span>

                  <h2>
                    {application.title}
                  </h2>

                  <p>
                    {application.company}
                  </p>

                  <small>
                    Applied on{" "}
                    {application.date}
                  </small>

                </div>

                <div className="faculty-application-status">

                  <span
                    className={`faculty-status ${
                      application.status
                        .toLowerCase()
                        .replaceAll(
                          " ",
                          "-"
                        )
                    }`}
                  >
                    {application.status}
                  </span>

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

                    {[
                      "Applied",
                      "Under Review",
                      "Shortlisted",
                      "Interview",
                      "Selected",
                      "Rejected",
                    ].map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}

                  </select>

                </div>

                <ApplicationStatus
                  status={
                    application.status
                  }
                />

              </div>
            )
          )}

        </div>
      )}

    </div>
  );

  /* =========================
     COLLABORATION
  ========================= */

  const Collaboration = () => {

    const collaborationItems = [
      {
        id: 1,
        icon: "🤝",
        title:
          "Faculty–Industry Collaboration",
        type:
          "Faculty Collaboration",
        company:
          "Tech Innovations Pvt. Ltd.",
        description:
          "Build long-term academic and industry partnerships through joint initiatives, projects and knowledge exchange.",
        participants: "Faculty",
        duration: "6 Months",
        deadline: "30 Sep 2026",
      },

      {
        id: 2,
        icon: "🔬",
        title: "Research Projects",
        type: "Research",
        company: "Innovate Labs",
        description:
          "Work with companies on real-world research problems and develop industry-focused research solutions.",
        participants:
          "Faculty & Researchers",
        duration: "6 Months",
        deadline: "20 Oct 2026",
      },

      {
        id: 3,
        icon: "🎤",
        title: "Guest Lectures",
        type: "Guest Lecture",
        company: "FutureTech",
        description:
          "Connect students and faculty with experienced industry professionals through guest lectures.",
        participants: "Faculty",
        duration: "1-2 Days",
        deadline: "25 Sep 2026",
      },

      {
        id: 4,
        icon: "🏭",
        title: "Industry Visits",
        type: "Industry Visit",
        company:
          "NextGen Technologies",
        description:
          "Organize practical industry exposure and understand real-world technologies, processes and workplace practices.",
        participants:
          "Faculty & Students",
        duration: "2 Days",
        deadline: "05 Oct 2026",
      },

      {
        id: 5,
        icon: "💻",
        title:
          "Live Industry Projects",
        type: "Live Project",
        company:
          "DataTech Solutions",
        description:
          "Collaborate with companies on practical industry projects and solve real business problems.",
        participants:
          "Faculty & Students",
        duration: "3 Months",
        deadline: "15 Oct 2026",
      },

      {
        id: 6,
        icon: "💡",
        title:
          "Innovation Challenges",
        type:
          "Innovation Challenge",
        company:
          "Tech Innovations Pvt. Ltd.",
        description:
          "Participate in industry innovation challenges and develop practical technology-based solutions.",
        participants:
          "Faculty & Students",
        duration: "4 Weeks",
        deadline: "20 Sep 2026",
      },
    ];

    const handleExplore = (item) => {
      setSelectedCollaboration(item);
    };

    const handleParticipate = (item) => {

      setSelectedCollaboration(null);

      notify(
        `You have successfully registered for ${item.title}.`
      );
    };

    return (
      <div className="faculty-content">

        <PageTitle
          tag="ACADEMIA × INDUSTRY"
          title="Collaboration"
          description="Connect with companies for research, projects, lectures and innovation."
        />

        <div className="faculty-collaboration-grid">

          {collaborationItems.map(
            (item) => (
              <div
                className="faculty-collaboration-card"
                key={item.id}
              >

                <div className="faculty-collaboration-icon">
                  {item.icon}
                </div>

                <span className="faculty-badge">
                  {item.type}
                </span>

                <h2>
                  {item.title}
                </h2>

                <p>
                  {item.description}
                </p>

                <div className="faculty-collaboration-company">

                  <strong>
                    {item.company}
                  </strong>

                </div>

                <div className="faculty-collaboration-meta">

                  <span>
                    👥{" "}
                    {item.participants}
                  </span>

                  <span>
                    ⏱{" "}
                    {item.duration}
                  </span>

                  <span>
                    📅{" "}
                    {item.deadline}
                  </span>

                </div>

                <button
                  className="faculty-primary-btn"
                  onClick={() =>
                    handleExplore(item)
                  }
                >
                  View Details
                </button>

              </div>
            )
          )}

        </div>

        {/* =========================
            COLLABORATION MODAL
        ========================= */}

        {selectedCollaboration && (

          <div
            className="faculty-modal-overlay"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                setSelectedCollaboration(
                  null
                );
              }

            }}
          >

            <div className="faculty-modal">

              <button
                className="faculty-modal-close"
                onClick={() =>
                  setSelectedCollaboration(
                    null
                  )
                }
              >
                ×
              </button>

              <span className="faculty-badge">
                {selectedCollaboration.type}
              </span>

              <h2>
                {selectedCollaboration.title}
              </h2>

              <p className="faculty-modal-company">
                {selectedCollaboration.company}
              </p>

              <p>
                {selectedCollaboration.description}
              </p>

              <div className="faculty-modal-details">

                <div>
                  <span>
                    Participants
                  </span>

                  <strong>
                    {
                      selectedCollaboration.participants
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {
                      selectedCollaboration.duration
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Deadline
                  </span>

                  <strong>
                    {
                      selectedCollaboration.deadline
                    }
                  </strong>
                </div>

                <div>
                  <span>
                    Organization
                  </span>

                  <strong>
                    {
                      selectedCollaboration.company
                    }
                  </strong>
                </div>

              </div>

              <h3>
                Collaboration Benefits
              </h3>

              <div className="faculty-collaboration-benefits">

                <div>
                  ✓ Industry Exposure
                </div>

                <div>
                  ✓ Knowledge Sharing
                </div>

                <div>
                  ✓ Professional Networking
                </div>

                <div>
                  ✓ Research & Project Opportunities
                </div>

              </div>

              <div className="faculty-modal-actions">

                <button
                  className="faculty-outline-btn"
                  onClick={() =>
                    setSelectedCollaboration(
                      null
                    )
                  }
                >
                  Close
                </button>

                <button
                  className="faculty-primary-btn"
                  onClick={() =>
                    handleParticipate(
                      selectedCollaboration
                    )
                  }
                >
                  Participate
                </button>

              </div>

            </div>

          </div>

        )}

      </div>
    );
  };

  /* =========================
     PAGE ROUTING
  ========================= */

  const Page = (() => {

    switch (currentPage) {

      case "dashboard":
        return <Dashboard />;

      case "profile":
        return <Profile />;

      case "internships":
        return (
          <OpportunityPage
            title="Faculty Internships"
            description="Find industry internship opportunities for faculty members."
            opportunityType="Faculty Internship"
          />
        );

      case "industrial-training":
        return (
          <OpportunityPage
            title="Industrial Training"
            description="Explore practical industrial training programs."
            opportunityType="Industrial Training"
          />
        );

      case "fdp":
        return (
          <OpportunityPage
            title="Faculty Development Programs"
            description="Discover FDPs and industry-led faculty development programs."
            opportunityType="FDP"
          />
        );

      case "consultancy":
        return (
          <OpportunityPage
            title="Consultancy Opportunities"
            description="Find technology and academic consultancy opportunities."
            opportunityType="Consultancy"
          />
        );

      case "research":
        return (
          <OpportunityPage
            title="Research Collaboration"
            description="Collaborate with industry on research and innovation."
            opportunityType="Research"
          />
        );

      case "collaboration":
        return <Collaboration />;

      case "applications":
        return <Applications />;

      default:
        return <Dashboard />;
    }

  })();

  return (
    <div className="faculty-layout">

      <Sidebar />

      <div className="faculty-main">

        <Header />

        <main>
          {Page}
        </main>

      </div>

      {toast && (
        <div className="faculty-toast">
          ✓ {toast}
        </div>
      )}

      {selectedOpportunity && (
        <OpportunityModal
          opportunity={
            selectedOpportunity
          }
          onClose={() =>
            setSelectedOpportunity(
              null
            )
          }
          onApply={() =>
            applyOpportunity(
              selectedOpportunity
            )
          }
          alreadyApplied={applications.some(
            (item) =>
              item.opportunityId ===
              selectedOpportunity.id
          )}
        />
      )}

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
    <div className="faculty-stat-card">

      <div className="faculty-stat-icon">
        {icon}
      </div>

      <div>

        <p>{title}</p>

        <h2>{value}</h2>

      </div>

    </div>
  );
}

function OpportunityCard({
  opportunity,
  onView,
}) {
  return (
    <div className="faculty-opportunity-card">

      <div className="faculty-opportunity-top">

        <span className="faculty-badge">
          {opportunity.type}
        </span>

        <span className="faculty-ai-match">
          🤖 AI Recommended
        </span>

      </div>

      <h2>
        {opportunity.title}
      </h2>

      <p className="faculty-company">
        {opportunity.company}
      </p>

      <div className="faculty-opportunity-meta">

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

      <div className="faculty-skill-list">

        {opportunity.skills.map(
          (skill) => (
            <span key={skill}>
              {skill}
            </span>
          )
        )}

      </div>

      <div className="faculty-opportunity-footer">

        <div>

          <small>
            Deadline
          </small>

          <strong>
            {opportunity.deadline}
          </strong>

        </div>

        <button
          className="faculty-primary-btn"
          onClick={onView}
        >
          View Details
        </button>

      </div>

    </div>
  );
}

function OpportunityModal({
  opportunity,
  onClose,
  onApply,
  alreadyApplied,
}) {
  return (
    <div
      className="faculty-modal-overlay"
      onMouseDown={(e) => {

        if (
          e.target ===
          e.currentTarget
        ) {
          onClose();
        }

      }}
    >

      <div className="faculty-modal">

        <button
          className="faculty-modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <span className="faculty-badge">
          {opportunity.type}
        </span>

        <h2>
          {opportunity.title}
        </h2>

        <p className="faculty-modal-company">
          {opportunity.company}
        </p>

        <p>
          {opportunity.description}
        </p>

        <div className="faculty-modal-details">

          <div>
            <span>
              Location
            </span>

            <strong>
              {opportunity.location}
            </strong>
          </div>

          <div>
            <span>
              Mode
            </span>

            <strong>
              {opportunity.mode}
            </strong>
          </div>

          <div>
            <span>
              Duration
            </span>

            <strong>
              {opportunity.duration}
            </strong>
          </div>

          <div>
            <span>
              Deadline
            </span>

            <strong>
              {opportunity.deadline}
            </strong>
          </div>

        </div>

        <h3>
          Required Skills
        </h3>

        <div className="faculty-skill-list">

          {opportunity.skills.map(
            (skill) => (
              <span key={skill}>
                {skill}
              </span>
            )
          )}

        </div>

        <div className="faculty-modal-actions">

          <button
            className="faculty-outline-btn"
            onClick={onClose}
          >
            Close
          </button>

          <button
            className="faculty-primary-btn"
            disabled={alreadyApplied}
            onClick={onApply}
          >
            {alreadyApplied
              ? "Already Applied"
              : "Apply Now"}
          </button>

        </div>

      </div>

    </div>
  );
}

function ApplicationStatus({
  status,
}) {
  const currentIndex =
    status === "Rejected"
      ? -1
      : STATUS_FLOW.indexOf(status);

  return (
    <div className="faculty-status-flow">

      {STATUS_FLOW.map(
        (item, index) => {

          const completed =
            currentIndex >= index;

          return (
            <div
              className={`faculty-status-step ${
                completed
                  ? "completed"
                  : ""
              }`}
              key={item}
            >

              <div className="faculty-status-dot">
                {completed
                  ? "✓"
                  : index + 1}
              </div>

              <span>
                {item}
              </span>

              {index <
                STATUS_FLOW.length -
                  1 && (
                <div
                  className={`faculty-status-line ${
                    currentIndex >
                    index
                      ? "completed"
                      : ""
                  }`}
                />
              )}

            </div>
          );
        }
      )}

    </div>
  );
}

function EmptyState({
  text,
}) {
  return (
    <div className="faculty-empty">

      <div>🔎</div>

      <h3>{text}</h3>

      <p>
        Try another search or explore other opportunities.
      </p>

    </div>
  );
}

export default Faculty;