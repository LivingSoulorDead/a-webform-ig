import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Myord.css";

// Replace this with real data from your API/state
const MOCK_ORDERS = [
  { id: "#ORD-1042", title: "Brand Identity Package", date: "Jun 5, 2025", amount: "$240.00", status: "delivered", icon: "🎨" },
  { id: "#ORD-1039", title: "Logo Design – Premium", date: "May 28, 2025", amount: "$95.00", status: "delivered", icon: "✏️" },
  { id: "#ORD-1035", title: "Social Media Kit", date: "May 14, 2025", amount: "$60.00", status: "pending", icon: "📱" },
  { id: "#ORD-1028", title: "UI Mockup – 5 Screens", date: "Apr 30, 2025", amount: "$180.00", status: "cancelled", icon: "🖥️" },
];

const STATUS_LABEL = {
  delivered: "Delivered",
  pending: "In Progress",
  cancelled: "Cancelled",
};

function Myord() {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/loginn", { replace: true });
    }
  }, [navigate]);

  const orders = MOCK_ORDERS; // swap with real data

  const totalSpent = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + parseFloat(o.amount.replace("$", "").replace(",", "")), 0);

  const delivered = orders.filter((o) => o.status === "delivered").length;
  const pending = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="myord-container">

      {/* Header */}
      <div className="myord-header">
        <h2>My Orders</h2>
        <p>Track and review all your past and current orders.</p>
      </div>

      {/* Summary */}
      {orders.length > 0 && (
        <div className="order-summary-row">
          <div className="summary-card">
            <div className="summary-card-value">{orders.length}</div>
            <div className="summary-card-label">Total Orders</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-value">${totalSpent.toFixed(0)}</div>
            <div className="summary-card-label">Total Spent</div>
          </div>
          <div className="summary-card">
            <div className="summary-card-value">{pending > 0 ? pending : delivered}</div>
            <div className="summary-card-label">{pending > 0 ? "In Progress" : "Delivered"}</div>
          </div>
        </div>
      )}

      {/* Orders */}
      {orders.length > 0 ? (
        <>
          <div className="orders-list-header">
            <h3>Order History</h3>
          </div>
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-icon">{order.icon}</div>
                <div className="order-info">
                  <p className="order-title">{order.title}</p>
                  <p className="order-meta">{order.id} · {order.date}</p>
                </div>
                <div className="order-right">
                  <span className="order-amount">{order.amount}</span>
                  <span className={`order-status status-${order.status}`}>
                    {STATUS_LABEL[order.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="orders-empty">
          <span className="orders-empty-icon">📦</span>
          <h3>No orders yet</h3>
          <p>Once you place an order, it'll show up here.</p>
        </div>
      )}

    </div>
  );
}

export default Myord;