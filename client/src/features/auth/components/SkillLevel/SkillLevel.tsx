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
import { useNavigate } from "react-router";
import SubTitle from "../SubTitle/SubTitle";
export default function SkillLevel() {
  const elo = useAccountStore((state) => state.elo);
  const navigation = useNavigate();
  const nextStep = () => {
    navigation({ pathname: "/register", search: "?step=login-info" });
  };

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
    </>
  );
}
