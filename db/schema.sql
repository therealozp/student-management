-- Create Departments Table
CREATE TABLE Departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(100) UNIQUE NOT NULL,
    college VARCHAR(100) NOT NULL
);

-- Create Users Table
CREATE TABLE Users (
    user_id VARCHAR(20) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('student', 'advisor', 'instructor', 'staff') NOT NULL,
    dob DATE NOT NULL,
    u_number CHAR(10) UNIQUE CHECK (u_number LIKE 'U%'),
    department_id INT,
    college VARCHAR(100) NOT NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Create Students Table
CREATE TABLE Students (
    user_id VARCHAR(20) PRIMARY KEY,
    major VARCHAR(100) NOT NULL,
    year INT CHECK (year BETWEEN 1 AND 4),
    gpa FLOAT CHECK (gpa BETWEEN 0.0 AND 4.0),
    courses_taken JSON DEFAULT NULL,
    courses_in_progress JSON DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Instructors Table
CREATE TABLE Instructors (
    user_id VARCHAR(20) PRIMARY KEY,
    courses_teaching JSON,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Advisors Table
CREATE TABLE Advisors (
    user_id VARCHAR(20),
    department_id INT,
    PRIMARY KEY (user_id, department_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Create Staff Table
CREATE TABLE Staff (
    user_id VARCHAR(20) PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Create Courses Table
CREATE TABLE Courses (
    CRN INT UNIQUE PRIMARY KEY NOT NULL,
    course_name VARCHAR(100) NOT NULL,
    prefix VARCHAR(10) NOT NULL,
    course_number INT CHECK (course_number BETWEEN 1000 AND 9999) NOT NULL,
    capacity INT CHECK (capacity > 0) NOT NULL,
    enrolled INT DEFAULT 0 CHECK (enrolled >= 0),
    instructor_id VARCHAR(20),
    department_id INT NOT NULL,
    section_number INT DEFAULT 1,
    FOREIGN KEY (instructor_id) REFERENCES Users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

-- Create Enrollments Table
CREATE TABLE Enrollments (
    user_id VARCHAR(20),
    CRN INT,
    semester ENUM('S', 'F', 'U') NOT NULL,
    grade ENUM('A', 'B', 'C', 'D', 'F', 'I', 'S', 'U') DEFAULT NULL,
    PRIMARY KEY (user_id, CRN, semester),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (CRN) REFERENCES Courses(CRN)
);

-- Create Logs Table
CREATE TABLE Logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id VARCHAR(20),
    operation_type ENUM('ADD', 'MODIFY', 'DELETE', 'VIEW') NOT NULL,
    entity_type ENUM('student', 'instructor', 'staff', 'advisor', 'course', 'department') NOT NULL,
    old_value JSON,
    new_value JSON,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
