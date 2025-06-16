import pool from '@/lib/db';

async function getStudentData() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        s.id,
        s.name,
        array_agg(c.name) as courses,
        COALESCE(SUM(f.amount), 0) as fees_paid,
        s.total_fees - COALESCE(SUM(f.amount), 0) as remaining_balance
      FROM students s
      LEFT JOIN student_courses sc ON s.id = sc.student_id
      LEFT JOIN courses c ON sc.course_id = c.id
      LEFT JOIN fees f ON s.id = f.student_id
      GROUP BY s.id, s.name, s.total_fees
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

async function getLecturerData() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        l.id,
        l.name,
        l.department,
        json_agg(json_build_object(
          'id', ta.id,
          'name', ta.name
        )) as teaching_assistants
      FROM lecturers l
      LEFT JOIN teaching_assistants ta ON l.id = ta.lecturer_id
      GROUP BY l.id, l.name, l.department
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

export default async function DashboardPage() {
  const [studentData, lecturerData] = await Promise.all([
    getStudentData(),
    getLecturerData()
  ]);

  return {
    studentData,
    lecturerData
  };
} 