import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./courses.css";

function Courses() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/loginn", { replace: true });
    }
  }, [navigate]);

  const courses = [
    { id: 1, title: "Lorem", description: "Ipsum" },
    { id: 2, title: "Lorem", description: "Ipsum" },
    { id: 3, title: "Ipsum", description: "Lorem" },
    { id: 4, title: "Ipsum", description: "Lorem" },
  ];

  return (
    <div className="courses-container">
      <h2 className="courses-title">Courses</h2>

      <div className="courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <button className="enroll-btn">Enroll Now</button>
          </div>
        ))}
      </div>

      <div className="courses-footer">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>
    </div>
  );
}

export default Courses;