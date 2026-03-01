import { CheckoutForm } from "@/components/Checkout/CheckoutForm";
import Layout from "@/components/NavBar/Layout";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Checkout.module.css";

/**
 * Checkout page for order completion
 */
export default function Checkout() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  
  return (
    <Layout cartCount={0} wishlistCount={0}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{t("checkout")}</h1>
        </div>

        <CheckoutForm />
      </div>
    </Layout>
  );
}
