import "./login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the page from refreshing, mean when clcik submit button, this page will not able to refresh
    const newUser = {
      username: username,
      password: password,
    };
  };
  return (
    <section className="login-container">
      <div className="login-title"> Log in</div>
      <form onSubmit={handleLogin}>
        <label>USERNAME</label>
        <input type="text" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
        <label>PASSWORD</label>
        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit"> Continue </button>
      </form>
      <div className="login-register"> Don't have an account yet? </div>
      <Link className="login-register-link" to="/register">
        Register one for free{" "}
      </Link>
    </section>
  );
};

export default Login;
