import { useState, type FormEvent } from "react";
import { useResetPasswordMutation } from "../../entities/auth/authApi";
import styles from "./ResetPasswordPage.module.css";
import { Link, useSearchParams } from "react-router-dom";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [isReset, setIsReset] = useState(false);
  const [searchParams] = useSearchParams();
const token = searchParams.get("token") ?? "";
  const [resetPassword, { isLoading }] = useResetPasswordMutation();


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  await resetPassword({
    token,
    password,
  }).unwrap();
  setIsReset(true);
};

 return (
  <main className={styles.page}>
    <div className={styles.card}>
    <h1>Reset password</h1>

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">New password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>

      <button type="submit" disabled={isLoading || !token}>
        {isLoading ? "Updating..." : "Set new password"}
      </button>
    </form>

   {isReset && (
  <>
    <p className={styles.successMessage}>
      Password has been reset successfully
    </p>

    <Link to="/login">Back to login</Link>
  </>
)}
    </div>
  </main>
);
}

export default ResetPasswordPage;