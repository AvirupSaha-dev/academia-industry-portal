def extract_skills(resume_text, skill_list):
    resume_text = resume_text.lower()

    extracted_skills = []

    for skill in skill_list:
        skill_lower = skill.lower().strip()

        if skill_lower in resume_text:
            extracted_skills.append(skill)

    return extracted_skills


if __name__ == "__main__":
    resume_text = """
    I am a Computer Science student.
    I have knowledge of Python, SQL,
    Machine Learning and Pandas.
    """

    skill_list = [
        "Python",
        "SQL",
        "Machine Learning",
        "Pandas",
        "Java",
        "HTML",
        "CSS"
    ]

    result = extract_skills(
        resume_text,
        skill_list
    )

    print("Extracted Skills:\n")

    for skill in result:
        print("-", skill)