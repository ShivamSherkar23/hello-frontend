import { useState } from "react";

// The backend URL — FastAPI runs on port 8000
const API_URL = "http://localhost:8000";

export default function App() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchHello() {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // fetch() sends an HTTP GET request to the FastAPI endpoint
      const res = await fetch(`${API_URL}/api/hello`);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      // Parse the JSON body that FastAPI returned
      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.badge}>React · port 5173</span>
          <span style={styles.divider}>↔</span>
          <span style={styles.badge}>FastAPI · port 8000</span>
        </div>

        <h1 style={styles.title}>Fullstack Demo</h1>
        <p style={styles.subtitle}>
          Click the button — React will call the FastAPI backend and show the
          response below.
        </p>

        {/* Button */}
        <button onClick={fetchHello} disabled={loading} style={styles.button}>
          {loading ? "Calling API..." : "GET /api/hello"}
        </button>

        {/* Response */}
        {response && (
          <div style={styles.responseBox}>
            <p style={styles.label}>Response from FastAPI:</p>
            <pre style={styles.pre}>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <p style={styles.label}>Error:</p>
            <p style={styles.errorText}>{error}</p>
            <p style={styles.hint}>
              💡 Make sure FastAPI is running:{" "}
              <code>uvicorn main:app --reload</code>
            </p>
          </div>
        )}

        {/* How it works explanation */}
        <div style={styles.explainer}>
          <p style={styles.explainerTitle}>How it works</p>
          <ol style={styles.steps}>
            <li>You click the button in React (port 5173)</li>
            <li>
              React calls <code>fetch("http://localhost:8000/api/hello")</code>
            </li>
            <li>FastAPI handles the request and returns JSON</li>
            <li>React receives the JSON and renders it</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f0f0f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Courier New', monospace",
    padding: "20px",
  },
  card: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "560px",
    width: "100%",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
  },
  badge: {
    background: "#2a2a2a",
    color: "#888",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #333",
  },
  divider: {
    color: "#444",
    fontSize: "18px",
  },
  title: {
    color: "#fff",
    fontSize: "28px",
    margin: "0 0 8px 0",
    fontWeight: "700",
  },
  subtitle: {
    color: "#666",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0 0 28px 0",
  },
  button: {
    background: "#fff",
    color: "#000",
    border: "none",
    padding: "12px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "'Courier New', monospace",
    fontWeight: "700",
    cursor: "pointer",
    width: "100%",
    marginBottom: "20px",
    transition: "opacity 0.2s",
    opacity: 1,
  },
  responseBox: {
    background: "#0d1f0d",
    border: "1px solid #1a3a1a",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
  },
  errorBox: {
    background: "#1f0d0d",
    border: "1px solid #3a1a1a",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "20px",
  },
  label: {
    color: "#666",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 8px 0",
  },
  pre: {
    color: "#4ade80",
    fontSize: "13px",
    margin: 0,
    whiteSpace: "pre-wrap",
  },
  errorText: {
    color: "#f87171",
    fontSize: "13px",
    margin: "0 0 8px 0",
  },
  hint: {
    color: "#888",
    fontSize: "12px",
    margin: 0,
  },
  explainer: {
    background: "#111",
    border: "1px solid #222",
    borderRadius: "8px",
    padding: "16px",
    marginTop: "8px",
  },
  explainerTitle: {
    color: "#555",
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    margin: "0 0 10px 0",
  },
  steps: {
    color: "#555",
    fontSize: "13px",
    lineHeight: "1.9",
    margin: 0,
    paddingLeft: "18px",
  },
};
