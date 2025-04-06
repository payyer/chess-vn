import styles from "./Login.module.scss";
import logo from "../../../assets/imgs/logo.png";
import AuthForm from "../components/AuthForm/AuthForm";
import Divider from "../../../components/Divider/Divider";
import BtnLoginGoogle from "../../../components/BtnLoginGoogle/BtnLoginGoogle";
import { Link } from "react-router";
export default function Login() {
  return (
    <div className={styles.container}>
      <img className={styles.logo} src={logo} alt="ChessVN.com" />
      <div className={styles.formWrapper}>
        <AuthForm />
        <Divider text="OR" className={styles.marginTop} />
        <BtnLoginGoogle />
        <Link className={styles.navRegister} to={"register"}>
          New? Sign Up and start playing chess!
        </Link>
      </div>
    </div>
  );
}
