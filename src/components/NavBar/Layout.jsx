import { ReactNode, useState } from "react";
// ^ COMPONENTS
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";
// ? CSS
import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        {children}
      </main>
      <MobileNav />
    </div>
  );
};

export default Layout;
