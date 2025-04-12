import { useNavigate } from "react-router";
import Button from "../../../../components/Button";
import SubTitle from "../SubTitle/SubTitle";
import styles from "./Completed.module.scss";
import clsx from "clsx";
import { useEffect } from "react";
import useAccountStore from "../../../../store/auth";
export default function Completed() {
  const step = useAccountStore((state) => state.step);
  const setStep = useAccountStore((state) => state.setStep);
  const resetFiled = useAccountStore((state) => state.resetFiled);
  const navigation = useNavigate();
  useEffect(() => {
    if (step != "login-info") {
      navigation("/register");
      setStep("main-screen");
    }
    resetFiled();
  }, []);
  return (
    <>
      <SubTitle
        title="Checkmate!"
        subTitle="Welcome aboard ChessVN, your chess journey starts now!"
      />
      <Button
        className={clsx(styles.btnPlay)}
        onClick={() => navigation({ pathname: "/" })}
      >
        Let play
      </Button>
    </>
  );
}
