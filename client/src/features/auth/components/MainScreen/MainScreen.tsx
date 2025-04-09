import { useNavigate } from "react-router";
import BtnLoginGoogle from "../../../../components/BtnLoginGoogle";
import Button from "../../../../components/Button";
import Divider from "../../../../components/Divider";
import styles from "./MainScreen.module.scss";

export default function MainScreen() {
  const navigation = useNavigate();
  const onClickSignUp = () => {
    navigation({ pathname: "/register", search: "?step=skill-level" });
  };
  return (
    <div className={styles.formWrapper}>
      <Button onClick={onClickSignUp} className={styles.button}>
        Sign Up
      </Button>
      <Divider text="OR" className={styles.divider} />
      <BtnLoginGoogle />
    </div>
  );
}
