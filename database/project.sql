-- ============================================================
-- ACADEMIA–INDUSTRY COLLABORATION PORTAL
-- SAMPLE / SEED DATA
-- ============================================================

-- ============================================================
-- 1. USERS
-- ============================================================

INSERT INTO users
(name, email, password_hash, role)
VALUES
('Aarav Sharma', 'aarav.student@example.com', 'demo_hash_aarav', 'student'),
('Priya Das', 'priya.student@example.com', 'demo_hash_priya', 'student'),
('Rahul Sen', 'rahul.student@example.com', 'demo_hash_rahul', 'student'),

('TechNova HR', 'hr@technova.example.com', 'demo_hash_technova', 'industry'),
('InnoSoft HR', 'hr@innosoft.example.com', 'demo_hash_innosoft', 'industry'),

('Dr. Ananya Roy', 'ananya.faculty@example.com', 'demo_hash_ananya', 'faculty'),

('System Admin', 'admin@example.com', 'demo_hash_admin', 'admin')
ON CONFLICT (email) DO NOTHING;


-- ============================================================
-- 2. STUDENTS
-- ============================================================

INSERT INTO students
(user_id, student_code, college, department, degree, graduation_year, cgpa, bio)
SELECT
    u.user_id,
    'STU001',
    'ABC Institute of Technology',
    'Computer Science',
    'B.Tech',
    2027,
    8.70,
    'Interested in Artificial Intelligence, Machine Learning and software development.'
FROM users u
WHERE u.email = 'aarav.student@example.com'
ON CONFLICT (user_id) DO NOTHING;


INSERT INTO students
(user_id, student_code, college, department, degree, graduation_year, cgpa, bio)
SELECT
    u.user_id,
    'STU002',
    'ABC Institute of Technology',
    'Computer Science',
    'B.Tech',
    2027,
    9.10,
    'Interested in full-stack development, databases and cloud technologies.'
FROM users u
WHERE u.email = 'priya.student@example.com'
ON CONFLICT (user_id) DO NOTHING;


INSERT INTO students
(user_id, student_code, college, department, degree, graduation_year, cgpa, bio)
SELECT
    u.user_id,
    'STU003',
    'ABC Institute of Technology',
    'Artificial Intelligence',
    'B.Tech',
    2027,
    8.45,
    'Interested in NLP, machine learning and data science.'
FROM users u
WHERE u.email = 'rahul.student@example.com'
ON CONFLICT (user_id) DO NOTHING;


-- ============================================================
-- 3. INDUSTRIES
-- ============================================================

INSERT INTO industries
(user_id, company_name, company_description, industry_type, website, location)
SELECT
    u.user_id,
    'TechNova Solutions',
    'Technology company working on software, AI and digital solutions.',
    'Information Technology',
    'https://technova.example.com',
    'Bengaluru, India'
FROM users u
WHERE u.email = 'hr@technova.example.com'
ON CONFLICT (user_id) DO NOTHING;


INSERT INTO industries
(user_id, company_name, company_description, industry_type, website, location)
SELECT
    u.user_id,
    'InnoSoft Technologies',
    'Software and product development company focused on modern web applications.',
    'Software Development',
    'https://innosoft.example.com',
    'Kolkata, India'
FROM users u
WHERE u.email = 'hr@innosoft.example.com'
ON CONFLICT (user_id) DO NOTHING;


-- ============================================================
-- 4. FACULTY
-- ============================================================

INSERT INTO faculty
(user_id, employee_code, department, designation)
SELECT
    u.user_id,
    'FAC001',
    'Computer Science and Engineering',
    'Assistant Professor'
FROM users u
WHERE u.email = 'ananya.faculty@example.com'
ON CONFLICT (user_id) DO NOTHING;


-- ============================================================
-- 5. SKILLS
-- ============================================================

INSERT INTO skills
(skill_name, category, description)
VALUES
('Python', 'Programming',
 'Programming language widely used in software development and AI.'),

('Java', 'Programming',
 'Object-oriented programming language.'),

('C++', 'Programming',
 'Programming language commonly used for problem solving and systems.'),

