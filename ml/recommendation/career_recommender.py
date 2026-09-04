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


def recommend_careers(student_skills, careers):
    recommendations = []

    for career in careers:
        score = calculate_match_score(
            student_skills,
            career["required_skills"]
        )

        recommendations.append({
            "career_name": career["career_name"],
            "description": career["description"],
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

    careers = [
        {
            "career_name": "Machine Learning Engineer",
            "description": "Develops and deploys machine learning models.",
            "required_skills": [
                "Python",
                "Machine Learning",
                "Deep Learning",
                "SQL"
            ]
        },
        {
            "career_name": "Data Analyst",
            "description": "Analyzes data and creates useful reports.",
            "required_skills": [
                "Python",
                "SQL",
                "Excel",
                "Statistics"
            ]
        },
        {
            "career_name": "Frontend Developer",
            "description": "Builds the user interface of websites.",
            "required_skills": [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        }
    ]

    result = recommend_careers(
        student_skills,
        careers
    )

    print("Career Recommendations:\n")

    for career in result:
        print("Career:", career["career_name"])
        print("Description:", career["description"])
        print(
            "Match Score:",
            str(career["match_score"]) + "%"
        )
        print("-" * 40)