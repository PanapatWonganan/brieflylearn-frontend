-- ===============================================
-- 🏋️ FITNESS LMS DATABASE SCHEMA
-- ===============================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ===============================================
-- 1. USERS TABLE (ผู้ใช้ระบบ)
-- ===============================================
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    avatar_url VARCHAR(500),
    role ENUM('student', 'instructor', 'admin') DEFAULT 'student',
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 2. CATEGORIES TABLE (หมวดหมู่คอร์ส)
-- ===============================================
CREATE TABLE categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 3. COURSES TABLE (คอร์สเรียน)
-- ===============================================
CREATE TABLE courses (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    instructor_id VARCHAR(36) NOT NULL,
    category_id VARCHAR(36) NOT NULL,
    level ENUM('beginner', 'intermediate', 'advanced', 'expert') NOT NULL,
    duration_weeks INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    original_price DECIMAL(10,2) NULL,
    thumbnail_url VARCHAR(500),
    trailer_video_url VARCHAR(500),
    is_published BOOLEAN DEFAULT FALSE,
    rating DECIMAL(2,1) DEFAULT NULL,
    total_students INT DEFAULT 0,
    total_lessons INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (instructor_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
    INDEX idx_instructor (instructor_id),
    INDEX idx_category (category_id),
    INDEX idx_level (level),
    INDEX idx_published (is_published),
    INDEX idx_rating (rating)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 4. LESSONS TABLE (บทเรียน)
-- ===============================================
CREATE TABLE lessons (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    course_id VARCHAR(36) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    video_url VARCHAR(500),
    duration_minutes INT NOT NULL,
    order_index INT NOT NULL,
    is_free BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_course (course_id),
    INDEX idx_order (course_id, order_index),
    INDEX idx_free (is_free)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 5. ENROLLMENTS TABLE (การลงทะเบียนเรียน)
-- ===============================================
CREATE TABLE enrollments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    payment_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    INDEX idx_user (user_id),
    INDEX idx_course (course_id),
    INDEX idx_payment_status (payment_status),
    INDEX idx_enrolled_date (enrolled_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 6. LESSON_PROGRESS TABLE (ความก้าวหน้าของบทเรียน)
-- ===============================================
CREATE TABLE lesson_progress (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    lesson_id VARCHAR(36) NOT NULL,
    completed_at TIMESTAMP NULL,
    watch_time_minutes INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    last_watched_position INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY unique_progress (user_id, lesson_id),
    INDEX idx_user (user_id),
    INDEX idx_lesson (lesson_id),
    INDEX idx_completed (is_completed)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 7. REVIEWS TABLE (รีวิวคอร์ส)
-- ===============================================
CREATE TABLE reviews (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_review (user_id, course_id),
    INDEX idx_course_rating (course_id, rating),
    INDEX idx_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 8. CERTIFICATES TABLE (ใบประกาศนียบัตร)
-- ===============================================
CREATE TABLE certificates (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id VARCHAR(36) NOT NULL,
    course_id VARCHAR(36) NOT NULL,
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_url VARCHAR(500),
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_certificate (user_id, course_id),
    INDEX idx_certificate_number (certificate_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- 9. PAYMENTS TABLE (ประวัติการชำระเงิน)
-- ===============================================
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    enrollment_id VARCHAR(36) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'THB',
    payment_method VARCHAR(50) NOT NULL,
    transaction_id VARCHAR(100) UNIQUE,
    gateway_response JSON,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    processed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(id) ON DELETE CASCADE,
    INDEX idx_enrollment (enrollment_id),
    INDEX idx_transaction (transaction_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===============================================
-- VIEWS (มุมมองสำหรับการใช้งาน)
-- ===============================================

-- Course Statistics View
CREATE VIEW course_stats AS
SELECT 
    c.id,
    c.title,
    c.instructor_id,
    u.full_name as instructor_name,
    cat.name as category_name,
    COUNT(e.id) as total_enrollments,
    AVG(r.rating) as avg_rating,
    COUNT(r.id) as total_reviews,
    SUM(CASE WHEN e.payment_status = 'completed' THEN e.payment_amount ELSE 0 END) as total_revenue
FROM courses c
LEFT JOIN users u ON c.instructor_id = u.id
LEFT JOIN categories cat ON c.category_id = cat.id
LEFT JOIN enrollments e ON c.id = e.course_id
LEFT JOIN reviews r ON c.id = r.course_id
GROUP BY c.id, c.title, c.instructor_id, u.full_name, cat.name;

-- User Progress View
CREATE VIEW user_progress AS
SELECT 
    e.user_id,
    e.course_id,
    c.title as course_title,
    COUNT(l.id) as total_lessons,
    COUNT(lp.id) as completed_lessons,
    ROUND((COUNT(lp.id) * 100.0 / NULLIF(COUNT(l.id), 0)), 2) as progress_percentage
FROM enrollments e
JOIN courses c ON e.course_id = c.id
LEFT JOIN lessons l ON c.id = l.course_id
LEFT JOIN lesson_progress lp ON l.id = lp.lesson_id AND lp.user_id = e.user_id AND lp.is_completed = TRUE
WHERE e.payment_status = 'completed'
GROUP BY e.user_id, e.course_id, c.title;

-- ===============================================
-- TRIGGERS (อัปเดตอัตโนมัติ)
-- ===============================================

-- Update course rating when new review added
DELIMITER $$
CREATE TRIGGER update_course_rating_after_review
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE courses 
    SET rating = (
        SELECT AVG(rating) 
        FROM reviews 
        WHERE course_id = NEW.course_id
    )
    WHERE id = NEW.course_id;
END$$

-- Update course rating when review updated
CREATE TRIGGER update_course_rating_after_review_update
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    UPDATE courses 
    SET rating = (
        SELECT AVG(rating) 
        FROM reviews 
        WHERE course_id = NEW.course_id
    )
    WHERE id = NEW.course_id;
END$$

-- Update enrollment progress
CREATE TRIGGER update_enrollment_progress
AFTER UPDATE ON lesson_progress
FOR EACH ROW
BEGIN
    IF NEW.is_completed = TRUE AND (OLD.is_completed = FALSE OR OLD.is_completed IS NULL) THEN
        UPDATE enrollments e
        SET progress_percentage = (
            SELECT ROUND((COUNT(lp.id) * 100.0 / 
                (SELECT COUNT(*) FROM lessons WHERE course_id = 
                    (SELECT course_id FROM lessons WHERE id = NEW.lesson_id)
                )
            ), 2)
            FROM lesson_progress lp
            JOIN lessons l ON lp.lesson_id = l.id
            WHERE lp.user_id = NEW.user_id 
            AND l.course_id = (SELECT course_id FROM lessons WHERE id = NEW.lesson_id)
            AND lp.is_completed = TRUE
        )
        WHERE user_id = NEW.user_id 
        AND course_id = (SELECT course_id FROM lessons WHERE id = NEW.lesson_id);
        
        -- Check if course is completed (100%)
        UPDATE enrollments 
        SET completed_at = CURRENT_TIMESTAMP
        WHERE user_id = NEW.user_id 
        AND course_id = (SELECT course_id FROM lessons WHERE id = NEW.lesson_id)
        AND progress_percentage = 100.00
        AND completed_at IS NULL;
    END IF;
END$$

-- Update course total students count
CREATE TRIGGER update_course_students_count
AFTER INSERT ON enrollments
FOR EACH ROW
BEGIN
    IF NEW.payment_status = 'completed' THEN
        UPDATE courses 
        SET total_students = (
            SELECT COUNT(*) 
            FROM enrollments 
            WHERE course_id = NEW.course_id 
            AND payment_status = 'completed'
        )
        WHERE id = NEW.course_id;
    END IF;
END$$

-- Update course lessons count
CREATE TRIGGER update_course_lessons_count
AFTER INSERT ON lessons
FOR EACH ROW
BEGIN
    UPDATE courses 
    SET total_lessons = (
        SELECT COUNT(*) 
        FROM lessons 
        WHERE course_id = NEW.course_id
    )
    WHERE id = NEW.course_id;
END$$

DELIMITER ;

-- ===============================================
-- SAMPLE DATA (ข้อมูลตัวอย่าง)
-- ===============================================

-- Insert Categories
INSERT INTO categories (id, name, slug, description, icon, sort_order) VALUES
(UUID(), 'โยคะ', 'yoga', 'คลาสโยคะสำหรับทุกระดับ', '🧘‍♀️', 1),
(UUID(), 'HIIT', 'hiit', 'High Intensity Interval Training', '🔥', 2),
(UUID(), 'กล้ามเนื้อ', 'strength', 'เสริมสร้างกล้ามเนื้อและความแข็งแรง', '💪', 3),
(UUID(), 'คาร์ดิโอ', 'cardio', 'ออกกำลังกายเพื่อหัวใจและปอด', '❤️', 4),
(UUID(), 'พิลาทิส', 'pilates', 'เสริมสร้างความแข็งแรงของกล้ามเนื้อแกนกลาง', '🏃‍♀️', 5);

-- Insert Admin User
INSERT INTO users (id, email, password_hash, full_name, role, email_verified) VALUES
(UUID(), 'admin@fitness-lms.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewflcZ5yhPNY3TnG', 'ผู้ดูแลระบบ', 'admin', TRUE);

-- Insert Sample Instructors
INSERT INTO users (id, email, password_hash, full_name, role, email_verified) VALUES
(UUID(), 'instructor1@fitness-lms.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewflcZ5yhPNY3TnG', 'อาจารย์นิดา สมบูรณ์', 'instructor', TRUE),
(UUID(), 'instructor2@fitness-lms.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewflcZ5yhPNY3TnG', 'ครูสมชาย แข็งแรง', 'instructor', TRUE),
(UUID(), 'instructor3@fitness-lms.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewflcZ5yhPNY3TnG', 'โค้ชมาลี ฟิตเนส', 'instructor', TRUE);

SET FOREIGN_KEY_CHECKS = 1;

-- Success Message
SELECT '🎉 FITNESS LMS DATABASE INITIALIZED SUCCESSFULLY!' as message;