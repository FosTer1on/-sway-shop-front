import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutForm.module.css";

export const CheckoutForm = () => {
  const navigate = useNavigate();

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

    const cleaned = digits.startsWith("998")
      ? digits.slice(3)
      : digits;

    const limited = cleaned.slice(0, 9);

    let formatted = "+998 ";

    if (limited.length > 0)
      formatted += limited.slice(0, 2);

    if (limited.length >= 3)
      formatted += " " + limited.slice(2, 5);

    if (limited.length >= 6)
      formatted += " " + limited.slice(5, 7);

    if (limited.length >= 8)
      formatted += " " + limited.slice(7, 9);

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
      newErrors.name = "Имя должно содержать минимум 3 буквы";
    }

    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 12) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (telegram.length < 6) {
      newErrors.telegram =
        "Ник в Telegram должен быть минимум 5 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log({
      name,
      phone,
      telegram,
    });

    navigate("/");
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Контактные данные</h2>

        {/* 👤 Имя */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Ваше имя *</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            className={`${styles.input} ${
              errors.name ? styles.error : ""
            }`}
            placeholder="Введите имя"
          />
          {errors.name && (
            <span className={styles.errorMessage}>
              {errors.name}
            </span>
          )}
        </div>

        {/* 📱 Телефон */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Номер телефона *</label>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            className={`${styles.input} ${
              errors.phone ? styles.error : ""
            }`}
          />
          {errors.phone && (
            <span className={styles.errorMessage}>
              {errors.phone}
            </span>
          )}
        </div>

        {/* 💬 Telegram */}
        <div className={styles.formGroup}>
          <label className={styles.label}>Telegram ник *</label>
          <input
            type="text"
            value={telegram}
            onChange={handleTelegramChange}
            className={`${styles.input} ${
              errors.telegram ? styles.error : ""
            }`}
          />
          {errors.telegram && (
            <span className={styles.errorMessage}>
              {errors.telegram}
            </span>
          )}
        </div>

        <button type="submit" className={styles.submitButton}>
          Оформить заказ
        </button>
      </form>

      <div>
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          Оставьте ваши контакты чтобы мы могли с вами связаться и
          подтвердить ваш заказ, предоплата заказа будет составлять
          50% от заказа
        </p>
      </div>
    </>
  );
};
