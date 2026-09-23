import { useState, type FormEvent } from "react";
import { useForgotPasswordMutation } from "../../entities/auth/authApi";
import styles from "./ForgotPasswordPage.module.css";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  await forgotPassword({ email }).unwrap();
  setIsSent(true);
};

  return (
  <main className={styles.page}>
    <div className={styles.card}>
    <h1>Forgot password</h1>

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

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending..." : "Send reset link"}
      </button>
    </form>
   {isSent && (
  <p className={styles.successMessage}>
    Check your email for the password reset link
  </p>
)}
<Link to="/login">Back to login</Link>
</div>
  </main>
);
}

export default ForgotPasswordPage;