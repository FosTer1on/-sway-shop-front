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

const PHONE_PREFIX = "+998 ";

export default function Register() {
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
    const err = {};

    if (!firstName.trim()) err.firstName = "Введите имя";
    if (phoneDigits.length !== 12) err.phone = "Введите корректный номер";
    if (!password || password.length < 6)
      err.password = "Пароль минимум 6 символов";

    setErrors(err);
    return Object.keys(err).length === 0;
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Регистрация</h1>
          </div>

          <form onSubmit={handleRegister} className={styles.form}>
            <div className={styles.halfRow}>
              <input
                placeholder="Имя"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.input}
              />
            </div>

            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className={styles.input}
              placeholder="+998 (__) ___-__-__"
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />

            <button className={styles.submitButton} disabled={isLoading}>
              {isLoading ? "Отправка..." : "Зарегистрироваться"}
            </button>
          </form>

          <div className={styles.footer}>
            <p>
              Уже есть аккаунт?{" "}
              <Link to="/login" className={styles.link}>
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
