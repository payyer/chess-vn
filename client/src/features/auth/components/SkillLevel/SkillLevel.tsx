import {
  FaChessKnight,
  FaChessPawn,
  FaChessQueen,
  FaChessRook,
} from "react-icons/fa";
import SkillLevelItem from "../SkillLevelItem/SkillLevelItem";
import styles from "./SkillLevel.module.scss";
import Button from "../../../../components/Button";
import clsx from "clsx";
import useAccountStore from "../../../../store/auth";
import { Link, useNavigate } from "react-router";
import SubTitle from "../SubTitle/SubTitle";
import { IoArrowBack } from "react-icons/io5";
import { useEffect } from "react";
export default function SkillLevel() {
  const elo = useAccountStore((state) => state.elo);
  const step = useAccountStore((state) => state.step);
  const setStep = useAccountStore((state) => state.setStep);
  const resetFiled = useAccountStore((state) => state.resetFiled);
  const navigation = useNavigate();
  const nextStep = () => {
    navigation({ pathname: "/register", search: "?step=login-info" });
    setStep("login-info");
  };

  useEffect(() => {
    if (step != "skill-level") {
      navigation("/register");
      setStep("main-screen");
      resetFiled();
    }
  }, []);

  return (
    <>
      <SubTitle
        title="Create your ChessVn.com account"
        subTitle="A starting point for match pairings"
      />
      <div className={styles.wrapper}>
        <ul className={styles.listSkill}>
          <SkillLevelItem
            elo={400}
            title="New to Chess"
            isMostCommon
            icon={<FaChessPawn />}
            isActive={elo === 400}
          />
          <SkillLevelItem
            elo={800}
            title="Beginer"
            icon={<FaChessKnight />}
            isActive={elo === 800}
          />
          <SkillLevelItem
            elo={1200}
            title="Intermediate"
            icon={<FaChessRook />}
            isActive={elo === 1200}
          />
          <SkillLevelItem
            elo={1800}
            title="Advanced"
            icon={<FaChessQueen />}
            isActive={elo === 1800}
          />
        </ul>

        <Button onClick={nextStep} className={clsx(styles.button)}>
          Continute
        </Button>
      </div>
      <Link to={{ pathname: "/register" }} className={styles.backLink}>
        <IoArrowBack className={styles.backBtn} />
      </Link>
    </>
  );
}
