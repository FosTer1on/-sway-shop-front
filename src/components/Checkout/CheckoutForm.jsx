import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CheckoutForm.module.css";

export const CheckoutForm = () => {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("+998 ");
  const [telegram, setTelegram] = useState("@");
  const [errors, setErrors] = useState({});

  // 🔹 форматирование телефона
  const formatPhone = (value) => {
    // удаляем всё кроме цифр
    const digits = value.replace(/\D/g, "");

    // убираем 998 если пользователь пытается ввести его повторно
    const cleaned = digits.startsWith("998") ? digits.slice(3) : digits;

    const limited = cleaned.slice(0, 9); // максимум 9 цифр

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

    // всегда начинается с @
    if (!value.startsWith("@")) {
      value = "@" + value.replace(/@/g, "");
    }

    // максимум 100 символов
    value = value.slice(0, 101);

    setTelegram(value);
  };

  const validate = () => {
    const newErrors = {};

    // телефон должен содержать 9 цифр после 998
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 12) {
      newErrors.phone = "Введите корректный номер телефона";
    }

    if (telegram.length < 6) {
      newErrors.telegram = "Ник в Telegram должен быть минимум 5 символов";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log({
      phone,
      telegram,
    });

    navigate("/");
  };

  return (
    <>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Контактные данные</h2>
    
          {/* 📱 Телефон */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Номер телефона *</label>
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
            <label className={styles.label}>Telegram ник *</label>
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
    
          <button type="submit" className={styles.submitButton}>
            Оформить заказ
          </button>
        </form>
        <div>
        <p style={{ fontSize: "18px", textAlign: "center" }}>
          Оставьте ваши контакты чтобы мы могли с вами связаться и подтвердить
          ваш заказ, предоплата заказа будет составлять 50% от заказа
        </p>
      </div>
    </>
  );
};
