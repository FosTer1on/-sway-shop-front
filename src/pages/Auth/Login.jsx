// ~ React
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// ? Hooks
import { useAuth } from "@/hooks/useAuth";
// ^ Components
import Layout from "@/components/NavBar/Layout";
// ! Api
import { loginAPI } from "@/api/auth/auth";
// & Css
import styles from "./Auth.module.css";
import { useTranslation } from "react-i18next";

const PHONE_PREFIX = "+998 ";

export default function Login() {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";

  const { isAuth, login } = useAuth();

  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [phoneDigits, setPhoneDigits] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuth) navigate("/", { replace: true });
  }, [isAuth, navigate]);

  if (isAuth) return null;

  const formatPhone = (value) => {
    // убираем всё кроме цифр
    let digits = value.replace(/\D/g, "");

    // всегда начинаем с 998
    if (!digits.startsWith("998")) {
      digits = "998";
    }

    digits = digits.slice(0, 12); // 998XXXXXXXXX
    setPhoneDigits(digits);

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
      newErrors.phone = `${t("tel_error")}`;
    }

    if (!password) {
      newErrors.password = `${t("password_required")}`;
    } else if (password.length < 6) {
      newErrors.password = `${t("password_length")}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await loginAPI({
        phone_number: `+${phoneDigits}`,
        password,
      });

      const { access, refresh } = res.data || {};

      if (refresh) localStorage.setItem("refresh_token", refresh);
      if (access) {
        // login теперь сам кладёт access_token в localStorage
        login(access);
        navigate(from, { replace: true });
        return;
      }

      // если бэк не вернул токены — считаем ошибкой
      console.error("LOGIN ERROR: tokens not returned", res.data);
    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t("login")}</h1>
            <p className={styles.subtitle}>{t("welcome_back")}</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {/* PHONE */}
            <div className={styles.formGroup}>
              <label className={styles.label}>{t("phone_number")}</label>
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
              <label className={styles.label}>{t("password")}</label>
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
                  {showPassword ? `${t("hide")}` : `${t("show")}`}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorMessage}>{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? `${t("logining")}` : `${t("login")}`}
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              {t("no_account")}{" "}
              <Link to="/register" className={styles.link}>
                {t("register")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
