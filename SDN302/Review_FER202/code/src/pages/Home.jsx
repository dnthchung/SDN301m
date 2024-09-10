import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  //Q1
  useEffect(() => {
    (async () => {
      try {
        const studentData = (await axios.get("http://localhost:3000/students")).data;
        const courseData = (await axios.get("http://localhost:3000/courses")).data;
        setStudents(studentData);
        setCourses(courseData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  // Q2
  const handleStudentClick = async (studentId) => {
    try {
      setSelectedStudent(studentId);
      const enrollmentData = (await axios.get(`http://localhost:3000/enrollments?studentId=${studentId}`)).data;
      setEnrollments(enrollmentData);
    } catch (error) {
      console.log(error);
    }
  };

  // Q3
  const handleAddStudent = async () => {
    const name = prompt("Enter the student's name:");
    const email = prompt("Enter the student's email:");

    if (!name || !name.trim()) {
      alert("Name is required.");
      return;
    }
    if (!email || !email.trim()) {
      alert("Email is required.");
      return;
    }

    try {
      const newStudent = { name, email };
      const response = await axios.post("http://localhost:3000/students", newStudent);

      setStudents([...students, response.data]);
      alert("Student added successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add student.");
    }
  };

  // Q4
  const handleAddCourse = async () => {
    const title = prompt("Enter the course's title:");
    const description = prompt("Enter the course's description:");

    if (!title || !title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!description || !description.trim()) {
      alert("Description is required.");
      return;
    }

    try {
      const newCourse = { title, description };
      const response = await axios.post("http://localhost:3000/courses", newCourse);

      setCourses([...courses, response.data]);
      alert("Course added successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to add course.");
    }
  };

  // Q5
  const handleEnrollToCourse = async () => {
    if (!selectedStudent) {
      alert("Please select a student first.");
      return;
    }

    const courseId = prompt(`Enter the ID of the course to enroll the student in:\n${courses.map((course) => `ID: ${course.id}, Title: ${course.title}`).join("\n")}`);

    if (!courseId || !courseId.trim()) {
      alert("Course ID is required.");
      return;
    }

    const selectedCourse = courses.find((course) => course.id === parseInt(courseId, 10));

    if (!selectedCourse) {
      alert("Invalid course ID.");
      return;
    }

    // check trùng khóa học
    const alreadyEnrolled = enrollments.some((enrollment) => enrollment.courseId === parseInt(courseId, 10));

    if (alreadyEnrolled) {
      alert("The student is already enrolled in this course.");
      return;
    }

    try {
      const newEnrollment = { studentId: selectedStudent, courseId: parseInt(courseId, 10) };
      const response = await axios.post("http://localhost:3000/enrollments", newEnrollment);

      setEnrollments([...enrollments, response.data]); // Update enrollments state with new enrollment
      alert("Student enrolled in the course successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to enroll student.");
    }
  };

  //Q6\
  const handleDeleteStudent = async (id) => {
    try {
      const studentEnrollments = enrollments.filter((enrollment) => enrollment.studentId === id);
      for (const enrollment of studentEnrollments) {
        await axios.delete(`http://localhost:3000/enrollments/${enrollment.id}`);
      }

      await axios.delete(`http://localhost:3000/students/${id}`);

      setStudents(students.filter((student) => student.id !== id));
      setEnrollments(enrollments.filter((enrollment) => enrollment.studentId !== id));
      setSelectedStudent(null);

      alert("Student and their enrollments deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete student.");
    }
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      const courseEnrollments = enrollments.filter((enrollment) => enrollment.courseId === courseId);
      for (const enrollment of courseEnrollments) {
        await axios.delete(`http://localhost:3000/enrollments/${enrollment.id}`);
      }

      await axios.delete(`http://localhost:3000/courses/${courseId}`);

      setCourses(courses.filter((course) => course.id !== courseId));
      setEnrollments(enrollments.filter((enrollment) => enrollment.courseId !== courseId));
      setSelectedStudent(null);

      alert("Course and its enrollments deleted successfully!");
    } catch (error) {
      console.log(error);
      alert("Failed to delete course.");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <button onClick={handleAddStudent} className="bg-green-500 text-white px-4 py-2 rounded mb-4">
          Add new student
        </button>
        <button onClick={handleAddCourse} className="bg-red-500 text-white px-4 py-2 rounded mb-4">
          Add new course
        </button>
      </div>

      {/* ==================== Student and Course Tables ==================== */}
      <div className="flex justify-between">
        {/* Student Table */}
        <div>
          <h1 className="text-2xl font-bold mb-4">Danh sách học viên</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">ID</th>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">Name</th>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">Email</th>
                  <th className="px-4 py-2 text-left text-red-400 font-semibold">action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="odd:bg-white even:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-2 border-t" onClick={() => handleStudentClick(student.id)}>
                      {student.id}
                    </td>
                    <td className="px-4 py-2 border-t" onClick={() => handleStudentClick(student.id)}>
                      {student.name}
                    </td>
                    <td className="px-4 py-2 border-t">{student.email}</td>
                    <td className="px-4 py-2 border-t">
                      <button onClick={() => handleDeleteStudent(student.id)} className="bg-red-400 text-white px-2 py-1 rounded">
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Course Table */}
        <div>
          <h1 className="text-2xl font-bold mt-8 mb-4">Danh sách khóa học</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">ID</th>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">Title</th>
                  <th className="px-4 py-2 text-left text-gray-700 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-2 border-t">{course.id}</td>
                    <td className="px-4 py-2 border-t">{course.title}</td>
                    <td className="px-4 py-2 border-t">{course.description}</td>
                    <td className="px-4 py-2 border-t">
                      <button onClick={() => handleDeleteCourse(course.id)} className="bg-red-400 text-white px-2 py-1 rounded">
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ==================== Enrollments Section ==================== */}
      <div className="w-1/2 mt-10">
        {selectedStudent && (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold mt-8 mb-4">Khóa học đã đăng ký của học viên {selectedStudent}</h1>
              <button onClick={handleEnrollToCourse} className="bg-blue-500 text-white px-4 py-2 rounded mb-2">
                Enroll to new course
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Course ID</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Course Title</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Description</th>
                    <th className="px-4 py-2 text-left text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.length > 0 ? (
                    enrollments.map((enrollment) => {
                      const course = courses.find((c) => c.id === enrollment.courseId);
                      return (
                        <tr key={course.id} className="odd:bg-white even:bg-gray-50">
                          <td className="px-4 py-2 border-t">{course.id}</td>
                          <td className="px-4 py-2 border-t">{course.title}</td>
                          <td className="px-4 py-2 border-t">{course.description}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-center">
                        Học viên chưa đăng ký khóa học nào.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
