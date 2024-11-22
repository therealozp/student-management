-- Insert Enrollment Data
INSERT INTO Enrollments (user_id, CRN, semester, grade)
VALUES
    -- Student 1: Computer Science
    ('ST001', 10101, 'F', 'A'), -- Completed
    ('ST001', 10202, 'S', 'A'), -- Completed
    ('ST001', 20101, 'F', NULL), -- In Progress
    ('ST001', 20202, 'S', NULL), -- In Progress

    -- Student 2: Mathematics
    ('ST002', 10303, 'F', 'B'), -- Completed
    ('ST002', 10404, 'S', 'B'), -- Completed
    ('ST002', 20303, 'F', NULL), -- In Progress

    -- Student 3: Physics
    ('ST003', 10505, 'S', 'A'), -- Completed
    ('ST003', 10606, 'F', 'A'), -- Completed
    ('ST003', 20606, 'S', NULL), -- In Progress

    -- Student 4: English
    ('ST004', 10707, 'F', 'B'), -- Completed
    ('ST004', 20707, 'S', NULL), -- In Progress
    ('ST004', 20808, 'U', NULL), -- In Progress

    -- Student 5: History
    ('ST005', 10909, 'S', 'A'), -- Completed
    ('ST005', 11010, 'F', 'B'), -- Completed
    ('ST005', 21010, 'U', NULL); -- In Progress
