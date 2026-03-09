// ~ React
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// ? Hooks
import { useAuth } from "@/hooks/useAuth";
// ^ Components
import Layout from "@/components/NavBar/Layout";
// ! Api
import { registerAPI } from "@/api/auth/auth";
// & Css
import styles from "./Auth.module.css";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const PHONE_PREFIX = "+998 ";

export default function Register() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { isAuth, login } = useAuth();

  const [firstName, setFirstName] = useState("");

  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [phoneDigits, setPhoneDigits] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (isAuth) {
    navigate("/", { replace: true });
    return null;
  }

  /* =====================
     PHONE FORMAT
  ====================== */
  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");

    if (!digits.startsWith("998")) digits = "998";

    digits = digits.slice(0, 12); // 998XXXXXXXXX
    setPhoneDigits(digits);

    const p1 = digits.slice(3, 5);
    const p2 = digits.slice(5, 8);
    const p3 = digits.slice(8, 10);
    const p4 = digits.slice(10, 12);

    let formatted = "+998";
    if (p1) formatted += `  ${p1}`;
    if (p1.length === 2) formatted += "";
    if (p2) formatted += ` ${p2}`;
    if (p3) formatted += `-${p3}`;
    if (p4) formatted += `-${p4}`;

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("+998")) return;
    setPhone(formatPhone(value));
  };

  /* =====================
     VALIDATION
  ====================== */
  const validateRegister = () => {
    if (!firstName.trim()) {
      toast.error(t("name_error"));
      return false;
    }
    if (phoneDigits.length !== 12) {
      toast.error(t("tel_error"));
      return false;
    }
    if (!password || password.length < 6) {
      toast.error(t("password_error"));
      return false;
    }

    return true;
  };

  /* =====================
     SUBMIT REGISTER
  ====================== */
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsLoading(true);

    try {
      const res = await registerAPI({
        first_name: firstName,
        phone_number: `+${phoneDigits}`,
        password,
      });

      // логиним сразу
      login(res.data.access);

      localStorage.setItem("refresh_token", res.data.refresh);

      navigate("/", { replace: true });
    } catch (err) {
      console.error("REGISTER ERROR:", err.response?.data || err.message);
      toast.error(t("user_created"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>{t("register")}</h1>
          </div>

          <form onSubmit={handleRegister} className={styles.form}>
            <input
              placeholder={t("name")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={styles.input}
            />

            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className={styles.input}
              placeholder="+998 (__) ___-__-__"
            />

            <input
              type="password"
              placeholder={t("password_inp")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />

            <button className={styles.submitButton} disabled={isLoading}>
              {isLoading ? `${t("sending")}` : `${t("registrater")}`}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              {t("have_account")}{" "}
              <Link to="/login" className={styles.link}>
                {t("login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
