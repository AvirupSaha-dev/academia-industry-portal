import { useEffect, useMemo, useState } from "react";
import "./Industry.css";

/* =========================================================
   DEFAULT DATA
========================================================= */

const DEFAULT_OPPORTUNITIES = [
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
    status: "Active",
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
    status: "Active",
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
    status: "Active",
  },
];

const DEFAULT_APPLICATIONS = [
  {
    id: 1,
    student: "Rahul Sharma",
    position: "Frontend Development Intern",
    skills: ["React", "JavaScript", "CSS"],
    match: 94,
    status: "Under Review",
    cgpa: "8.7",
    qualification: "B.Tech CSE",
    location: "Kolkata",
    experience: "2 Projects",
    certifications: "React Certification",
  },
  {
    id: 2,
    student: "Priya Das",
    position: "Machine Learning Engineer",
    skills: ["Python", "ML", "TensorFlow"],
    match: 91,
    status: "Shortlisted",
    cgpa: "9.1",
    qualification: "B.Tech CSE",
    location: "Delhi",
    experience: "1 Internship",
    certifications: "AWS, Python",
  },
  {
    id: 3,
    student: "Arjun Singh",
    position: "AI Student Analytics",
    skills: ["Python", "React", "SQL"],
    match: 87,
    status: "Applied",
    cgpa: "8.3",
    qualification: "B.Tech IT",
    location: "Kolkata",
    experience: "3 Projects",
    certifications: "SQL",
  },
  {
    id: 4,
    student: "Sneha Roy",
    position: "Frontend Development Intern",
    skills: ["React", "HTML", "CSS"],
    match: 84,
    status: "Interview",
    cgpa: "8.8",
    qualification: "MCA",
    location: "Bangalore",
    experience: "1 Project",
    certifications: "Frontend",
  },
  {
    id: 5,
    student: "Ananya Das",
    position: "Data Analyst",
    skills: ["Python", "Power BI", "SQL"],
    match: 89,
    status: "Applied",
    cgpa: "9.0",
    qualification: "B.Tech CSE",
    location: "Delhi",
    experience: "1 Internship",
    certifications: "Power BI",
  },
];

const DEFAULT_PROGRAMS = [
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
];

const DEFAULT_MENTORSHIPS = [
  {
    id: 1,
    title: "Technical Mentorship",
    description: "Improve technical and industry skills.",
    participants: 24,
    status: "Active",
    mentor: "Industry Technical Team",
  },
  {
    id: 2,
    title: "Career Mentorship",
    description: "Guide students towards suitable career roles.",
    participants: 18,
    status: "Active",
    mentor: "Industry Career Team",
  },
  {
    id: 3,
    title: "Project Mentorship",
    description: "Mentor students on real-world projects.",
    participants: 12,
    status: "Active",
    mentor: "Industry Project Team",
  },
];

const DEFAULT_COLLABORATIONS = [
  {
    id: 1,
    title: "AI Innovation Challenge",
    type: "Innovation Challenge",
    participants: "Students",
    deadline: "20 Sep 2026",
    description:
      "Solve a real industry problem using AI and data-driven solutions.",
    interested: 0,
    status: "Open",
  },
  {
    id: 2,
    title: "Industry Guest Lecture",
    type: "Guest Lecture",
    participants: "Students & Faculty",
    deadline: "25 Sep 2026",
    description:
      "Industry experts share practical knowledge and career insights.",
    interested: 0,
    status: "Open",
  },
  {
    id: 3,
    title: "Live Data Science Project",
    type: "Live Project",
    participants: "Students",
    deadline: "30 Sep 2026",
    description:
      "Work with an industry dataset under professional guidance.",
    interested: 0,
    status: "Open",
  },
  {
    id: 4,
    title: "Research Collaboration",
    type: "Research",
    participants: "Faculty",
    deadline: "10 Oct 2026",
    description:
      "Collaborate with faculty on applied research and innovation.",
    interested: 0,
    status: "Open",
  },
  {
    id: 5,
    title: "Faculty Industry Workshop",
    type: "Workshop",
    participants: "Faculty",
    deadline: "18 Oct 2026",
    description:
      "Hands-on industry workshop for faculty development.",
    interested: 0,
    status: "Open",
  },
];

const STATUS_OPTIONS = [
  "Applied",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

/* =========================================================
   HELPERS
========================================================= */

function readLS(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.error("Unable to save data");
  }
}

