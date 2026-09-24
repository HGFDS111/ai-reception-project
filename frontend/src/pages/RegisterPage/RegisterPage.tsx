import { useState, type FormEvent } from "react";
import { useRegisterMutation } from "../../entities/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const result = await register({
    email,
    password,
  }).unwrap();

  localStorage.setItem("token", result.token);
  navigate("/dashboard");
};

  return (
  <main className={styles.page}>
    <div className={styles.card}>
      <Link to="/" className={styles.backLink}>
  ← Back to home
</Link>
<div className={styles.brand}>
  <span className={styles.logo}>AI</span>
  <strong>AI Reception</strong>
</div>
    <h1>Create account</h1>

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create account"}
      </button>
    </form>

{error && (
  <p className={styles.errorMessage}>
    An account with this email already exists. Please sign in
  </p>
)}

    <p>
  Already have an account? <Link to="/login">Sign in</Link>
</p>
    </div>
  </main>
);
}

export default RegisterPage;