import { FaUser } from "react-icons/fa";
import styles from "./AuthForm.module.scss";
import { RiLockPasswordFill } from "react-icons/ri";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Link } from "react-router";
import InputFiled from "../../../../components/InputFiled";
import Button from "../../../../components/Button";
import CheckBox from "../../../../components/CheckBox";
type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function AuthForm() {
  const methods = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    return console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.loginForm}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <InputFiled
          type={"email"}
          name="email"
          icon={<FaUser />}
          placeHolder={"Email"}
          className={styles.marginTop}
        />
        <InputFiled
          type={"password"}
          name="password"
          icon={<RiLockPasswordFill />}
          placeHolder={"Password"}
          className={styles.marginTop}
        />
        <Button type="submit" className={styles.marginTop}>
          Login
        </Button>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 16,
          }}
          className=""
        >
          <CheckBox />

          <Link style={{ color: "#c3c2c1", fontSize: 14 }} to={"/forgot"}>
            Forgot password?
          </Link>
        </div>
      </form>
    </FormProvider>
  );
}
