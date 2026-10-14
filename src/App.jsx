
import { useState } from "react";
import "./App.css";

const API_URL = "https://atlasapp-backend.onrender.com";

function App() {
  const [page, setPage] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! Please login.");
        setFormData({
          name: "",
          email: "",
          password: ""
        });
        setPage("login");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setPage("home");
        setFormData({
          name: "",
          email: "",
          password: ""
        });
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setPage("login");
    setMessage("");
  };

  // Dashboard
  if (page === "home" && user) {
    return (
      <div className="home-page">
        <nav className="navbar">
          <h2>AtlasApp</h2>

          <div className="nav-right">
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>

        <section className="hero">
          <h1>Welcome to AtlasApp 👋</h1>
          <p>
            Your React application is successfully connected
            to Express and MongoDB Atlas.
          </p>
        </section>

        <section className="cards-section">
          <h2>Explore Our Collection</h2>

          <div className="cards">
            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800"
                alt="Mountain"
              />
              <h3>Mountain Escape</h3>
              <p>Discover beautiful mountains and peaceful landscapes.</p>
              <button>Explore</button>
            </div>

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
                alt="Beach"
              />
              <h3>Beach Paradise</h3>
              <p>Relax beside beautiful beaches and crystal clear water.</p>
              <button>Explore</button>
            </div>

            <div className="card">
              <img
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800"
                alt="City"
              />
              <h3>City Life</h3>
              <p>Experience amazing cities and modern architecture.</p>
              <button>Explore</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Login / Register
  return (
    <div className="auth-page">
      <div className="auth-card">

        <h1>
          {page === "login" ? "Welcome Back" : "Create Account"}
        </h1>

        <p>
          {page === "login"
            ? "Login to continue to AtlasApp"
            : "Register your new account"}
        </p>

        <form
          onSubmit={page === "login" ? handleLogin : handleRegister}
        >
          {page === "register" && (
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading
              ? "Please wait..."
              : page === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="switch-auth">
          {page === "login"
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setPage(page === "login" ? "register" : "login");
              setMessage("");
            }}
          >
            {page === "login" ? "Register" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default App;
