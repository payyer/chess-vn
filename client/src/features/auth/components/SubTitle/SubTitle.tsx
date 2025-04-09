import styles from "./SubTitle.module.scss";
interface ISubTitle {
  title: string;
  subTitle?: string;
}
export default function SubTitle({ title, subTitle }: ISubTitle) {
  return (
    <>
      <p className={styles.title}>{title}</p>
      {subTitle ? <p className={styles.sub}>{subTitle}</p> : null}
    </>
  );
}
