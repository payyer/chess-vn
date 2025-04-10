import { useNavigate } from "react-router";
import Button from "../../../../components/Button";
import SubTitle from "../SubTitle/SubTitle";
import styles from "./Completed.module.scss";
import clsx from "clsx";
export default function Completed() {
  const navigate = useNavigate();
  return (
    <>
      <SubTitle
        title="Checkmate!"
        subTitle="Welcome aboard ChessVN, your chess journey starts now!"
      />
      <Button
        className={clsx(styles.btnPlay)}
        onClick={() => navigate({ pathname: "/" })}
      >
        Let play
      </Button>
    </>
  );
}
