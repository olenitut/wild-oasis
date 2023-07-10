import Sidebar from "../components/Sidebar";
import styles from "./AppLAyout.module.css";
import Map from "../components/Map";
import User from "../components/User";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  );
};
export default AppLayout;
