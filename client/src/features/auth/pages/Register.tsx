import styles from "./Register.module.scss";
import logo from "../../../assets/imgs/logo.png";
import { Link, useSearchParams } from "react-router";
import MainScreen from "../components/MainScreen/MainScreen";
import SubTitle from "../components/SubTitle/SubTitle";
import SkillLevel from "../components/SkillLevel/SkillLevel";
import { IoArrowBack } from "react-icons/io5";
import RegisterForm from "../components/RegisterForm/RegisterForm";

enum RegisterStep {
  MAIN_SCREEN = "main-screen",
  SKILL_LEVEL = "skill-level",
  LOGIN_INFO = "login-info",
}

type Step = "main-screen" | "skill-level" | "login-info";

const validSteps: Step[] = ["main-screen", "login-info", "skill-level"];

export default function Register() {
  const [searchParams] = useSearchParams();
  const stepParam: string | null = searchParams.get("step");

  const step = stepParam === null ? RegisterStep.MAIN_SCREEN : stepParam;
  const isValidStep: boolean = validSteps.includes(step as Step);

  if (!isValidStep) return <div>404 NotFound</div>;

  return (
    <main className={styles.container}>
      <h1>
        <img className={styles.logo} src={logo} alt="ChessVN.com" />
      </h1>

      {step === RegisterStep.MAIN_SCREEN ? (
        <>
          <SubTitle title="Create your ChessVn.com account" />
          <MainScreen />
          <Link to={"/login"} className={styles.btnLogin}>
            Login
          </Link>
        </>
      ) : null}

      {step === RegisterStep.SKILL_LEVEL ? (
        <>
          <SubTitle
            title="Create your ChessVn.com account"
            subTitle="A starting point for match pairings"
          />
          <SkillLevel />
          <Link to={"/register"} className={styles.backLink}>
            <IoArrowBack className={styles.backBtn} />
          </Link>
        </>
      ) : null}

      {step === RegisterStep.LOGIN_INFO ? (
        <>
          <SubTitle
            title="Enter your email and a password"
            subTitle="This allows you to log in on any device"
          />
          <RegisterForm />
          <Link to={"/register"} className={styles.backLink}>
            <IoArrowBack className={styles.backBtn} />
          </Link>
        </>
      ) : null}
    </main>
  );
}
