INSERT INTO Courses (CRN, course_name, prefix, course_number, capacity, enrolled, instructor_id, department_id)
VALUES
    -- Computer Science Courses
    (10101, 'Introduction to Programming', 'CSE', 1010, 60, 45, 'I002', 1), -- Nicole Demara
    (10202, 'Data Structures and Algorithms', 'CSE', 1020, 50, 40, 'I002', 1), -- Nicole Demara
    (20101, 'Database Systems', 'CSE', 2010, 50, 30, 'I002', 1), -- Nicole Demara
    (20202, 'Computer Networks', 'CSE', 2020, 40, 35, 'I002', 1), -- Nicole Demara

    -- Mathematics Courses
    (10303, 'Calculus I', 'MATH', 1030, 80, 75, 'I004', 2), -- Piper Wheel
    (10404, 'Linear Algebra', 'MATH', 1040, 70, 68, 'I004', 2), -- Piper Wheel
    (20303, 'Differential Equations', 'MATH', 2030, 50, 45, 'I004', 2), -- Piper Wheel

    -- Physics Courses
    (10505, 'Classical Mechanics', 'PHYS', 1050, 40, 35, 'I003', 3), -- Corin Wickes
    (10606, 'Quantum Physics', 'PHYS', 1060, 30, 28, 'I003', 3), -- Corin Wickes
    (20606, 'Thermodynamics', 'PHYS', 2060, 50, 50, 'I003', 3), -- Corin Wickes

    -- English Courses
    (10707, 'Introduction to Literature', 'ENG', 1070, 100, 98, 'I001', 4), -- Billy Kid
    (20707, 'Creative Writing', 'ENG', 2070, 50, 45, 'I001', 4), -- Billy Kid
    (20808, 'Shakespeare Studies', 'ENG', 2080, 30, 25, 'I001', 4), -- Billy Kid

    -- History Courses
    (10909, 'World History I', 'HIST', 1090, 80, 60, 'I001', 4), -- Billy Kid
    (11010, 'World History II', 'HIST', 1100, 80, 78, 'I001', 4), -- Billy Kid
    (21010, 'American Revolution', 'HIST', 2100, 40, 38, 'I001', 4); -- Billy Kid
