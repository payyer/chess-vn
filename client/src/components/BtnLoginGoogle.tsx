import styles from "./BtnLoginGoogle.module.scss";
import { FcGoogle } from "react-icons/fc";

export default function BtnLoginGoogle() {
  return (
    <button className={`${styles.button}`}>
      Continute with Goole
      <FcGoogle className={styles.icon} />
    </button>
  );
}
