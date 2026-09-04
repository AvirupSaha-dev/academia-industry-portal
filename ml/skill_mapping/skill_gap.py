def calculate_skill_gap(student_skills, required_skills):
    student_skills = {
        skill.lower().strip()
        for skill in student_skills
    }

    required_skills = {
        skill.lower().strip()
        for skill in required_skills
    }

    matched_skills = student_skills.intersection(required_skills)
    missing_skills = required_skills - student_skills

    if len(required_skills) == 0:
        matching_percentage = 0
    else:
        matching_percentage = (
            len(matched_skills) / len(required_skills)
        ) * 100

    return {
        "matched_skills": sorted(matched_skills),
        "missing_skills": sorted(missing_skills),
        "matching_percentage": round(
            matching_percentage, 2
        )
    }


if __name__ == "__main__":
    student_skills = [
        "Python",
        "SQL",
        "Machine Learning"
    ]

    required_skills = [
        "Python",
        "SQL",
        "Machine Learning",
        "Deep Learning",
        "NLP"
    ]

    result = calculate_skill_gap(
        student_skills,
        required_skills
    )

    print("Matched Skills:", result["matched_skills"])
    print("Missing Skills:", result["missing_skills"])
    print(
        "Matching Percentage:",
        str(result["matching_percentage"]) + "%"
    )