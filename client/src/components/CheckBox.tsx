import styles from "./CheckBox.module.scss";
export default function CheckBox() {
  return (
    <label
      style={{ fontSize: "14px", color: "#b1b0af" }}
      htmlFor="rememberMe"
      className={styles.checkBoxForm}
    >
      <input
        className={styles.customCheckBox}
        type="checkbox"
        defaultChecked
        id="rememberMe"
      />
      Remember me
    </label>
  );
}
