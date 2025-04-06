import styles from "./BtnLoginGoogle.module.scss";
import { FcGoogle } from "react-icons/fc";

export default function BtnLoginGoogle() {
  return (
    <button className={`${styles.button}`}>
      Log in with Goole
      <FcGoogle className={styles.icon} />
    </button>
  );
}
