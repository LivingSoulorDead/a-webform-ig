import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Mydes.css";

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function Mydes() {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      navigate("/loginn", { replace: true });
    }
  }, [navigate]);

  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter((f) =>
      f.type.startsWith("image/")
    );

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDesigns((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            name: file.name,
            size: formatBytes(file.size),
            src: e.target.result,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = ""; // reset so same file can be re-uploaded
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDelete = (id) => {
    setDesigns((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="mydes-container">

      {/* Header */}
      <div className="mydes-header">
        <h2>My Designs</h2>
        <p>Upload and manage your design files in one place.</p>
      </div>

      {/* Upload Zone */}
      <div
        className={`upload-zone${dragOver ? " drag-over" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleInputChange}
        />
        <span className="upload-icon">🖼️</span>
        <h3>Drop images here</h3>
        <p>or click anywhere to browse your files</p>
        <span className="upload-btn">Choose Files</span>
        <div className="upload-formats">
          {["PNG", "JPG", "WEBP", "GIF", "SVG"].map((fmt) => (
            <span className="format-tag" key={fmt}>{fmt}</span>
          ))}
        </div>
      </div>

      {/* Gallery */}
      {designs.length > 0 && (
        <>
          <div className="mydes-gallery-header">
            <h3>Uploaded Designs</h3>
            <span className="gallery-count">{designs.length}</span>
          </div>
          <div className="designs-grid">
            {designs.map((d) => (
              <div className="design-card" key={d.id}>
                <img src={d.src} alt={d.name} />
                <div className="design-card-overlay">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(d.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="design-card-info">
                  <p className="design-card-name">{d.name}</p>
                  <p className="design-card-size">{d.size}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {designs.length === 0 && (
        <div className="designs-empty">
          <p>Your uploaded designs will appear here.</p>
        </div>
      )}

    </div>
  );
}

export default Mydes;