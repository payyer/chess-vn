import styles from "./Login.module.scss";
import logo from "../../../assets/imgs/logo.png";
import Divider from "../../../components/Divider";
import BtnLoginGoogle from "../../../components/BtnLoginGoogle";
import { Link } from "react-router";
import LoginForm from "../components/LoginForm/LoginForm";
export default function Login() {
  return (
    <main className={styles.container}>
      <h1>
        <img className={styles.logo} src={logo} alt="ChessVN.com" />
      </h1>
      <div className={styles.formWrapper}>
        <LoginForm />
        <Divider text="OR" className={styles.divider} />
        <BtnLoginGoogle />
        <Link className={styles.navRegister} to={"/register"}>
          New? Sign Up and start playing chess!
        </Link>
      </div>
    </main>
  );
}
