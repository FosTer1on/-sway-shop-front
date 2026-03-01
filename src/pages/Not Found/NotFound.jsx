import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// ^ COMPONENTS
import Layout from "../../components/NavBar/Layout";
// ? CSS
import styles from "./NotFound.module.css";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout cartCount={0} wishlistCount={0}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.title}>{t("page_not_found")}</h2>
          <p className={styles.message}>
          {t("page_not_found_text")}
          </p>
          <Link to="/" className={styles.homeLink}>
          {t("return_to_home")}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;