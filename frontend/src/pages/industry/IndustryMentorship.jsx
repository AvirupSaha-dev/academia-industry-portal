const Mentorship = () => {
  const [mentorships, setMentorships] = useState(() =>
    readLS("industryMentorshipV2", [
      {
        id: 1,
        icon: "👨‍💻",
        title: "Technical Mentorship",
        description: "Improve technical and industry skills.",
        students: 24,
        mentor: "Industry Professionals",
        status: "Active",
      },
      {
        id: 2,
        icon: "🎯",
        title: "Career Mentorship",
        description: "Guide students towards suitable career roles.",
        students: 18,
        mentor: "Career Experts",
        status: "Active",
      },
      {
        id: 3,
        icon: "🚀",
        title: "Project Mentorship",
        description: "Mentor students on real-world projects.",
        students: 12,
        mentor: "Project Mentors",
        status: "Active",
      },
    ])
  );

  const [showCreate, setShowCreate] = useState(false);
  const [selectedMentorship, setSelectedMentorship] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    mentor: "",
  });

  useEffect(() => {
    localStorage.setItem(
      "industryMentorshipV2",
      JSON.stringify(mentorships)
    );
  }, [mentorships]);

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createMentorship = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      notify("Please fill in all required fields.");
      return;
    }

    const newMentorship = {
      id: Date.now(),
      icon: "🤝",
      title: form.title,
      description: form.description,
      students: 0,
      mentor: form.mentor || "Industry Professionals",
      status: "Active",
    };

    setMentorships((prev) => [...prev, newMentorship]);

    setForm({
      title: "",
      description: "",
      mentor: "",
    });

    setShowCreate(false);

    notify("Mentorship created successfully.");
  };

  const manageMentorship = (mentorship) => {
    setSelectedMentorship(mentorship);
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
            onClick={() => setShowCreate(true)}
          >
            + Create Mentorship
          </button>
        }
      />

      <div className="mentorship-grid">

        {mentorships.map((mentorship) => (
          <div
            className="mentorship-card"
            key={mentorship.id}
          >

            <div className="mentor-icon">
              {mentorship.icon}
            </div>

            <h3>
              {mentorship.title}
            </h3>

            <p>
              {mentorship.description}
            </p>

            <div className="mentor-info">
              <span>
                👥 {mentorship.students} Active Students
              </span>

              <span>
                👨‍🏫 {mentorship.mentor}
              </span>
            </div>

            <button
              className="industry-primary-btn"
              onClick={() =>
                manageMentorship(mentorship)
              }
            >
              Manage Mentorship
            </button>

          </div>
        ))}

      </div>


      {/* CREATE MENTORSHIP MODAL */}

      {showCreate && (
        <div
          className="industry-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreate(false);
            }
          }}
        >

          <div className="industry-modal mentorship-modal">

            <button
              className="modal-close"
              onClick={() => setShowCreate(false)}
            >
              ×
            </button>

            <h2>
              Create Mentorship
            </h2>

            <p className="modal-subtitle">
              Create a new mentorship program for students.
            </p>

            <form onSubmit={createMentorship}>

              <div className="industry-field">
                <label>
                  Mentorship Title *
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={updateForm}
                  placeholder="e.g. Full Stack Development Mentorship"
                  required
                />
              </div>

              <div className="industry-field">
                <label>
                  Mentor Type
                </label>

                <select
                  name="mentor"
                  value={form.mentor}
                  onChange={updateForm}
                >
                  <option value="">
                    Industry Professionals
                  </option>

                  <option value="Senior Developers">
                    Senior Developers
                  </option>

                  <option value="Career Experts">
                    Career Experts
                  </option>

                  <option value="Project Mentors">
                    Project Mentors
                  </option>

                  <option value="Industry Leaders">
                    Industry Leaders
                  </option>
                </select>
              </div>

              <div className="industry-field">
                <label>
                  Description *
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={updateForm}
                  rows="5"
                  placeholder="Describe what students will learn..."
                  required
                />
              </div>

              <div className="mentorship-modal-actions">

                <button
                  type="button"
                  className="industry-outline-btn"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="industry-primary-btn"
                >
                  Create Mentorship
                </button>

              </div>

            </form>

          </div>

        </div>
      )}


      {/* MANAGE MENTORSHIP MODAL */}

      {selectedMentorship && (
        <div
          className="industry-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedMentorship(null);
            }
          }}
        >

          <div className="industry-modal mentorship-modal">

            <button
              className="modal-close"
              onClick={() => setSelectedMentorship(null)}
            >
              ×
            </button>

            <div className="mentor-manage-icon">
              {selectedMentorship.icon}
            </div>

            <h2>
              {selectedMentorship.title}
            </h2>

            <p className="modal-subtitle">
              {selectedMentorship.description}
            </p>

            <div className="mentor-manage-details">

              <div>
                <span>Active Students</span>
                <strong>
                  {selectedMentorship.students}
                </strong>
              </div>

              <div>
                <span>Mentor Type</span>
                <strong>
                  {selectedMentorship.mentor}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {selectedMentorship.status}
                </strong>
              </div>

            </div>

            <div className="mentorship-manage-actions">

              <button
                className="industry-outline-btn"
                onClick={() => {
                  notify(
                    `${selectedMentorship.title} students opened.`
                  );
                  setSelectedMentorship(null);
                }}
              >
                View Students
              </button>

              <button
                className="industry-primary-btn"
                onClick={() => {
                  notify(
                    `Mentorship session management opened.`
                  );
                  setSelectedMentorship(null);
                }}
              >
                Manage Sessions
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};