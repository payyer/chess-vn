import { useFormContext } from "react-hook-form";
import styles from "./inputFiled.module.scss";
interface inputWrapperProps {
  name: string;
  placeHolder?: string;
  icon: React.ReactNode;
  type: "text" | "password" | "email" | "number" | "tel" | "search" | "url";
  className?: string;
}
export default function InputFiled({
  name,
  placeHolder,
  icon,
  type,
  className,
}: inputWrapperProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={`${styles.inputWrapper} ${className}`}>
      <input
        className={styles.textFiled}
        placeholder={placeHolder ? placeHolder : ""}
        {...register(name, {
          required: `${
            name.charAt(0).toUpperCase() + name.slice(1)
          } is required!`,
        })}
        type={type}
      />
      {errors[name]?.message && (
        <p className={styles.errorMessage}>{errors[name]?.message as string}</p>
      )}
      <div className={styles.inputIcon}>{icon}</div>
    </div>
  );
}
