import styles from "./Register.module.scss";
import logo from "../../../assets/imgs/logo.png";
import { useSearchParams } from "react-router";
import MainScreen from "../components/MainScreen/MainScreen";
import SkillLevel from "../components/SkillLevel/SkillLevel";
import UserName from "../components/UserName/UserName";
import LoginInfo from "../components/LoginInfo/LoginInfo";
import Completed from "../components/Completed/Completed";

enum RegisterStep {
  MAIN_SCREEN = "main-screen",
  SKILL_LEVEL = "skill-level",
  LOGIN_INFO = "login-info",
  USERNAME = "username",
  COMPLETED = "completed",
}

type Step =
  | "main-screen"
  | "skill-level"
  | "login-info"
  | "username"
  | "completed";

const validSteps: Step[] = [
  "main-screen",
  "login-info",
  "skill-level",
  "username",
  "completed",
];

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

      {step === RegisterStep.MAIN_SCREEN ? <MainScreen /> : null}

      {step === RegisterStep.SKILL_LEVEL ? <SkillLevel /> : null}

      {step === RegisterStep.LOGIN_INFO ? <LoginInfo /> : null}

      {step === RegisterStep.USERNAME ? <UserName /> : null}

      {step === RegisterStep.COMPLETED ? <Completed /> : null}
    </main>
  );
}
