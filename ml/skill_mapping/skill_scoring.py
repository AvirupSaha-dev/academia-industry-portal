def calculate_skill_score(skill_scores):
    if len(skill_scores) == 0:
        return {
            "skill_scores": {},
            "overall_score": 0
        }

    total_score = sum(skill_scores.values())
    overall_score = total_score / len(skill_scores)

    return {
        "skill_scores": skill_scores,
        "overall_score": round(overall_score, 2)
    }


if __name__ == "__main__":
    skill_scores = {
        "Python": 85,
        "SQL": 70,
        "Machine Learning": 60
    }

    result = calculate_skill_score(skill_scores)

    print("Skill Scores:", result["skill_scores"])
    print("Overall Score:", result["overall_score"])