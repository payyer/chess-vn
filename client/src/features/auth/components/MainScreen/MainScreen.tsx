import { Link, useNavigate } from "react-router";
import BtnLoginGoogle from "../../../../components/BtnLoginGoogle";
import Button from "../../../../components/Button";
import Divider from "../../../../components/Divider";
import styles from "./MainScreen.module.scss";
import SubTitle from "../SubTitle/SubTitle";
import useAccountStore from "../../../../store/auth";

export default function MainScreen() {
  const navigation = useNavigate();
  const setStep = useAccountStore((state) => state.setStep);

  const onClickSignUp = () => {
    navigation({ pathname: "/register", search: "?step=skill-level" });
    setStep("skill-level");
  };
  return (
    <>
      <SubTitle title="Create your ChessVn.com account" />

      <div className={styles.formWrapper}>
        <Button onClick={onClickSignUp} className={styles.button}>
          Sign Up
        </Button>
        <Divider text="OR" className={styles.divider} />
        <BtnLoginGoogle />
      </div>

      <Link to={"/login"} className={styles.btnLogin}>
        Login
      </Link>
    </>
  );
}
