def parse_resume(resume_text):
    resume_text = resume_text.lower().strip()

    if len(resume_text) == 0:
        return {
            "resume_text": "",
            "word_count": 0,
            "status": "Empty resume"
        }

    words = resume_text.split()

    return {
        "resume_text": resume_text,
        "word_count": len(words),
        "status": "Resume parsed successfully"
    }


if __name__ == "__main__":
    resume_text = """
    I am a Computer Science student.
    I have knowledge of Python, SQL and Machine Learning.
    """

    result = parse_resume(resume_text)

    print("Resume Parsing Result:\n")
    print("Status:", result["status"])
    print("Word Count:", result["word_count"])
    print("Resume Text:", result["resume_text"])