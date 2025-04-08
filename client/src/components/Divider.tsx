import styles from "./divider.module.scss";
interface DividerProps {
  text?: string;
  className?: string;
}
export default function Divider({ text, className }: DividerProps) {
  return (
    <div className={`${styles.divider} ${className}`}>
      {text ? <span>{text}</span> : null}
    </div>
  );
}
