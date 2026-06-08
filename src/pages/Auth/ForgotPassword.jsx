import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/NavBar/Layout";
import { passwordResetAPI } from "@/api/auth/auth";
import styles from "./Auth.module.css";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const PHONE_PREFIX = "+998 ";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(PHONE_PREFIX);
  const [phoneDigits, setPhoneDigits] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, "");

    if (!digits.startsWith("998")) {
      digits = "998";
    }

    digits = digits.slice(0, 12);
    setPhoneDigits(digits);

    const part1 = digits.slice(3, 5);
    const part2 = digits.slice(5, 8);
    const part3 = digits.slice(8, 10);
    const part4 = digits.slice(10, 12);

    let formatted = "+998";

    if (part1) formatted += ` ${part1}`;
    if (part2) formatted += ` ${part2}`;
    if (part3) formatted += `-${part3}`;
    if (part4) formatted += `-${part4}`;

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    if (!value.startsWith("+998")) return;

    setPhone(formatPhone(value));

    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (phoneDigits.length !== 12) {
      newErrors.phone = t("tel_error");
    }

    if (!newPassword) {
      newErrors.newPassword = t("password_required");
    } else if (newPassword.length < 6) {
      newErrors.newPassword =
        t("password_length");
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        t("confirm_password_required");
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword =
        t("passwords_not_match");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await passwordResetAPI({
        phone_number: `+${phoneDigits}`,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      toast.success(t("password_changed"));
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("PASSWORD RESET ERROR:", err.response?.data || err.message);

      if (err.response?.status === 404) {
        toast.error(t("info_error"))
        navigate("/", { replace: true });
        return;
      }

      toast.error(t("password_reset_fail"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {t("password_recovery")}
            </h1>
            <p className={styles.subtitle}>
              {t("password_recovery_subtitle")}
            </p>
          </div>

          <form onSubmit={handleResetPassword} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t("phone_number") || "Номер телефона"}
              </label>

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

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t("new_password")}
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={
                  styles.input + (errors.newPassword ? " " + styles.error : "")
                }
                placeholder="••••••••"
                disabled={isLoading}
              />

              {errors.newPassword && (
                <span className={styles.errorMessage}>
                  {errors.newPassword}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>
                {t("confirm_password")}
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={
                  styles.input +
                  (errors.confirmPassword ? " " + styles.error : "")
                }
                placeholder="••••••••"
                disabled={isLoading}
              />

              {errors.confirmPassword && (
                <span className={styles.errorMessage}>
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading
                ? t("saving")
                : t("change_password")}
            </button>
          </form>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              <Link to="/login" className={styles.link}>
                {t("back_to_login")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
