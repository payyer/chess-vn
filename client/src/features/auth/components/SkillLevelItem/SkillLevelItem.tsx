import clsx from "clsx";
import styles from "./SkillLevelItem.module.scss";
import useAccountStore from "../../../../store/auth";

interface SkillLevelItemProps {
  title: string;
  isMostCommon?: boolean;
  icon: React.ReactNode;
  elo: number;
  isActive: boolean;
}

export default function SkillLevelItem({
  title,
  icon,
  isMostCommon,
  elo,
  isActive,
}: SkillLevelItemProps) {
  const selectElo = useAccountStore((state) => state.selectElo);

  const onClickLevel = () => {
    selectElo(elo);
  };

  return (
    <li
      onClick={onClickLevel}
      className={clsx(styles.skillItem, isActive && styles.active)}
    >
      <div>
        <p className={styles.skillLevel}>{title}</p>
        {isMostCommon && <p className={styles.common}>Most Common</p>}
      </div>
      <div className={styles.icon}>{icon}</div>
    </li>
  );
}