function isDeadlinePassed(deadline) {
  if (!deadline) return false;

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    const parsed = new Date(
      deadline.replace(/(\d{1,2}) (\w{3}) (\d{4})/, "$2 $1, $3")
    );

    if (Number.isNaN(parsed.getTime())) return false;

    return parsed.getTime() < Date.now();
  }

  return date.getTime() < Date.now();
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function IndustryLayout({
  onLogout,
  currentPage: parentPage,
  setCurrentPage: parentSetPage,
}) {
  const [currentPage, setCurrentPageLocal] = useState(
    parentPage || "dashboard"
  );

  const [opportunities, setOpportunities] = useState(() =>
    readLS("industryOpportunitiesV2", DEFAULT_OPPORTUNITIES)
  );

  const [applications, setApplications] = useState(() =>
    readLS("industryApplicationsV2", DEFAULT_APPLICATIONS)
  );

  const [shortlisted, setShortlisted] = useState(() =>
    readLS(
      "industryShortlistV2",
      DEFAULT_APPLICATIONS.filter((a) => a.status === "Shortlisted")
    )
  );

  const [programs, setPrograms] = useState(() =>
    readLS("industryProgramsV2", DEFAULT_PROGRAMS)
  );

  const [mentorships, setMentorships] = useState(() =>
    readLS("industryMentorshipsV2", DEFAULT_MENTORSHIPS)
  );

  const [collaborations, setCollaborations] = useState(() =>
    readLS("industryCollaborationsV2", DEFAULT_COLLABORATIONS)
  );

  const [participating, setParticipating] = useState(() =>
    readLS("industryParticipatingV2", [])
  );

  const [search, setSearch] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCollaboration, setSelectedCollaboration] = useState(null);

  const [toast, setToast] = useState("");

  /* =========================================================
     SAVE TO LOCAL STORAGE
  ========================================================= */

  useEffect(() => {
    saveLS("industryOpportunitiesV2", opportunities);
  }, [opportunities]);

  useEffect(() => {
    saveLS("industryApplicationsV2", applications);
  }, [applications]);

  useEffect(() => {
    saveLS("industryShortlistV2", shortlisted);
  }, [shortlisted]);

  useEffect(() => {
    saveLS("industryProgramsV2", programs);
  }, [programs]);

  useEffect(() => {
    saveLS("industryMentorshipsV2", mentorships);
  }, [mentorships]);

  useEffect(() => {
    saveLS("industryCollaborationsV2", collaborations);
  }, [collaborations]);

  useEffect(() => {
    saveLS("industryParticipatingV2", participating);
  }, [participating]);

  useEffect(() => {
    if (parentPage) {
      setCurrentPageLocal(parentPage);
    }
  }, [parentPage]);

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navigate = (page) => {
    setCurrentPageLocal(page);
    parentSetPage?.(page);
    setSearch("");
  };

  const notify = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  /* =========================================================
     STATS
  ========================================================= */

  const stats = useMemo(
    () => ({
      internships: opportunities.filter(
        (o) => o.type === "Internship" && o.status !== "Closed"
      ).length,

      jobs: opportunities.filter(
        (o) => o.type === "Job" && o.status !== "Closed"
      ).length,

      applications: applications.length,

      shortlisted: applications.filter(
        (a) => a.status === "Shortlisted"
      ).length,

      interviews: applications.filter(
        (a) => a.status === "Interview"
      ).length,

      selected: applications.filter(
        (a) => a.status === "Selected"
      ).length,
    }),
    [opportunities, applications]
  );

  /* =========================================================
     SHORTLIST
  ========================================================= */

  const shortlistCandidate = (candidate) => {
    if (shortlisted.some((x) => x.id === candidate.id)) {
      return notify("Candidate is already shortlisted.");
    }

    const next = {
      ...candidate,
      status: "Shortlisted",
    };

    setShortlisted((prev) => [next, ...prev]);

    setApplications((prev) =>
      prev.map((a) =>
        a.id === candidate.id
          ? { ...a, status: "Shortlisted" }
          : a
      )
    );

    notify(`${candidate.student} shortlisted successfully.`);
  };

  /* =========================================================
     APPLICATION STATUS
  ========================================================= */

  const updateApplicationStatus = (id, status) => {
    const candidate = applications.find((a) => a.id === id);

    setApplications((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status }
          : a
      )
    );

    if (status === "Shortlisted" && candidate) {
      if (!shortlisted.some((x) => x.id === id)) {
        setShortlisted((prev) => [
          { ...candidate, status },
          ...prev,
        ]);
      }
    }

    if (status !== "Shortlisted") {
      setShortlisted((prev) =>
        prev.filter((x) => x.id !== id)
      );
    }

    notify(`Application status updated to ${status}.`);
  };

  /* =========================================================
     OPPORTUNITY
  ========================================================= */

  const publishOpportunity = (form) => {
    const opportunity = {
      id: Date.now(),
      title: form.title,
      type: form.type,
      description: form.description,
      skills: form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      qualification: form.qualification,
      cgpa: form.cgpa,
      experience: form.experience,
      location: form.location,
      mode: form.mode,
      duration: form.duration,
      stipend: form.salary,
      deadline: form.deadline,
      applications: 0,
      status: "Active",
    };

    setOpportunities((prev) => [
      opportunity,
      ...prev,
    ]);

    notify("Opportunity published successfully.");

    navigate("opportunities");
  };

  /* =========================================================
     TRAINING PROGRAM
  ========================================================= */

  const createTrainingProgram = (form) => {
    if (!form.title.trim()) {
      notify("Program title is required.");
      return false;
    }

    const program = {
      id: Date.now(),
      title: form.title.trim(),
      type: form.type,
      duration: form.duration || "4 Weeks",
      participants: 0,
      status: form.status || "Upcoming",
    };

    setPrograms((prev) => [
      program,
      ...prev,
    ]);

    notify("Training program created successfully.");

    return true;
  };

  const deleteTrainingProgram = (id) => {
    setPrograms((prev) =>
      prev.filter((p) => p.id !== id)
    );

    notify("Training program deleted.");
  };

  /* =========================================================
     MENTORSHIP
  ========================================================= */

  const createMentorship = (form) => {
    if (!form.title.trim()) {
      notify("Mentorship title is required.");
      return false;
    }

    const mentorship = {
      id: Date.now(),
      title: form.title.trim(),
      description:
        form.description.trim() ||
        "Industry professionals will mentor students.",
      participants: 0,
      status: "Active",
      mentor:
        form.mentor.trim() ||
        "Industry Professional",
    };

    setMentorships((prev) => [
      mentorship,
      ...prev,
    ]);

    notify("Mentorship created successfully.");

    return true;
  };

  const deleteMentorship = (id) => {
    setMentorships((prev) =>
      prev.filter((m) => m.id !== id)
    );

    notify("Mentorship deleted.");
  };

  /* =========================================================
     COLLABORATION
  ========================================================= */

  const createCollaboration = (form) => {
    if (!form.title.trim()) {
      notify("Collaboration title is required.");
      return false;
    }

    if (!form.description.trim()) {
      notify("Description is required.");
      return false;
    }

    if (!form.deadline) {
      notify("Deadline is required.");
      return false;
    }

    const formattedDeadline = new Date(
      `${form.deadline}T23:59:59`
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const collaboration = {
      id: Date.now(),
      title: form.title.trim(),
      type: form.type,
      participants: form.participants,
      deadline: formattedDeadline,
      description: form.description.trim(),
      interested: 0,
      status: "Open",
    };

    setCollaborations((prev) => [
      collaboration,
      ...prev,
    ]);

    notify("Collaboration created successfully.");

    return true;
  };

  const participateInCollaboration = (collaboration) => {
    const alreadyParticipating = participating.includes(
      collaboration.id
    );

    if (alreadyParticipating) {
      setParticipating((prev) =>
        prev.filter((id) => id !== collaboration.id)
      );

      setCollaborations((prev) =>
        prev.map((c) =>
          c.id === collaboration.id
            ? {
                ...c,
                interested: Math.max(
                  0,
                  (c.interested || 0) - 1
                ),
              }
            : c
        )
      );

      notify("Participation withdrawn.");

      return;
    }

    if (isDeadlinePassed(collaboration.deadline)) {
      notify("This collaboration deadline has passed.");
      return;
    }

    setParticipating((prev) => [
      ...prev,
      collaboration.id,
    ]);

    setCollaborations((prev) =>
      prev.map((c) =>
        c.id === collaboration.id
          ? {
              ...c,
              interested: (c.interested || 0) + 1,
            }
          : c
      )
    );

    notify("Participation recorded successfully.");
  };

  const deleteCollaboration = (id) => {
    setCollaborations((prev) =>
      prev.filter((c) => c.id !== id)
    );

    setParticipating((prev) =>
      prev.filter((x) => x !== id)
    );

    if (selectedCollaboration?.id === id) {
      setSelectedCollaboration(null);
    }

    notify("Collaboration deleted.");
  };

  /* =========================================================
     GLOBAL SEARCH
  ========================================================= */

  const globalResults = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return [];

    const opp = opportunities
      .filter((o) =>
        `${o.title} ${o.type} ${o.location} ${o.skills.join(
          " "
        )}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 4);

    const cand = applications
      .filter((a) =>
        `${a.student} ${a.position} ${a.skills.join(" ")}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 4);

    const collab = collaborations
      .filter((c) =>
        `${c.title} ${c.type} ${c.description}`
          .toLowerCase()
          .includes(q)
      )
      .slice(0, 2);

    return [
      ...opp.map((x) => ({
        type: "Opportunity",
        title: x.title,
        subtitle: `${x.type} • ${x.location}`,
        page: "opportunities",
      })),

      ...cand.map((x) => ({
        type: "Candidate",
        title: x.student,
        subtitle: `${x.position} • ${x.match}% AI Match`,
        page: "candidates",
      })),

      ...collab.map((x) => ({
        type: "Collaboration",
        title: x.title,
        subtitle: `${x.type} • ${x.participants}`,
        page: "collaboration",
      })),
    ].slice(0, 8);
  }, [
    search,
    opportunities,
    applications,
    collaborations,
  ]);

  /* =========================================================
     SIDEBAR
  ========================================================= */

  const Sidebar = () => (
    <aside className="industry-sidebar">
      <div className="industry-logo">
        <div className="industry-logo-icon">
          AI
        </div>

        <div>
          <strong>AcademiaIndustry</strong>
          <small>Industry Portal</small>
        </div>
      </div>

      <div className="industry-role">
        INDUSTRY
      </div>

      <nav className="industry-nav">
        {[
          ["dashboard", "📊 Dashboard"],
          ["profile", "🏢 Company Profile"],
          ["post-opportunity", "➕ Post Opportunity"],
          ["opportunities", "💼 Opportunities"],
          ["applications", "📄 Applications"],
          ["candidates", "👥 Candidates"],
          ["shortlist", "⭐ Shortlist"],
          ["training", "🎓 Training Programs"],
          ["mentorship", "🤝 Mentorship"],
          ["collaboration", "🌐 Collaboration"],
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

      <div className="industry-sidebar-bottom">
        <div>💡</div>

        <div>
          <strong>Industry Hub</strong>
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

  /* =========================================================
     HEADER
  ========================================================= */

  const Header = () => (
    <header className="industry-header">
      <div className="industry-search-wrap">
        <div className="industry-search">
          🔍
          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search students, opportunities..."
          />
        </div>

        {search && (
          <div className="global-search-results">
            {globalResults.length ? (
              globalResults.map((r, i) => (
                <button
                  key={i}
                  onClick={() =>
                    navigate(r.page)
                  }
                >
                  <span>{r.type}</span>
                  <strong>{r.title}</strong>
                  <small>{r.subtitle}</small>
                </button>
              ))
            ) : (
              <div className="search-empty">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      <div className="industry-header-right">
        <div className="notification-wrap">
          <button
            className="notification-btn"
            onClick={() =>
              setNotificationsOpen(
                (v) => !v
              )
            }
          >
            🔔
            <i>3</i>
          </button>

          {notificationsOpen && (
            <div className="notification-panel">
              <h3>Notifications</h3>

              <p>
                🔔 New candidate matched your
                ML role
              </p>

              <p>
                ⭐ 2 candidates are ready for
                shortlist
              </p>

              <p>
                📄 New application received
              </p>
            </div>
          )}
        </div>

        <div className="industry-admin">
          <div className="admin-avatar">
            IT
          </div>

          <div>
            <strong>Industry Admin</strong>
            <small>Company Account</small>
          </div>
        </div>
      </div>
    </header>
  );

  /* =========================================================
     PAGE TITLE
  ========================================================= */

  const PageTitle = ({
    tag,
    title,
    description,
    action,
  }) => (
    <div className="industry-page-header">
      <div>
        <p className="industry-tag">
          {tag}
        </p>

        <h1>{title}</h1>

        <p>{description}</p>
      </div>

      {action}
    </div>
  );

  /* =========================================================
     DASHBOARD
  ========================================================= */

  const Dashboard = () => (
    <div className="industry-content">
      <PageTitle
        tag="INDUSTRY PORTAL"
        title="Industry Dashboard"
        description="Manage opportunities, candidates, recruitment and industry-academia collaboration."
        action={
          <button
            className="industry-primary-btn"
            onClick={() =>
              navigate("post-opportunity")
            }
          >
            + Post Opportunity
          </button>
        }
      />

      <div className="industry-stats">
        {[
          [
            "🎯",
            "Active Internships",
            stats.internships,
          ],
          [
            "💼",
            "Active Jobs",
            stats.jobs,
          ],
          [
            "📄",
            "Total Applications",
            stats.applications,
          ],
          [
            "⭐",
            "Shortlisted",
            stats.shortlisted,
          ],
          [
            "🎤",
            "Interviews",
            stats.interviews,
          ],
          [
            "🏆",
            "Selected",
            stats.selected,
          ],
        ].map((x) => (
          <Stat
            key={x[1]}
            icon={x[0]}
            title={x[1]}
            value={x[2]}
          />
        ))}
      </div>

      <section className="industry-section">
        <div className="industry-section-header">
          <div>
            <p className="industry-tag">
              OPPORTUNITIES
            </p>

            <h2>Active Opportunities</h2>
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
            .map((o) => (
              <OpportunityCard
                key={o.id}
                opportunity={o}
                onManage={() =>
                  navigate(
                    "opportunities"
                  )
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
          {[...applications]
            .sort(
              (a, b) =>
                b.match - a.match
            )
            .slice(0, 3)
            .map((c) => (
              <CandidateCard
                key={c.id}
                candidate={c}
                onView={() =>
                  setSelectedCandidate(c)
                }
                onShortlist={() =>
                  shortlistCandidate(c)
                }
              />
            ))}
        </div>
      </section>

      <section className="industry-card">
        <div className="industry-section-header">
          <div>
            <p className="industry-tag">
              SKILL DEMAND
            </p>

            <h2>
              Industry Skill Demand
              Snapshot
            </h2>
          </div>
        </div>

        {[
          ["Python", 92, 84],
          ["SQL", 85, 68],
          ["Cloud", 88, 42],
          ["Power BI", 76, 31],
        ].map(([s, d, a]) => (
          <div
            className="skill-demand-row"
            key={s}
          >
            <strong>{s}</strong>

            <div>
              <span>
                Industry Demand
              </span>

              <div className="demand-bar">
                <i
                  style={{
                    width: `${d}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <span>
                Student Availability
              </span>

              <div className="demand-bar">
                <i
                  style={{
                    width: `${a}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );

  /* =========================================================
     PROFILE
  ========================================================= */

  const Profile = () => {
    const [profile, setProfile] =
      useState(() =>
        readLS(
          "industryProfileV2",
          {
            companyName:
              "Tech Innovations Pvt. Ltd.",
            industry:
              "Information Technology",
            email:
              "hr@techinnovations.com",
            phone:
              "+91 9876543210",
            website:
              "www.techinnovations.com",
            location:
              "Kolkata, India",
            employees:
              "100 - 500",
            founded: "2018",
            description:
              "Technology company focused on AI, software development and digital products.",
          }
        )
      );

    const update = (e) => {
      setProfile({
        ...profile,
        [e.target.name]:
          e.target.value,
      });
    };

    return (
      <div className="industry-content">
        <PageTitle
          tag="COMPANY"
          title="Company Profile"
          description="Manage your company information and industry presence."
        />

        <div className="industry-card">
          <div className="profile-company-header">
            <div className="company-logo">
              {profile.companyName.charAt(
                0
              )}
            </div>

            <div>
              <h2>
                {profile.companyName}
              </h2>

              <p>{profile.industry}</p>
            </div>
          </div>

          <div className="industry-form-grid">
            {[
              [
                "companyName",
                "Company Name",
              ],
              [
                "industry",
                "Industry",
              ],
              [
                "email",
                "Company Email",
              ],
              [
                "phone",
                "Phone",
              ],
              [
                "website",
                "Website",
              ],
              [
                "location",
                "Location",
              ],
              [
                "employees",
                "Employees",
              ],
              [
                "founded",
                "Founded",
              ],
            ].map(([name, label]) => (
              <div
                className="industry-field"
                key={name}
              >
                <label>{label}</label>

                <input
                  name={name}
                  value={
                    profile[name]
                  }
                  onChange={update}
                />
              </div>
            ))}

            <div className="industry-field full">
              <label>
                Company Description
              </label>

              <textarea
                name="description"
                value={
                  profile.description
                }
                onChange={update}
                rows="5"
              />
            </div>
          </div>

          <div className="industry-form-actions">
            <button
              className="industry-primary-btn"
              onClick={() => {
                saveLS(
                  "industryProfileV2",
                  profile
                );

                notify(
                  "Company profile saved."
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

  /* =========================================================
     POST OPPORTUNITY
  ========================================================= */

  const PostOpportunity = () => {
    const [form, setForm] =
      useState({
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

    const update = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

    return (
      <div className="industry-content">
        <PageTitle
          tag="CREATE"
          title="Post Opportunity"
          description="Create internships, jobs, apprenticeships, live projects and industrial training."
        />

        <form
          className="industry-card"
          onSubmit={(e) => {
            e.preventDefault();

            if (
              !form.title ||
              !form.skills
            ) {
              return notify(
                "Title and required skills are required."
              );
            }

            publishOpportunity(form);
          }}
        >
          <div className="industry-section-heading">
            <h2>
              Opportunity Information
            </h2>

            <p>
              Provide complete details so
              AI can match suitable
              candidates.
            </p>
          </div>

          <div className="industry-form-grid">
            {[
              [
                "type",
                "Opportunity Type",
              ],
              ["title", "Title"],
              [
                "qualification",
                "Minimum Qualification",
              ],
              [
                "cgpa",
                "Minimum CGPA",
              ],
              [
                "experience",
                "Experience",
              ],
              [
                "location",
                "Location",
              ],
              [
                "mode",
                "Work Mode",
              ],
              [
                "duration",
                "Duration",
              ],
              [
                "salary",
                "Stipend / Salary",
              ],
              [
                "deadline",
                "Application Deadline",
              ],
            ].map(
              ([name, label]) => (
                <div
                  className="industry-field"
                  key={name}
                >
                  <label>{label}</label>

                  {name === "type" ? (
                    <select
                      name={name}
                      value={
                        form[name]
                      }
                      onChange={update}
                    >
                      {[
                        "Internship",
                        "Job",
                        "Apprenticeship",
                        "Live Project",
                        "Industrial Training",
                      ].map((x) => (
                        <option
                          key={x}
                        >
                          {x}
                        </option>
                      ))}
                    </select>
                  ) : name === "mode" ? (
                    <select
                      name={name}
                      value={
                        form[name]
                      }
                      onChange={update}
                    >
                      {[
                        "Remote",
                        "Hybrid",
                        "On-site",
                      ].map((x) => (
                        <option
                          key={x}
                        >
                          {x}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={name}
                      type={
                        name ===
                        "deadline"
                          ? "date"
                          : "text"
                      }
                      value={
                        form[name]
                      }
                      onChange={update}
                      placeholder={
                        label
                      }
                    />
                  )}
                </div>
              )
            )}

            <div className="industry-field full">
              <label>
                Required Skills *
              </label>

              <input
                name="skills"
                value={form.skills}
                onChange={update}
                placeholder="Python, SQL, Machine Learning, Power BI"
              />

              <small>
                Separate skills using
                commas.
              </small>
            </div>

            <div className="industry-field full">
              <label>
                Description *
              </label>

              <textarea
                name="description"
                rows="6"
                value={
                  form.description
                }
                onChange={update}
                placeholder="Describe the opportunity..."
                required
              />
            </div>
          </div>

          <div className="industry-form-actions">
            <button
              type="button"
              className="industry-outline-btn"
              onClick={() =>
                navigate("dashboard")
              }
            >
              Cancel
            </button>

            <button className="industry-primary-btn">
              Publish Opportunity
            </button>
          </div>
        </form>
      </div>
    );
  };

  /* =========================================================
     OPPORTUNITIES
  ========================================================= */

  const Opportunities = () => {
    const [filter, setFilter] =
      useState("All");

    const filtered =
      filter === "All"
        ? opportunities
        : opportunities.filter(
            (o) =>
              o.type === filter
          );

    return (
      <div className="industry-content">
        <PageTitle
          tag="OPPORTUNITIES"
          title="My Opportunities"
          description="Manage internships, jobs, projects and industrial training."
          action={
            <button
              className="industry-primary-btn"
              onClick={() =>
                navigate(
                  "post-opportunity"
                )
              }
            >
              + Post Opportunity
            </button>
          }
        />

        <div className="filter-bar">
          {[
            "All",
            "Internship",
            "Job",
            "Apprenticeship",
            "Live Project",
            "Industrial Training",
          ].map((x) => (
            <button
              key={x}
              className={
                filter === x
                  ? "filter-active"
                  : ""
              }
              onClick={() =>
                setFilter(x)
              }
            >
              {x}
            </button>
          ))}
        </div>

        <div className="industry-opportunity-grid">
          {filtered.map((o) => (
            <OpportunityCard
              key={o.id}
              opportunity={o}
              detailed
              onManage={() =>
                notify(
                  `Managing ${o.title}`
                )
              }
            />
          ))}
        </div>

        {!filtered.length && (
          <EmptyState text="No opportunities found." />
        )}
      </div>
    );
  };

  /* =========================================================
     APPLICATIONS
  ========================================================= */

  const Applications = () => (
    <div className="industry-content">
      <PageTitle
        tag="RECRUITMENT"
        title="Applications"
        description="Review applications and manage the complete recruitment lifecycle."
      />

      <div className="application-summary">
        {[
          [
            "Total",
            applications.length,
          ],
          [
            "Under Review",
            applications.filter(
              (a) =>
                a.status ===
                "Under Review"
            ).length,
          ],
          [
            "Shortlisted",
            stats.shortlisted,
          ],
          [
            "Interview",
            stats.interviews,
          ],
          [
            "Selected",
            stats.selected,
          ],
        ].map((x) => (
          <Summary
            key={x[0]}
            title={x[0]}
            value={x[1]}
          />
        ))}
      </div>

      <div className="industry-table-wrap">
        <table className="industry-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Position</th>
              <th>AI Match</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((a) => (
              <tr key={a.id}>
                <td>
                  <div className="table-user">
                    <div className="table-avatar">
                      {a.student.charAt(
                        0
                      )}
                    </div>

                    <div>
                      <strong>
                        {a.student}
                      </strong>

                      <small>
                        {a.qualification} •
                        CGPA {a.cgpa}
                      </small>
                    </div>
                  </div>
                </td>

                <td>{a.position}</td>

                <td>
                  <span className="ai-match">
                    🤖 {a.match}%
                  </span>
                </td>

                <td>
                  <span
                    className={`application-status ${a.status
                      .toLowerCase()
                      .replaceAll(
                        " ",
                        "-"
                      )}`}
                  >
                    {a.status}
                  </span>
                </td>

                <td>
                  <select
                    value={a.status}
                    onChange={(e) =>
                      updateApplicationStatus(
                        a.id,
                        e.target.value
                      )
                    }
                  >
                    {STATUS_OPTIONS.map(
                      (s) => (
                        <option
                          key={s}
                        >
                          {s}
                        </option>
                      )
                    )}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* =========================================================
     CANDIDATES
  ========================================================= */

  const Candidates = () => {
    const [q, setQ] =
      useState("");

    const [minCgpa, setMinCgpa] =
      useState("");

    const [qualification, setQualification] =
      useState("All");

    const [location, setLocation] =
      useState("All");

    const filtered =
      applications.filter((a) => {
        const text =
          `${a.student} ${a.position} ${a.skills.join(
            " "
          )} ${a.experience} ${a.certifications}`.toLowerCase();

        const cgpa =
          !minCgpa ||
          Number(a.cgpa) >=
            Number(minCgpa);

        const qual =
          qualification === "All" ||
          a.qualification.includes(
            qualification
          );

        const loc =
          location === "All" ||
          a.location === location;

        return (
          text.includes(
            q.toLowerCase()
          ) &&
          cgpa &&
          qual &&
          loc
        );
      });

    return (
      <div className="industry-content">
        <PageTitle
          tag="TALENT DISCOVERY"
          title="Find Candidates"
          description="Search and filter students by skills, CGPA, qualification, experience and location."
        />

        <div className="candidate-filters">
          <input
            placeholder="Search name, skill, project..."
            value={q}
            onChange={(e) =>
              setQ(e.target.value)
            }
          />

          <select
            value={qualification}
            onChange={(e) =>
              setQualification(
                e.target.value
              )
            }
          >
            <option>All</option>
            <option>B.Tech</option>
            <option>MCA</option>
            <option>BCA</option>
          </select>

          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Minimum CGPA"
            value={minCgpa}
            onChange={(e) =>
              setMinCgpa(
                e.target.value
              )
            }
          />

          <select
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
          >
            <option>All</option>
            <option>Kolkata</option>
            <option>Delhi</option>
            <option>Bangalore</option>
          </select>
        </div>

        <div className="candidate-grid">
          {filtered.map((c) => (
            <CandidateCard
              key={c.id}
              candidate={c}
              onView={() =>
                setSelectedCandidate(c)
              }
              onShortlist={() =>
                shortlistCandidate(c)
              }
            />
          ))}
        </div>

        {!filtered.length && (
          <EmptyState text="No candidates match the selected filters." />
        )}
      </div>
    );
  };

  /* =========================================================
     SHORTLIST
  ========================================================= */

  const Shortlist = () => (
    <div className="industry-content">
      <PageTitle
        tag="HIRING"
        title="Shortlisted Candidates"
        description="Manage candidates selected for the next recruitment stage."
      />

      {shortlisted.length ? (
        <div className="candidate-grid">
          {shortlisted.map((c) => (
            <div
              className="candidate-card"
              key={c.id}
            >
              <div className="candidate-avatar">
                {c.student.charAt(0)}
              </div>

              <div className="candidate-main">
                <h3>{c.student}</h3>

                <p>{c.position}</p>

                <div className="candidate-skills">
                  {c.skills.map((s) => (
                    <span key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="candidate-match">
                <strong>
                  {c.match}%
                </strong>

                <span>AI Match</span>
              </div>

              <div className="candidate-actions">
                <button
                  className="industry-outline-btn"
                  onClick={() =>
                    setSelectedCandidate(c)
                  }
                >
                  View Profile
                </button>

                <button
                  className="industry-primary-btn"
                  onClick={() => {
                    updateApplicationStatus(
                      c.id,
                      "Interview"
                    );

                    navigate(
                      "applications"
                    );
                  }}
                >
                  Schedule Interview
                </button>

                <button
                  className="industry-danger-btn"
                  onClick={() => {
                    setShortlisted(
                      (prev) =>
                        prev.filter(
                          (x) =>
                            x.id !== c.id
                        )
                    );

                    setApplications(
                      (prev) =>
                        prev.map((a) =>
                          a.id === c.id
                            ? {
                                ...a,
                                status:
                                  "Applied",
                              }
                            : a
                        )
                    );

                    notify(
                      `${c.student} removed from shortlist.`
                    );
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState text="No candidates shortlisted yet." />
      )}
    </div>
  );

  /* =========================================================
     TRAINING
  ========================================================= */

  const Training = () => {
    const [showForm, setShowForm] =
      useState(false);

    const [form, setForm] =
      useState({
        title: "",
        type: "Training",
        duration: "",
        status: "Upcoming",
      });

    const update = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

    const submit = (e) => {
      e.preventDefault();

      const created =
        createTrainingProgram(
          form
        );

      if (created) {
        setForm({
          title: "",
          type: "Training",
          duration: "",
          status: "Upcoming",
        });

        setShowForm(false);
      }
    };

    return (
      <div className="industry-content">
        <PageTitle
          tag="LEARNING & DEVELOPMENT"
          title="Training Programs"
          description="Publish training, courses, certifications and workshops."
          action={
            <button
              className="industry-primary-btn"
              onClick={() =>
                setShowForm(
                  (v) => !v
                )
              }
            >
              {showForm
                ? "× Close"
                : "+ Create Program"}
            </button>
          }
        />

        {showForm && (
          <form
            className="industry-card"
            style={{
              marginBottom: 20,
            }}
            onSubmit={submit}
          >
            <div className="industry-section-heading">
              <h2>
                Create Training
                Program
              </h2>

              <p>
                Add a new training,
                certification or
                workshop.
              </p>
            </div>

            <div className="industry-form-grid">
              <div className="industry-field">
                <label>
                  Program Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={update}
                  placeholder="e.g. Advanced Python Training"
                  required
                />
              </div>

              <div className="industry-field">
                <label>Program Type</label>

                <select
                  name="type"
                  value={form.type}
                  onChange={update}
                >
                  <option>
                    Training
                  </option>
                  <option>
                    Certification
                  </option>
                  <option>
                    Workshop
                  </option>
                  <option>
                    Course
                  </option>
                </select>
              </div>

              <div className="industry-field">
                <label>Duration</label>

                <input
                  name="duration"
                  value={form.duration}
                  onChange={update}
                  placeholder="e.g. 6 Weeks"
                />
              </div>

              <div className="industry-field">
                <label>Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={update}
                >
                  <option>
                    Upcoming
                  </option>
                  <option>
                    Active
                  </option>
                  <option>
                    Draft
                  </option>
                </select>
              </div>
            </div>

            <div className="industry-form-actions">
              <button
                type="button"
                className="industry-outline-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button className="industry-primary-btn">
                Create Program
              </button>
            </div>
          </form>
        )}

        <div className="training-grid">
          {programs.map((p) => (
            <div
              className="training-card"
              key={p.id}
            >
              <div className="training-icon">
                🎓
              </div>

              <span className="program-badge">
                {p.type}
              </span>

              <h2>{p.title}</h2>

              <div className="training-meta">
                <span>
                  ⏱ {p.duration}
                </span>

                <span>
                  👥 {p.participants}{" "}
                  participants
                </span>
              </div>

              <span className="status-active">
                ● {p.status}
              </span>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginTop: 15,
                }}
              >
                <button
                  className="industry-secondary-btn"
                  onClick={() =>
                    notify(
                      `Managing ${p.title}`
                    )
                  }
                >
                  Manage Program
                </button>

                <button
                  className="industry-danger-btn"
                  onClick={() =>
                    deleteTrainingProgram(
                      p.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {!programs.length && (
          <EmptyState text="No training programs available." />
        )}
      </div>
    );
  };

  /* =========================================================
     MENTORSHIP
  ========================================================= */

  const Mentorship = () => {
    const [showForm, setShowForm] =
      useState(false);

    const [form, setForm] =
      useState({
        title: "",
        description: "",
        mentor: "",
      });

    const update = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

    const submit = (e) => {
      e.preventDefault();

      const created =
        createMentorship(form);

      if (created) {
        setForm({
          title: "",
          description: "",
          mentor: "",
        });

        setShowForm(false);
      }
    };

    return (
      <div className="industry-content">
        <PageTitle
          tag="MENTORSHIP"
          title="Mentorship Programs"
          description="Connect industry professionals with students for mentorship."
          action={
            <button
              className="industry-primary-btn"
              onClick={() =>
                setShowForm(
                  (v) => !v
                )
              }
            >
              {showForm
                ? "× Close"
                : "+ Create Mentorship"}
            </button>
          }
        />

        {showForm && (
          <form
            className="industry-card"
            style={{
              marginBottom: 20,
            }}
            onSubmit={submit}
          >
            <div className="industry-section-heading">
              <h2>
                Create Mentorship
              </h2>

              <p>
                Create a new mentorship
                opportunity for
                students.
              </p>
            </div>

            <div className="industry-form-grid">
              <div className="industry-field">
                <label>
                  Mentorship Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={update}
                  placeholder="e.g. AI Career Mentorship"
                  required
                />
              </div>

              <div className="industry-field">
                <label>
                  Mentor / Team
                </label>

                <input
                  name="mentor"
                  value={form.mentor}
                  onChange={update}
                  placeholder="e.g. Senior AI Engineers"
                />
              </div>

              <div className="industry-field full">
                <label>
                  Description *
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={update}
                  rows="4"
                  placeholder="Describe what students will learn..."
                  required
                />
              </div>
            </div>

            <div className="industry-form-actions">
              <button
                type="button"
                className="industry-outline-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button className="industry-primary-btn">
                Create Mentorship
              </button>
            </div>
          </form>
        )}

        <div className="mentorship-grid">
          {mentorships.map((m) => (
            <div
              className="mentorship-card"
              key={m.id}
            >
              <div className="mentor-icon">
                🤝
              </div>

              <h3>{m.title}</h3>

              <p>
                {m.description}
              </p>

              <div className="mentor-stat">
                {m.participants} Active
                Students
              </div>

              <small
                style={{
                  display: "block",
                  marginBottom: 12,
                }}
              >
                Mentor: {m.mentor}
              </small>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                }}
              >
                <button
                  className="industry-primary-btn"
                  onClick={() =>
                    notify(
                      `${m.title} management opened.`
                    )
                  }
                >
                  Manage Mentorship
                </button>

                <button
                  className="industry-danger-btn"
                  onClick={() =>
                    deleteMentorship(
                      m.id
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {!mentorships.length && (
          <EmptyState text="No mentorship programs available." />
        )}
      </div>
    );
  };

  /* =========================================================
     COLLABORATION
  ========================================================= */

  const Collaboration = () => {
    const [filter, setFilter] =
      useState("All");

    const [showForm, setShowForm] =
      useState(false);

    const [form, setForm] =
      useState({
        title: "",
        type: "Mentorship",
        participants: "Students",
        deadline: "",
        description: "",
      });

    const list =
      filter === "All"
        ? collaborations
        : collaborations.filter(
            (c) =>
              c.type === filter
          );

    const update = (e) => {
      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });
    };

    const submit = (e) => {
      e.preventDefault();

      const created =
        createCollaboration(form);

      if (created) {
        setForm({
          title: "",
          type: "Mentorship",
          participants:
            "Students",
          deadline: "",
          description: "",
        });

        setShowForm(false);
      }
    };

    return (
      <div className="industry-content">
        <PageTitle
          tag="ACADEMIA × INDUSTRY"
          title="Collaboration"
          description="Mentorship, workshops, guest lectures, live projects, innovation and research."
          action={
            <button
              className="industry-primary-btn"
              onClick={() =>
                setShowForm(
                  (v) => !v
                )
              }
            >
              {showForm
                ? "× Close"
                : "+ Create Collaboration"}
            </button>
          }
        />

        {showForm && (
          <form
            className="industry-card"
            style={{
              marginBottom: 20,
            }}
            onSubmit={submit}
          >
            <div className="industry-section-heading">
              <h2>
                Create Collaboration
              </h2>

              <p>
                Create an industry-academia
                collaboration opportunity.
              </p>
            </div>

            <div className="industry-form-grid">
              <div className="industry-field">
                <label>
                  Collaboration Title *
                </label>

                <input
                  name="title"
                  value={form.title}
                  onChange={update}
                  placeholder="e.g. AI Research Collaboration"
                  required
                />
              </div>

              <div className="industry-field">
                <label>
                  Collaboration Type
                </label>

                <select
                  name="type"
                  value={form.type}
                  onChange={update}
                >
                  <option>
                    Mentorship
                  </option>

                  <option>
                    Workshop
                  </option>

                  <option>
                    Guest Lecture
                  </option>

                  <option>
                    Live Project
                  </option>

                  <option>
                    Innovation Challenge
                  </option>

                  <option>
                    Research
                  </option>
                </select>
              </div>

              <div className="industry-field">
                <label>
                  Participants
                </label>

                <select
                  name="participants"
                  value={
                    form.participants
                  }
                  onChange={update}
                >
                  <option>
                    Students
                  </option>

                  <option>
                    Faculty
                  </option>

                  <option>
                    Students & Faculty
                  </option>
                </select>
              </div>

              <div className="industry-field">
                <label>
                  Deadline *
                </label>

                <input
                  type="date"
                  name="deadline"
                  value={
                    form.deadline
                  }
                  onChange={update}
                  required
                />
              </div>

              <div className="industry-field full">
                <label>
                  Description *
                </label>

                <textarea
                  name="description"
                  value={
                    form.description
                  }
                  onChange={update}
                  rows="5"
                  placeholder="Describe the collaboration..."
                  required
                />
              </div>
            </div>

            <div className="industry-form-actions">
              <button
                type="button"
                className="industry-outline-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >
                Cancel
              </button>

              <button className="industry-primary-btn">
                Create Collaboration
              </button>
            </div>
          </form>
        )}

        <div className="collaboration-tabs">
          {[
            "All",
            "Mentorship",
            "Workshop",
            "Guest Lecture",
            "Live Project",
            "Innovation Challenge",
            "Research",
          ].map((x) => (
            <button
              className={
                filter === x
                  ? "active"
                  : ""
              }
              key={x}
              onClick={() =>
                setFilter(x)
              }
            >
              {x}
            </button>
          ))}
        </div>

        <div className="collaboration-grid">
          {list.map((c) => {
            const joined =
              participating.includes(
                c.id
              );

            const expired =
              isDeadlinePassed(
                c.deadline
              );

            return (
              <div
                className="collaboration-card"
                key={c.id}
              >
                <span className="opportunity-type">
                  {c.type}
                </span>

                <h2>{c.title}</h2>

                <p>
                  {c.description}
                </p>

                <div className="collaboration-info">
                  <div>
                    <span>
                      Participants
                    </span>

                    <strong>
                      {c.participants}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Deadline
                    </span>

                    <strong>
                      {c.deadline}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Interested
                    </span>

                    <strong>
                      {c.interested ||
                        0}
                    </strong>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 15,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    className="industry-primary-btn"
                    onClick={() =>
                      setSelectedCollaboration(
                        c
                      )
                    }
                  >
                    View Details
                  </button>

                  <button
                    className={
                      joined
                        ? "industry-secondary-btn"
                        : "industry-outline-btn"
                    }
                    disabled={
                      expired &&
                      !joined
                    }
                    onClick={() =>
                      participateInCollaboration(
                        c
                      )
                    }
                  >
                    {expired && !joined
                      ? "Deadline Passed"
                      : joined
                      ? "✓ Participating"
                      : "Participate"}
                  </button>

                  <button
                    className="industry-danger-btn"
                    onClick={() =>
                      deleteCollaboration(
                        c.id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {!list.length && (
          <EmptyState text="No collaborations found for this category." />
        )}
      </div>
    );
  };

  /* =========================================================
     PAGE ROUTER
  ========================================================= */

  const Page = {
    dashboard: Dashboard,
    profile: Profile,
    "post-opportunity":
      PostOpportunity,
    opportunities: Opportunities,
    applications: Applications,
    candidates: Candidates,
    shortlist: Shortlist,
    training: Training,
    mentorship: Mentorship,
    collaboration: Collaboration,
  }[currentPage] || Dashboard;

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="industry-dashboard">
      <Sidebar />

      <div className="industry-main">
        <Header />

        <main>
          <Page />
        </main>
      </div>

      {/* TOAST */}
      {toast && (
        <div className="industry-toast">
          ✓ {toast}
        </div>
      )}

      {/* CANDIDATE MODAL */}
      {selectedCandidate && (
        <CandidateModal
          candidate={
            selectedCandidate
          }
          onClose={() =>
            setSelectedCandidate(
              null
            )
          }
          onShortlist={() => {
            shortlistCandidate(
              selectedCandidate
            );

            setSelectedCandidate(
              null
            );
          }}
        />
      )}

      {/* COLLABORATION MODAL */}
      {selectedCollaboration && (
        <div
          className="industry-modal-overlay"
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
          <div className="industry-modal">
            <button
              className="modal-close"
              onClick={() =>
                setSelectedCollaboration(
                  null
                )
              }
            >
              ×
            </button>

            <span className="opportunity-type">
              {
                selectedCollaboration.type
              }
            </span>

            <h2>
              {
                selectedCollaboration.title
              }
            </h2>

            <p>
              {
                selectedCollaboration.description
              }
            </p>

            <div className="modal-details">
              <p>
                <strong>
                  Participants:
                </strong>{" "}
                {
                  selectedCollaboration.participants
                }
              </p>

              <p>
                <strong>
                  Deadline:
                </strong>{" "}
                {
                  selectedCollaboration.deadline
                }
              </p>

              <p>
                <strong>
                  Interested:
                </strong>{" "}
                {
                  selectedCollaboration.interested ||
                  0
                }
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {isDeadlinePassed(
                  selectedCollaboration.deadline
                )
                  ? "Deadline Passed"
                  : "Open"}
              </p>
            </div>

            <div
              className="candidate-card-actions"
            >
              <button
                className="industry-outline-btn"
                onClick={() =>
                  setSelectedCollaboration(
                    null
                  )
                }
              >
                Close
              </button>

              <button
                className={
                  participating.includes(
                    selectedCollaboration.id
                  )
                    ? "industry-secondary-btn"
                    : "industry-primary-btn"
                }
                disabled={
                  isDeadlinePassed(
                    selectedCollaboration.deadline
                  ) &&
                  !participating.includes(
                    selectedCollaboration.id
                  )
                }
                onClick={() => {
                  participateInCollaboration(
                    selectedCollaboration
                  );

                  setSelectedCollaboration(
                    null
                  );
                }}
              >
                {participating.includes(
                  selectedCollaboration.id
                )
                  ? "✓ Withdraw Participation"
                  : isDeadlinePassed(
                      selectedCollaboration.deadline
                    )
                  ? "Deadline Passed"
                  : "Participate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   SMALL COMPONENTS
========================================================= */

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
        <p>{title}</p>
        <h2>{value}</h2>
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
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function EmptyState({
  text,
}) {
  return (
    <div className="industry-empty">
      <div>🔎</div>
      <h3>{text}</h3>
    </div>
  );
}

/* =========================================================
   OPPORTUNITY CARD
========================================================= */

function OpportunityCard({
  opportunity,
  detailed,
  onManage,
}) {
  return (
    <div className="industry-opportunity-card">
      <div className="opportunity-card-top">
        <span className="industry-badge">
          {opportunity.type}
        </span>

        <span className="status-active">
          ●{" "}
          {opportunity.status ||
            "Active"}
        </span>
      </div>

      <h3>{opportunity.title}</h3>

      <p className="company-name">
        Tech Innovations Pvt. Ltd.
      </p>

      <div className="opportunity-meta">
        <span>
          📍{" "}
          {opportunity.location ||
            "Not specified"}
        </span>

        <span>
          💻{" "}
          {opportunity.mode ||
            "—"}
        </span>

        <span>
          ⏱{" "}
          {opportunity.duration ||
            "—"}
        </span>
      </div>

      <div className="skill-list">
        {(opportunity.skills ||
          []
        ).map((s) => (
          <span key={s}>
            {s}
          </span>
        ))}
      </div>

      <div className="opportunity-footer">
        <div>
          <small>
            Applications
          </small>

          <strong>
            {opportunity.applications ||
              0}
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
          onClick={onManage}
        >
          Manage Opportunity
        </button>
      )}
    </div>
  );
}

/* =========================================================
   CANDIDATE CARD
========================================================= */

function CandidateCard({
  candidate,
  onView,
  onShortlist,
}) {
  const alreadyShortlisted =
    candidate.status ===
    "Shortlisted";

  return (
    <div className="candidate-card">
      <div className="candidate-avatar">
        {candidate.student.charAt(
          0
        )}
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
            (s) => (
              <span key={s}>
                {s}
              </span>
            )
          )}
        </div>
      </div>

      <div className="candidate-match">
        <strong>
          {candidate.match}%
        </strong>

        <span>AI Match</span>
      </div>

      <div className="candidate-actions">
        <button
          className="industry-outline-btn"
          onClick={onView}
        >
          View Profile
        </button>

        <button
          className={
            alreadyShortlisted
              ? "industry-secondary-btn"
              : "industry-primary-btn"
          }
          onClick={onShortlist}
        >
          {alreadyShortlisted
            ? "✓ Shortlisted"
            : "Shortlist"}
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   CANDIDATE MODAL
========================================================= */

function CandidateModal({
  candidate,
  onClose,
  onShortlist,
}) {
  const viewResume = () => {
    /*
      Student side থেকে যদি resumeData / resumeUrl
      localStorage-এ save করা থাকে তাহলে এখানে PDF খুলবে।
    */

    const possibleKeys = [
      `resume_${candidate.id}`,
      `studentResume_${candidate.id}`,
      `resume_${candidate.student}`,
    ];

    let resume = null;

    for (const key of possibleKeys) {
      const value =
        localStorage.getItem(key);

      if (value) {
        resume = value;
        break;
      }
    }

    if (!resume) {
      alert(
        `Resume has not been uploaded by ${candidate.student} yet.`
      );
      return;
    }

    try {
      const win =
        window.open(
          "",
          "_blank"
        );

      if (!win) {
        alert(
          "Please allow pop-ups to view the resume."
        );
        return;
      }

      win.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${candidate.student} - Resume</title>
            <style>
              html,body{
                margin:0;
                width:100%;
                height:100%;
                overflow:hidden;
                background:#525659;
              }
              iframe{
                width:100%;
                height:100%;
                border:0;
              }
            </style>
          </head>
          <body>
            <iframe src="${resume}"></iframe>
          </body>
        </html>
      `);

      win.document.close();
    } catch {
      alert(
        "Unable to open resume."
      );
    }
  };

  return (
    <div
      className="industry-modal-overlay"
      onMouseDown={(e) => {
        if (
          e.target ===
          e.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="industry-modal candidate-modal">
        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="candidate-modal-head">
          <div className="candidate-large-avatar">
            {candidate.student.charAt(
              0
            )}
          </div>

          <div>
            <h2>
              {candidate.student}
            </h2>

            <p>
              {candidate.position}
            </p>
          </div>

          <div className="candidate-match">
            <strong>
              {candidate.match}%
            </strong>

            <small>
              AI Match
            </small>
          </div>
        </div>

        <div className="modal-details">
          <p>
            <strong>
              Qualification:
            </strong>{" "}
            {candidate.qualification}
          </p>

          <p>
            <strong>
              CGPA:
            </strong>{" "}
            {candidate.cgpa}
          </p>

          <p>
            <strong>
              Location:
            </strong>{" "}
            {candidate.location}
          </p>

          <p>
            <strong>
              Experience:
            </strong>{" "}
            {candidate.experience}
          </p>

          <p>
            <strong>
              Certifications:
            </strong>{" "}
            {candidate.certifications}
          </p>

          <p>
            <strong>
              Skills:
            </strong>{" "}
            {candidate.skills.join(
              ", "
            )}
          </p>

          <p>
            <strong>
              Application Status:
            </strong>{" "}
            {candidate.status}
          </p>
        </div>

        <div className="candidate-card-actions">
          <button
            className="industry-outline-btn"
            onClick={viewResume}
          >
            📄 View Resume
          </button>

          <button
            className={
              candidate.status ===
              "Shortlisted"
                ? "industry-secondary-btn"
                : "industry-primary-btn"
            }
            onClick={onShortlist}
          >
            {candidate.status ===
            "Shortlisted"
              ? "✓ Already Shortlisted"
              : "Shortlist Candidate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndustryLayout;