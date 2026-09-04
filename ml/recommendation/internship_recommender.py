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


def recommend_internships(student_skills, internships):
    recommendations = []

    for internship in internships:
        score = calculate_match_score(
            student_skills,
            internship["required_skills"]
        )

        recommendations.append({
            "name": internship["name"],
            "company": internship["company"],
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

    internships = [
        {
            "name": "Machine Learning Internship",
            "company": "ABC Technologies",
            "required_skills": [
                "Python",
                "Machine Learning",
                "SQL",
                "Deep Learning"
            ]
        },
        {
            "name": "Web Development Internship",
            "company": "XYZ Solutions",
            "required_skills": [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        },
        {
            "name": "Data Science Internship",
            "company": "DataWorks",
            "required_skills": [
                "Python",
                "SQL",
                "Machine Learning"
            ]
        }
    ]

    result = recommend_internships(
        student_skills,
        internships
    )

    print("Internship Recommendations:\n")

    for internship in result:
        print(
            internship["name"],
            "|",
            internship["company"],
            "| Match Score:",
            str(internship["match_score"]) + "%"
        )