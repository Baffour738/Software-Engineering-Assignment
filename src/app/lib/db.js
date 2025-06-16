import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
});

export async function getStudentData() {
  const query = `
    SELECT 
      s.student_id as id,
      CONCAT(s.first_name, ' ', s.last_name) as name,
      s.department,
      s.enrollment_year,
      ARRAY_AGG(DISTINCT c.course_name) as courses,
      COALESCE(SUM(f.total_fee), 0) as total_fee,
      COALESCE(SUM(f.amount_paid), 0) as fees_paid,
      COALESCE(SUM(f.total_fee - f.amount_paid), 0) as remaining_balance
    FROM students s
    LEFT JOIN enrollments e ON s.student_id = e.student_id
    LEFT JOIN courses c ON e.course_id = c.course_id
    LEFT JOIN fees f ON s.student_id = f.student_id
    GROUP BY s.student_id, s.first_name, s.last_name, s.department, s.enrollment_year
    ORDER BY s.student_id;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error;
  }
}

export async function getLecturerData() {
  const query = `
    SELECT 
      l.lecturer_id as id,
      l.full_name as name,
      l.email,
      ARRAY_AGG(DISTINCT c.course_name) as courses,
      ARRAY_AGG(DISTINCT ta.ta_name) as teaching_assistants
    FROM lecturers l
    LEFT JOIN lecturer_course lc ON l.lecturer_id = lc.lecturer_id
    LEFT JOIN courses c ON lc.course_id = c.course_id
    LEFT JOIN ta_assignments ta ON l.lecturer_id = ta.lecturer_id
    GROUP BY l.lecturer_id, l.full_name, l.email
    ORDER BY l.lecturer_id;
  `;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching lecturer data:', error);
    throw error;
  }
} 