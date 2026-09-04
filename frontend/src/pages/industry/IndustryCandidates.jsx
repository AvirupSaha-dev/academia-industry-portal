import { useState } from "react";

function IndustryCandidates() {

  const candidates = [
    {
      id: 1,
      name: "Rahul Sharma",
      education: "B.Tech CSE",
      cgpa: "8.7",
      location: "Kolkata",
      match: 94,
      skills: ["Python", "Machine Learning", "SQL"],
      experience: "2 Projects",
    },
    {
      id: 2,
      name: "Ananya Das",
      education: "B.Tech CSE",
      cgpa: "9.1",
      location: "Delhi",
      match: 91,
      skills: ["Python", "Power BI", "SQL"],
      experience: "1 Internship",
    },
    {
      id: 3,
      name: "Arjun Roy",
      education: "B.Tech IT",
      cgpa: "8.3",
      location: "Kolkata",
      match: 87,
      skills: ["React", "JavaScript", "Node.js"],
      experience: "3 Projects",
    },
    {
      id: 4,
      name: "Priya Sen",
      education: "MCA",
      cgpa: "8.8",
      location: "Bangalore",
      match: 84,
      skills: ["Python", "AI", "TensorFlow"],
      experience: "1 Project",
    },
  ];

  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState("");

  const filtered = candidates.filter((candidate) => {

    const searchMatch =
      candidate.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      candidate.education
        .toLowerCase()
        .includes(search.toLowerCase());

    const skillMatch =
      !skill ||
      candidate.skills.some((item) =>
        item.toLowerCase().includes(skill.toLowerCase())
      );

    return searchMatch && skillMatch;
  });

  return (
    <div className="industry-page">

      <div className="industry-page-header">

        <div>
          <p className="industry-tag">
            TALENT DISCOVERY
          </p>

          <h1>Find Candidates</h1>

          <p>
            Discover students based on skills,
            qualifications and AI compatibility.
          </p>
        </div>

      </div>

      <div className="industry-card">

        <div className="candidate-filters">

          <input
            placeholder="Search candidate..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <input
            placeholder="Filter by skill..."
            value={skill}
            onChange={(e) =>
              setSkill(e.target.value)
            }
          />

          <select>
            <option>All Qualifications</option>
            <option>B.Tech</option>
            <option>BCA</option>
            <option>MCA</option>
          </select>

          <select>
            <option>Any CGPA</option>
            <option>8+</option>
            <option>8.5+</option>
            <option>9+</option>
          </select>

        </div>

      </div>

      <div className="candidate-grid">

        {filtered.map((candidate) => (
          <div
            className="candidate-profile-card"
            key={candidate.id}
          >

            <div className="candidate-card-top">

              <div className="candidate-large-avatar">
                {candidate.name.charAt(0)}
              </div>

              <div>
                <h2>{candidate.name}</h2>
                <p>{candidate.education}</p>
              </div>

              <div className="candidate-match">
                🤖
                <strong>
                  {candidate.match}%
                </strong>
                <small>AI Match</small>
              </div>

            </div>

            <div className="candidate-details">

              <span>
                🎓 CGPA: {candidate.cgpa}
              </span>

              <span>
                📍 {candidate.location}
              </span>

              <span>
                💼 {candidate.experience}
              </span>

            </div>

            <div className="candidate-card-skills">

              {candidate.skills.map((item) => (
                <span key={item}>
                  {item}
                </span>
              ))}

            </div>

            <div className="candidate-card-actions">

              <button className="industry-secondary-btn">
                View Profile
              </button>

              <button className="industry-secondary-btn">
                View Resume
              </button>

              <button className="industry-primary-btn">
                Shortlist
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default IndustryCandidates;