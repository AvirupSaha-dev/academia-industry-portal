def recommend_courses(student_skills, courses):
    student_skills = {
        skill.lower().strip()
        for skill in student_skills
    }

    recommendations = []

    for course in courses:
        course_skills = {
            skill.lower().strip()
            for skill in course["skills"]
        }

        matched_skills = student_skills.intersection(course_skills)
        missing_skills = course_skills - student_skills

        if len(course_skills) == 0:
            completion_percentage = 0
        else:
            completion_percentage = (
                len(matched_skills) / len(course_skills)
            ) * 100

        recommendations.append({
            "course_name": course["course_name"],
            "platform": course["platform"],
            "missing_skills": sorted(missing_skills),
            "completion_percentage": round(
                completion_percentage, 2
            )
        })

    recommendations.sort(
        key=lambda x: x["completion_percentage"],
        reverse=True
    )

    return recommendations


if __name__ == "__main__":
    student_skills = [
        "Python",
        "SQL",
        "Machine Learning"
    ]

    courses = [
        {
            "course_name": "Advanced Machine Learning",
            "platform": "Coursera",
            "skills": [
                "Python",
                "Machine Learning",
                "Deep Learning"
            ]
        },
        {
            "course_name": "Data Analysis with Python",
            "platform": "edX",
            "skills": [
                "Python",
                "SQL",
                "Pandas"
            ]
        },
        {
            "course_name": "Web Development Basics",
            "platform": "Udemy",
            "skills": [
                "HTML",
                "CSS",
                "JavaScript"
            ]
        }
    ]

    result = recommend_courses(
        student_skills,
        courses
    )

    print("Course Recommendations:\n")

    for course in result:
        print("Course:", course["course_name"])
        print("Platform:", course["platform"])
        print(
            "Completion:",
            str(course["completion_percentage"]) + "%"
        )
        print(
            "Missing Skills:",
            course["missing_skills"]
        )
        print("-" * 40)