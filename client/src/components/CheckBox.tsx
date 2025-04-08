export default function CheckBox() {
  return (
    <label
      style={{ fontSize: "14px", color: "#b1b0af" }}
      htmlFor="rememberMe"
      className="form-control"
    >
      <input type="checkbox" defaultChecked id="rememberMe" />
      Remember me
    </label>
  );
}
