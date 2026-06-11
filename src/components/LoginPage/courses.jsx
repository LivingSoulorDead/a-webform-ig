import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./courses.css";

const COURSES = [
  { id: 1, title: "Lorem", description: "Ipsum",  price: "$00.00" },
  { id: 2, title: "Lorem", description: "Ipsum", price: "$00.00" },
  { id: 3, title: "Ipsum", description: "Lorem",  price: "$00.00" },
  { id: 4, title: "Ipsum", description: "Lorem", price: "$00.00" },
];

function Courses() {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) navigate("/loginn", { replace: true });
  }, [navigate]);

  // Load enrolled course IDs from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myorders") || "[]");
    // Filter out any entries missing courseId (defensive guard)
    const ids = saved
      .filter((o) => o.courseId !== undefined && o.courseId !== null)
      .map((o) => Number(o.courseId)); // normalize to number
    setEnrolled(ids);
  }, []);

  const handleEnroll = (course) => {
    const existing = JSON.parse(localStorage.getItem("myorders") || "[]");
    const alreadyEnrolled = existing.some((o) => Number(o.courseId) === course.id);

    if (alreadyEnrolled) {
      setFlash({ id: course.id, msg: "Already enrolled!" });
      setTimeout(() => setFlash(null), 2000);
      return;
    }

    const newOrder = {
      id: `#ORD-${Date.now()}`,
      courseId: course.id,          // stored as number
      title: course.title,
      icon: course.icon,
      amount: course.price,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: "pending",
    };

    const updated = [...existing, newOrder];
    localStorage.setItem("myorders", JSON.stringify(updated));
    setEnrolled((prev) => [...prev, course.id]);
    setFlash({ id: course.id, msg: "Enrolled! ✓" });
    setTimeout(() => setFlash(null), 2000);
  };

  return (
    <div className="courses-container">
      <h2 className="courses-title">Courses</h2>

      <div className="courses-grid">
        {COURSES.map((course) => {
          const isEnrolled = enrolled.includes(course.id);
          const isFlashing = flash?.id === course.id;
          return (
            <div key={course.id} className="course-card">
              <div className="course-icon">{course.icon}</div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="course-price">{course.price}</div>
              <button
                className={`enroll-btn${isEnrolled ? " enrolled" : ""}`}
                onClick={() => !isEnrolled && handleEnroll(course)}
                disabled={isEnrolled}
              >
                {isFlashing ? flash.msg : isEnrolled ? "Enrolled ✓" : "Enroll Now"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="courses-footer">
        <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
      </div>
    </div>
  );
}

export default Courses;