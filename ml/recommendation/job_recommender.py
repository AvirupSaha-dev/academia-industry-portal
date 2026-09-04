def calculate_match_score(student_skills, required_skills):
    student_skills = {
        skill.lower().strip()
        for skill in student_skills
    }

    required_skills = {
        skill.lower().strip()
        for skill in required_skills
    }

    if len(required_skills) == 0:
        return 0

    matched_skills = student_skills.intersection(required_skills)

    match_score = (
        len(matched_skills) / len(required_skills)
    ) * 100

    return round(match_score, 2)


def recommend_jobs(student_skills, jobs):
    recommendations = []

    for job in jobs:
        score = calculate_match_score(
            student_skills,
            job["required_skills"]
        )

        recommendations.append({
            "job_title": job["job_title"],
            "company": job["company"],
            "match_score": score
        })

    recommendations.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return recommendations


if __name__ == "__main__":
    student_skills = [
        "Python",
        "SQL",
        "Machine Learning"
    ]

    jobs = [
        {
            "job_title": "Machine Learning Engineer",
            "company": "Tech Solutions",
            "required_skills": [
                "Python",
                "Machine Learning",
                "SQL",
                "Deep Learning"
            ]
        },
        {
            "job_title": "Data Analyst",
            "company": "Data Corp",
            "required_skills": [
                "Python",
                "SQL",
                "Excel"
            ]
        },
        {
            "job_title": "Frontend Developer",
            "company": "Web World",
            "required_skills": [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        }
    ]

    result = recommend_jobs(
        student_skills,
        jobs
    )

    print("Job Recommendations:\n")

    for job in result:
        print(
            job["job_title"],
            "|",
            job["company"],
            "| Match Score:",
            str(job["match_score"]) + "%"
        )