('SQL', 'Database',
 'Language for managing relational databases.'),

('PostgreSQL', 'Database',
 'Open-source relational database management system.'),

('Machine Learning', 'Artificial Intelligence',
 'Techniques for building predictive machine learning models.'),

('Deep Learning', 'Artificial Intelligence',
 'Neural-network based machine learning techniques.'),

('NLP', 'Artificial Intelligence',
 'Natural Language Processing techniques.'),

('React', 'Web Development',
 'JavaScript library for building user interfaces.'),

('FastAPI', 'Backend Development',
 'Python framework for building APIs.'),

('Git', 'Tools',
 'Distributed version control system.'),

('GitHub', 'Tools',
 'Platform for hosting and collaborating on Git repositories.'),

('Data Structures', 'Computer Science',
 'Fundamental structures for organizing and processing data.'),

('Communication', 'Soft Skills',
 'Professional verbal and written communication skills.'),

('Problem Solving', 'Soft Skills',
 'Ability to analyze and solve technical problems.')
ON CONFLICT (skill_name) DO NOTHING;


-- ============================================================
-- 6. STUDENT SKILLS
-- ============================================================

-- Aarav
INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    4,
    2.0
FROM students s
JOIN skills sk ON sk.skill_name = 'Python'
WHERE s.student_code = 'STU001'
ON CONFLICT DO NOTHING;


INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    4,
    1.5
FROM students s
JOIN skills sk ON sk.skill_name = 'Machine Learning'
WHERE s.student_code = 'STU001'
ON CONFLICT DO NOTHING;


INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    3,
    1.0
FROM students s
JOIN skills sk ON sk.skill_name = 'SQL'
WHERE s.student_code = 'STU001'
ON CONFLICT DO NOTHING;


-- Priya
INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    5,
    2.0
FROM students s
JOIN skills sk ON sk.skill_name = 'React'
WHERE s.student_code = 'STU002'
ON CONFLICT DO NOTHING;


INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    4,
    1.5
FROM students s
JOIN skills sk ON sk.skill_name = 'SQL'
WHERE s.student_code = 'STU002'
ON CONFLICT DO NOTHING;


INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    4,
    2.0
FROM students s
JOIN skills sk ON sk.skill_name = 'Git'
WHERE s.student_code = 'STU002'
ON CONFLICT DO NOTHING;


-- Rahul
INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    4,
    2.0
FROM students s
JOIN skills sk ON sk.skill_name = 'Python'
WHERE s.student_code = 'STU003'
ON CONFLICT DO NOTHING;


INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    4,
    1.5
FROM students s
JOIN skills sk ON sk.skill_name = 'NLP'
WHERE s.student_code = 'STU003'
ON CONFLICT DO NOTHING;


INSERT INTO student_skills
(student_id, skill_id, proficiency_level, years_of_experience)
SELECT
    s.student_id,
    sk.skill_id,
    3,
    1.0
FROM students s
JOIN skills sk ON sk.skill_name = 'SQL'
WHERE s.student_code = 'STU003'
ON CONFLICT DO NOTHING;


-- ============================================================
-- 7. OPPORTUNITIES
-- ============================================================

INSERT INTO opportunities
(
    industry_id,
    title,
    description,
    opportunity_type,
    location,
    is_remote,
    openings,
    stipend,
    application_deadline
)
SELECT
    i.industry_id,
    'Machine Learning Intern',
    'Work on machine learning models, data preprocessing and recommendation systems.',
    'internship',
    'Bengaluru, India',
    TRUE,
    5,
    15000,
    CURRENT_DATE + 30
FROM industries i
WHERE i.company_name = 'TechNova Solutions'
AND NOT EXISTS (
    SELECT 1
    FROM opportunities o
    WHERE o.title = 'Machine Learning Intern'
      AND o.industry_id = i.industry_id
);


INSERT INTO opportunities
(
    industry_id,
    title,
    description,
    opportunity_type,
    location,
    is_remote,
    openings,
    stipend,
    application_deadline
)
SELECT
    i.industry_id,
    'Full Stack Developer Intern',
    'Build modern web applications using React, APIs and relational databases.',
    'internship',
    'Kolkata, India',
    FALSE,
    3,
    12000,
    CURRENT_DATE + 25
