from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(student_skills, required_skills):
    student_text = " ".join(student_skills)
    required_text = " ".join(required_skills)

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform([
        student_text,
        required_text
    ])

    similarity_score = cosine_similarity(
        tfidf_matrix[0:1],
        tfidf_matrix[1:2]
    )[0][0]

    return {
        "similarity_score": round(similarity_score, 4),
        "similarity_percentage": round(
            similarity_score * 100, 2
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

    result = calculate_similarity(
        student_skills,
        required_skills
    )

    print("Similarity Score:", result["similarity_score"])
    print(
        "Similarity Percentage:",
        str(result["similarity_percentage"]) + "%"
    )