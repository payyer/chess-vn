import { Link, useNavigate } from "react-router";
import RegisterForm from "../RegisterForm/RegisterForm";
import SubTitle from "../SubTitle/SubTitle";
import { IoArrowBack } from "react-icons/io5";
import styles from "./LoginInfo.module.scss";
import { useEffect } from "react";
import useAccountStore from "../../../../store/auth";
export default function LoginInfo() {
  const step = useAccountStore((state) => state.step);
  const setStep = useAccountStore((state) => state.setStep);
  const resetFiled = useAccountStore((state) => state.resetFiled);
  const navigation = useNavigate();

  useEffect(() => {
    if (step != "login-info") {
      navigation("/register");
      setStep("main-screen");
      resetFiled();
    }
  }, []);

  return (
    <>
      <SubTitle
        title="Enter your email and a password"
        subTitle="This allows you to log in on any device"
      />
      <RegisterForm />
      <Link
        onClick={() => {
          setStep("skill-level");
        }}
        to={{ pathname: "/register", search: "?step=skill-level" }}
        className={styles.backLink}
      >
        <IoArrowBack className={styles.backBtn} />
      </Link>
    </>
  );
}