FROM industries i
WHERE i.company_name = 'InnoSoft Technologies'
AND NOT EXISTS (
    SELECT 1
    FROM opportunities o
    WHERE o.title = 'Full Stack Developer Intern'
      AND o.industry_id = i.industry_id
);


INSERT INTO opportunities
(
    industry_id,
    title,
    description,
    opportunity_type,
    location,
    is_remote,
    openings,
    salary_min,
    salary_max,
    application_deadline
)
SELECT
    i.industry_id,
    'Junior Python Developer',
    'Develop backend services and APIs using Python and modern development tools.',
    'job',
    'Bengaluru, India',
    TRUE,
    2,
    350000,
    550000,
    CURRENT_DATE + 45
FROM industries i
WHERE i.company_name = 'TechNova Solutions'
AND NOT EXISTS (
    SELECT 1
    FROM opportunities o
    WHERE o.title = 'Junior Python Developer'
      AND o.industry_id = i.industry_id
);


-- ============================================================
-- 8. OPPORTUNITY SKILLS
-- ============================================================

-- Machine Learning Intern
INSERT INTO opportunity_skills
(opportunity_id, skill_id, required_level, is_mandatory)
SELECT
    o.opportunity_id,
    s.skill_id,
    4,
    TRUE
FROM opportunities o
JOIN skills s ON s.skill_name = 'Python'
WHERE o.title = 'Machine Learning Intern'
ON CONFLICT DO NOTHING;


INSERT INTO opportunity_skills
(opportunity_id, skill_id, required_level, is_mandatory)
SELECT
    o.opportunity_id,
    s.skill_id,
    3,
    TRUE
FROM opportunities o
JOIN skills s ON s.skill_name = 'Machine Learning'
WHERE o.title = 'Machine Learning Intern'
ON CONFLICT DO NOTHING;


INSERT INTO opportunity_skills
(opportunity_id, skill_id, required_level, is_mandatory)
SELECT
    o.opportunity_id,
    s.skill_id,
    3,
    FALSE
FROM opportunities o
JOIN skills s ON s.skill_name = 'SQL'
WHERE o.title = 'Machine Learning Intern'
ON CONFLICT DO NOTHING;


-- Full Stack Developer
INSERT INTO opportunity_skills
(opportunity_id, skill_id, required_level, is_mandatory)
SELECT
    o.opportunity_id,
    s.skill_id,
    4,
    TRUE
FROM opportunities o
JOIN skills s ON s.skill_name = 'React'
WHERE o.title = 'Full Stack Developer Intern'
ON CONFLICT DO NOTHING;


INSERT INTO opportunity_skills
(opportunity_id, skill_id, required_level, is_mandatory)
SELECT
    o.opportunity_id,
    s.skill_id,
    3,
    TRUE
FROM opportunities o
JOIN skills s ON s.skill_name = 'SQL'
WHERE o.title = 'Full Stack Developer Intern'
ON CONFLICT DO NOTHING;


-- Python Developer
INSERT INTO opportunity_skills
(opportunity_id, skill_id, required_level, is_mandatory)
SELECT
    o.opportunity_id,
    s.skill_id,
    4,
    TRUE
FROM opportunities o
JOIN skills s ON s.skill_name = 'Python'
WHERE o.title = 'Junior Python Developer'
ON CONFLICT DO NOTHING;


INSERT INTO opportunity_skills
(opportunity_id, skill_id, required_level, is_mandatory)
SELECT
    o.opportunity_id,
    s.skill_id,
    3,
    TRUE
FROM opportunities o
JOIN skills s ON s.skill_name = 'FastAPI'
WHERE o.title = 'Junior Python Developer'
ON CONFLICT DO NOTHING;


-- ============================================================
-- 9. APPLICATIONS
-- ============================================================

INSERT INTO applications
(
    opportunity_id,
    student_id,
    status,
    cover_letter,
    match_score
)
SELECT
    o.opportunity_id,
    s.student_id,
    'shortlisted',
    'I am interested in this opportunity and have experience in Python and Machine Learning.',
    91.50
