import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "@/components";
import styles from "./styles.module.scss";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
};
