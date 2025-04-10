import { Link } from "react-router";
import RegisterForm from "../RegisterForm/RegisterForm";
import SubTitle from "../SubTitle/SubTitle";
import { IoArrowBack } from "react-icons/io5";
import styles from "./LoginInfo.module.scss";
export default function LoginInfo() {
  return (
    <>
      <SubTitle
        title="Enter your email and a password"
        subTitle="This allows you to log in on any device"
      />
      <RegisterForm />
      <Link
        to={{ pathname: "/register", search: "?step=skill-level" }}
        className={styles.backLink}
      >
        <IoArrowBack className={styles.backBtn} />
      </Link>
    </>
  );
}
