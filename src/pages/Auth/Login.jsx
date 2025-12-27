import Layout from "@/components/NavBar/Layout";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "@/api/auth/auth";
import styles from "./Auth.module.css";

const PHONE_PREFIX = "+998 ";

export default function Login() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [phoneDigits, setPhoneDigits] = useState("")
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formatPhone = (value) => {
    // убираем всё кроме цифр
    let digits = value.replace(/\D/g, "");

    // всегда начинаем с 998
    if (!digits.startsWith("998")) {
      digits = "998";
    }

    digits = digits.slice(0, 12); // 998XXXXXXXXX
    setPhoneDigits(digits)

    const part1 = digits.slice(3, 5);
    const part2 = digits.slice(5, 8);
    const part3 = digits.slice(8, 10);
    const part4 = digits.slice(10, 12);

    let formatted = "+998";

    if (part1) formatted += ` ${part1}`;
    if (part1.length === 2) formatted;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += `-${part3}`;
    if (part4) formatted += `-${part4}`;

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // не даем стереть +998
    if (!value.startsWith("+998")) return;

    setPhone(formatPhone(value));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (phone.length < 12) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await login({
        phone_number: `+${phoneDigits}`, // "998901234567"
        password,
      });
  
      // если бэк вернул токены
      if (res.data.access && res.data.refresh) {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);

        navigate("/", { replace: true });
      }
  
      // пока просто логируем
    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err.response?.data || err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Sign In</h1>
            <p className={styles.subtitle}>Welcome back to our store</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* PHONE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number *</label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className={
                  styles.input + (errors.phone ? " " + styles.error : "")
                }
                placeholder="+998 (__) ___-__-__"
                disabled={isLoading}
              />
              {errors.phone && (
                <span className={styles.errorMessage}>{errors.phone}</span>
              )}
            </div>

            {/* PASSWORD */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password *</label>
              <div className={styles.passwordContainer}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    styles.input + (errors.password ? " " + styles.error : "")
                  }
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>

            <div className={styles.rememberForgot}>
              <Link to="#" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{" "}
              <Link to="/register" className={styles.link}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
