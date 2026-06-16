import { Outlet } from "react-router-dom";
import { CreateIncidentModal } from "@/components/CreateIncidentModal";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useIntermitence } from "@/hooks/useIntermitence";
import styles from "./styles.module.scss";

export const Layout = () => {
  const {
    status: isCreateIncidentModalOpen,
    switchStatus: switchCreateIncidentModal,
  } = useIntermitence();

  return (
    <>
      <Navbar />
      <div className={styles.layout}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet
            context={{
              openCreateIncidentModal: switchCreateIncidentModal,
            }}
          />
        </main>
      </div>
      <CreateIncidentModal
        isOpen={isCreateIncidentModalOpen}
        onClose={switchCreateIncidentModal}
      />
    </>
  );
};
