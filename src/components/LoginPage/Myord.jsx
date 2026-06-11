import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Myord.css";

const STATUS_LABEL = {
  delivered: "Delivered",
  pending: "In Progress",
  cancelled: "Cancelled",
};

function Myord() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) navigate("/loginn", { replace: true });
  }, [navigate]);

  // Read orders from localStorage (re-reads every time this page mounts)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("myorders") || "[]");
    setOrders(saved);
  }, []);

  const totalSpent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce(
      (sum, o) => sum + parseFloat(o.amount.replace("$", "").replace(",", "")),
      0
    );

  const delivered = orders.filter((o) => o.status === "delivered").length;
  const pending = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="myord-container">

      <div className="myord-header">
        <h2>My Orders</h2>
        <p>Track and review all your enrolled courses and orders.</p>
      </div>

      {orders.length > 0 ? (
        <>
          

          <div className="orders-list-header">
            <h3>Order History</h3>
            <span className="orders-count">{orders.length}</span>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-info">
                  <p className="order-title">{order.title}</p>
                  <p className="order-meta">
                    {order.id} · {order.date}
                  </p>
                </div>
                <div className="order-right">
                  <span className="order-amount">{order.amount}</span>
                  <span className={`order-status status-${order.status}`}>
                    {STATUS_LABEL[order.status] ?? order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="orders-empty">
          <h3>No orders yet</h3>
          <p>Enroll in a course and it'll show up here.</p>
          <button className="browse-btn" onClick={() => navigate("/courses")}>
            Browse Courses →
          </button>
        </div>
      )}

    </div>
  );
}

export default Myord;