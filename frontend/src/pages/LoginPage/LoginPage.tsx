import { useState, type FormEvent } from "react";
import { useLoginMutation } from "../../entities/auth/authApi";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await login({ email, password }).unwrap();

      localStorage.setItem("token", result.token);
      navigate("/dashboard")
    } catch (loginError) {
      console.error(loginError);
    }
  };

  return (
  <main className={styles.page}>
    <div className={styles.card}>
      <div className={styles.brand}>
  <span className={styles.logo}>AI</span>
  <strong>AI Reception</strong>
</div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

<Link to="/forgot-password">Forgot password?</Link>
        {error && <p>Login failed</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p>
  Don&apos;t have an account? <Link to="/register">Create account</Link>
</p>
      </div>
    </main>
  );
}

export default LoginPage;
