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


def match_opportunities(student_skills, opportunities):
    results = []

    for opportunity in opportunities:
        score = calculate_match_score(
            student_skills,
            opportunity["required_skills"]
        )

        results.append({
            "name": opportunity["name"],
            "match_score": score
        })

    results.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return results


if __name__ == "__main__":
    student_skills = [
        "Python",
        "SQL",
        "Machine Learning"
    ]

    opportunities = [
        {
            "name": "Machine Learning Internship",
            "required_skills": [
                "Python",
                "Machine Learning",
                "SQL"
            ]
        },
        {
            "name": "Data Science Internship",
            "required_skills": [
                "Python",
                "SQL",
                "Machine Learning",
                "Deep Learning"
            ]
        },
        {
            "name": "Web Development Internship",
            "required_skills": [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        }
    ]

    result = match_opportunities(
        student_skills,
        opportunities
    )

    print("Opportunity Matching:\n")

    for opportunity in result:
        print(
            opportunity["name"],
            "| Match Score:",
            str(opportunity["match_score"]) + "%"
        )