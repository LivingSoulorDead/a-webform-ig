import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Mydes.css";

// ── Helper: human-readable file size ──────────────────────────────────────────
function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ── localStorage key used to store all designs ────────────────────────────────
const STORAGE_KEY = "mydes_designs";

// ── Load saved designs from localStorage on startup ──────────────────────────
// localStorage only stores plain strings, so we JSON.parse to get back the array.
// If nothing is saved yet, we default to an empty array [].
function loadDesigns() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    // If JSON is corrupted for any reason, start fresh
    return [];
  }
}

// ── Save the current designs array into localStorage ─────────────────────────
// JSON.stringify converts the array of objects into a plain string for storage.
function saveDesigns(designs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(designs));
  } catch (e) {
    // localStorage can throw if storage quota is exceeded (images are large)
    alert("Storage full — could not save this image. Try removing some existing ones first.");
  }
}

function Mydes() {
  const navigate = useNavigate();
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef();

  // ── Initialize state from localStorage, not an empty array ─────────────────
  // useState(() => loadDesigns()) uses a lazy initializer — the function runs
  // only once on first render, loading whatever was previously saved.
  const [designs, setDesigns] = useState(() => loadDesigns());

  // ── Auth guard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) navigate("/loginn", { replace: true });
  }, [navigate]);

  // ── Whenever designs changes, sync it to localStorage ──────────────────────
  // This useEffect runs every time the `designs` array is updated — whether
  // that's an upload or a delete — keeping localStorage always in sync.
  useEffect(() => {
    saveDesigns(designs);
  }, [designs]);

  // ── Handle files selected via input or drag-and-drop ───────────────────────
  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));

    imageFiles.forEach((file) => {
      const reader = new FileReader();
      // FileReader.readAsDataURL converts the image file into a base64 string
      // (e.g. "data:image/png;base64,iVBORw0KGgo...").
      // This string can be stored in localStorage and used directly as an <img src>.
      reader.onload = (e) => {
        setDesigns((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(), // unique ID for React key + deletion
            name: file.name,
            size: formatBytes(file.size),
            src: e.target.result,           // the base64 string
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = ""; // reset input so the same file can be re-uploaded
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  // ── Delete: filter out the card by id, then useEffect syncs to localStorage ─
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
                  <button className="delete-btn" onClick={() => handleDelete(d.id)}>
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