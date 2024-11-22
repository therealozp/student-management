INSERT INTO Users (user_id, password, name, email, role, dob, u_number, department_id, college)
VALUES
    -- Advisors
    ('A001', 'pass123', 'Ellen Joe', 'ellen.joe@zzz.edu', 'advisor', '1985-04-01', 'U12345678', 1, 'Engineering'),
    ('A002', 'pass123', 'Von Lycaon', 'von.lycaon@zzz.edu', 'advisor', '1978-12-15', 'U87654321', 2, 'Science'),

    -- Staff
    ('S001', 'pass123', 'Grace Howard', 'grace.howard@zzz.edu', 'staff', '1990-07-11', 'U23456789', 3, 'Science'),
    ('S002', 'pass123', 'Anton Ivanov', 'anton.ivanov@zzz.edu', 'staff', '1982-03-22', 'U34567890', 4, 'Arts'),

    -- Students
    ('ST001', 'pass123', 'Alexandrina Sebastiane', 'alex.seb@zzz.edu', 'student', '2002-06-15', 'U45678901', 1, 'Engineering'),
    ('ST002', 'pass123', 'Koleda Belobog', 'koleda.belobog@zzz.edu', 'student', '2001-09-08', 'U56789012', 2, 'Science'),
    ('ST003', 'pass123', 'Zhu Yuan', 'zhu.yuan@zzz.edu', 'student', '2000-11-23', 'U67890123', 3, 'Science'),
    ('ST004', 'pass123', 'Nekomiya Mana', 'neko.mana@zzz.edu', 'student', '2003-02-14', 'U78901234', 4, 'Arts'),
    ('ST005', 'pass123', 'Jane Doe', 'jane.doe@zzz.edu', 'student', '2002-05-30', 'U69696969', 3, 'Arts'),

    -- Instructors
    ('I002', 'pass123', 'Nicole Demara', 'nicole.demara@zzz.edu', 'instructor', '1985-10-20', 'U90123456', 1, 'Engineering'),
    ('I001', 'pass123', 'Billy Kid', 'billy.kid@zzz.edu', 'instructor', '1970-05-19', 'U89012345', 5, 'Arts'),
    ('I003', 'pass123', 'Corin Wickes', 'corin.wickes@zzz.edu', 'instructor', '1975-08-25', 'U01234567', 3, 'Science'),
    ('I004', 'pass123', 'Piper Wheel', 'piper.wheel@zzz.edu', 'instructor', '1988-12-30', 'U11234567', 2, 'Science');

INSERT INTO Students (user_id, major, year, gpa, courses_taken, courses_in_progress)
VALUES
    ('ST001', 'Computer Science', 2, 3.9, JSON_ARRAY(10101, 10202), JSON_ARRAY(20101, 20202)),
    ('ST002', 'Mathematics', 3, 3.5, JSON_ARRAY(10303, 10404), JSON_ARRAY(20303)),
    ('ST003', 'Physics', 4, 3.8, JSON_ARRAY(10505, 10606), JSON_ARRAY(20606)),
    ('ST004', 'English', 1, 3.2, JSON_ARRAY(10707), JSON_ARRAY(20707, 20808)),
    ('ST005', 'History', 2, 3.6, JSON_ARRAY(10909, 11010), JSON_ARRAY(21010));

INSERT INTO Advisors (user_id, department_id)
VALUES
    ('A001', 1), -- Ellen Joe -> Computer Science
    ('A002', 2); -- Von Lycaon -> Mathematics

INSERT INTO Staff (user_id)
VALUES
    ('S001'), -- Grace Howard
    ('S002'); -- Anton Ivanov

INSERT INTO Instructors (user_id, courses_teaching)
VALUES
    ('I001', JSON_ARRAY(30101, 30202)), -- Billy Kid
    ('I002', JSON_ARRAY(30303)),       -- Nicole Demara
    ('I003', JSON_ARRAY(30404, 30505)),-- Corin Wickes
    ('I004', JSON_ARRAY(30606));       -- Piper Wheel