FROM opportunities o
JOIN students s ON s.student_code = 'STU001'
WHERE o.title = 'Machine Learning Intern'
ON CONFLICT (opportunity_id, student_id) DO NOTHING;


INSERT INTO applications
(
    opportunity_id,
    student_id,
    status,
    cover_letter,
    match_score
)
SELECT
    o.opportunity_id,
    s.student_id,
    'pending',
    'I am interested in full-stack development and have experience with React and SQL.',
    87.25
FROM opportunities o
JOIN students s ON s.student_code = 'STU002'
WHERE o.title = 'Full Stack Developer Intern'
ON CONFLICT (opportunity_id, student_id) DO NOTHING;


INSERT INTO applications
(
    opportunity_id,
    student_id,
    status,
    cover_letter,
    match_score
)
SELECT
    o.opportunity_id,
    s.student_id,
    'selected',
    'I would like to contribute my Python development skills to the company.',
    94.00
FROM opportunities o
JOIN students s ON s.student_code = 'STU003'
WHERE o.title = 'Junior Python Developer'
ON CONFLICT (opportunity_id, student_id) DO NOTHING;


-- ============================================================
-- 10. ASSESSMENTS
-- ============================================================

INSERT INTO assessments
(
    student_id,
    opportunity_id,
    assessed_by,
    technical_score,
    communication_score,
    problem_solving_score,
    overall_score,
    feedback
)
SELECT
    s.student_id,
    o.opportunity_id,
    u.user_id,
    92,
    88,
    94,
    91.33,
    'Strong technical understanding and good problem-solving ability.'
FROM students s
JOIN opportunities o
    ON o.title = 'Machine Learning Intern'
JOIN users u
    ON u.email = 'ananya.faculty@example.com'
WHERE s.student_code = 'STU001'
AND NOT EXISTS (
    SELECT 1
    FROM assessments a
    WHERE a.student_id = s.student_id
      AND a.opportunity_id = o.opportunity_id
);


-- ============================================================
-- 11. STUDENT PROJECTS
-- ============================================================

INSERT INTO student_projects
(
    student_id,
    title,
    description,
    technologies,
    github_url
)
SELECT
    s.student_id,
    'AI Career Recommendation System',
    'A system that recommends career opportunities based on student skills.',
    'Python, Machine Learning, PostgreSQL',
    'https://github.com/example/ai-career-system'
FROM students s
WHERE s.student_code = 'STU001'
AND NOT EXISTS (
    SELECT 1
    FROM student_projects p
    WHERE p.student_id = s.student_id
      AND p.title = 'AI Career Recommendation System'
);


INSERT INTO student_projects
(
    student_id,
    title,
    description,
    technologies,
    github_url
)
SELECT
    s.student_id,
    'Student Management Portal',
    'A web application for managing student information and academic records.',
    'React, FastAPI, PostgreSQL',
    'https://github.com/example/student-portal'
FROM students s
WHERE s.student_code = 'STU002'
AND NOT EXISTS (
    SELECT 1
    FROM student_projects p
    WHERE p.student_id = s.student_id
      AND p.title = 'Student Management Portal'
);


-- ============================================================
-- 12. NOTIFICATIONS
-- ============================================================

INSERT INTO notifications
(user_id, title, message)
SELECT
    u.user_id,
    'Application Shortlisted',
    'Your application for Machine Learning Intern has been shortlisted.'
FROM users u
WHERE u.email = 'aarav.student@example.com'
AND NOT EXISTS (
    SELECT 1
    FROM notifications n
    WHERE n.user_id = u.user_id
      AND n.title = 'Application Shortlisted'
);


INSERT INTO notifications
(user_id, title, message)
SELECT
    u.user_id,
    'New Opportunity',
    'A new Full Stack Developer internship is available.'
FROM users u
WHERE u.email = 'priya.student@example.com'
AND NOT EXISTS (
    SELECT 1
    FROM notifications n
    WHERE n.user_id = u.user_id
      AND n.title = 'New Opportunity'
);


-- ============================================================
-- SEED DATA COMPLETED
-- ============================================================