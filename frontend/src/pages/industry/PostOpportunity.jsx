import { useState } from "react";

function PostOpportunity() {

  const initialForm = {
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
    compensation: "",
    deadline: "",
  };

  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saved =
      JSON.parse(
        localStorage.getItem("industryOpportunities") || "[]"
      );

    const opportunity = {
      ...form,
      id: Date.now(),
      createdAt: Date.now(),
      skills: form.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      status: "Active",
    };

    localStorage.setItem(
      "industryOpportunities",
      JSON.stringify([opportunity, ...saved])
    );

    setMessage("Opportunity posted successfully.");

    setForm(initialForm);

    window.dispatchEvent(
      new Event("opportunitiesUpdated")
    );

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="industry-page">

      <div className="industry-page-header">
        <div>
          <p className="industry-tag">
            RECRUITMENT
          </p>

          <h1>Post Opportunity</h1>

          <p>
            Create internships, jobs, projects,
            apprenticeships and industrial training.
          </p>
        </div>
      </div>

      <form
        className="industry-card"
        onSubmit={handleSubmit}
      >

        {message && (
          <div className="success-alert">
            ✓ {message}
          </div>
        )}

        <div className="industry-section-heading">
          <h2>Opportunity Information</h2>
          <p>
            Provide complete details for candidates.
          </p>
        </div>

        <div className="industry-form-grid">

          <div className="industry-field">
            <label>Opportunity Type *</label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option>Internship</option>
              <option>Job</option>
              <option>Apprenticeship</option>
              <option>Live Project</option>
              <option>Industrial Training</option>
            </select>
          </div>

          <div className="industry-field">
            <label>Title *</label>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Machine Learning Intern"
              required
            />
          </div>

          <div className="industry-field full">
            <label>Description *</label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the opportunity..."
              required
            />
          </div>

          <div className="industry-field full">
            <label>Required Skills *</label>

            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="Python, SQL, Machine Learning, Power BI"
              required
            />

            <small>
              Separate skills using commas.
            </small>
          </div>

          <div className="industry-field">
            <label>Minimum Qualification</label>

            <input
              name="qualification"
              value={form.qualification}
              onChange={handleChange}
              placeholder="B.Tech / BCA / MCA"
            />
          </div>

          <div className="industry-field">
            <label>Minimum CGPA</label>

            <input
              name="cgpa"
              value={form.cgpa}
              onChange={handleChange}
              placeholder="7.0"
            />
          </div>

          <div className="industry-field">
            <label>Experience</label>

            <input
              name="experience"
              value={form.experience}
              onChange={handleChange}
              placeholder="0-2 years"
            />
          </div>

          <div className="industry-field">
            <label>Location</label>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Kolkata / Remote"
            />
          </div>

          <div className="industry-field">
            <label>Work Mode</label>

            <select
              name="mode"
              value={form.mode}
              onChange={handleChange}
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div className="industry-field">
            <label>Duration</label>

            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="3 Months"
            />
          </div>

          <div className="industry-field">
            <label>Stipend / Salary</label>

            <input
              name="compensation"
              value={form.compensation}
              onChange={handleChange}
              placeholder="₹20,000/month"
            />
          </div>

          <div className="industry-field">
            <label>Application Deadline</label>

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="industry-form-actions">

          <button
            type="button"
            className="industry-secondary-btn"
            onClick={() => setForm(initialForm)}
          >
            Reset
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
}

export default PostOpportunity;