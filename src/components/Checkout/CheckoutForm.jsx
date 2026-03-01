import { useOrderStore } from "@/store/order/orderStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutForm.module.css";

export const CheckoutForm = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { createOrder, loading } = useOrderStore();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998 ");
  const [telegram, setTelegram] = useState("@");
  const [errors, setErrors] = useState({});

  // 🔹 Разрешаем только буквы (латиница + кириллица)
  const handleNameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s]/g, "");
    setName(value);
  };

  // 🔹 форматирование телефона
  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, "");

    const cleaned = digits.startsWith("998") ? digits.slice(3) : digits;

    const limited = cleaned.slice(0, 9);

    let formatted = "+998 ";

    if (limited.length > 0) formatted += limited.slice(0, 2);

    if (limited.length >= 3) formatted += " " + limited.slice(2, 5);

    if (limited.length >= 6) formatted += " " + limited.slice(5, 7);

    if (limited.length >= 8) formatted += " " + limited.slice(7, 9);

    return formatted;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
  };

  const handleTelegramChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("@")) {
      value = "@" + value.replace(/@/g, "");
    }

    value = value.slice(0, 101);

    setTelegram(value);
  };

  const validate = () => {
    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = `${t("name_error")}`;
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 12) {
      newErrors.phone = `${t("tel_error")}`;
    }

    if (telegram.length < 6) {
      newErrors.telegram = `${t("tg_error")}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await createOrder({
        full_name: name,
        phone_number: phone.replace(/\s/g, ""),
        telegram_username: telegram,
      });

      navigate("/");
    } catch (err) {
      console.log("Order error:", err);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{t("contact_info")}</h2>

        {/* 👤 Имя */}
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("your_name")}</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`${styles.input} ${errors.name ? styles.error : ""}`}
          />
          {errors.name && (
            <span className={styles.errorMessage}>{errors.name}</span>
          )}
        </div>

        {/* 📱 Телефон */}
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("phone_number")}</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            className={`${styles.input} ${errors.phone ? styles.error : ""}`}
          />
          {errors.phone && (
            <span className={styles.errorMessage}>{errors.phone}</span>
          )}
        </div>

        {/* 💬 Telegram */}
        <div className={styles.formGroup}>
          <label className={styles.label}>{t("tg_nick")}</label>
          <input
            type="text"
            value={telegram}
            onChange={handleTelegramChange}
            className={`${styles.input} ${errors.telegram ? styles.error : ""}`}
          />
          {errors.telegram && (
            <span className={styles.errorMessage}>{errors.telegram}</span>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? `${t("ordering")}` : `${t("make_order")}`}
        </button>
      </form>

      <div>
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          {t("checkout_text")}
        </p>
      </div>
    </>
  );
};
