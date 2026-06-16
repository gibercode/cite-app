import { Outlet } from "react-router-dom";
import { CreateIncidentModal } from "@/components/CreateIncidentModal";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
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
      <CreateIncidentModal />
    </>
  );
};
