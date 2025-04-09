import { RiLockPasswordFill } from "react-icons/ri";
import InputFiled from "../../../../components/InputFiled";
import styles from "./RegisterForm.module.scss";
import { FaUser } from "react-icons/fa";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import Button from "../../../../components/Button";
import useAccountStore from "../../../../store/auth";

type Inputs = {
  email: string;
  password: string;
};

export default function RegisterForm() {
  const methods = useForm<Inputs>();

  const setEmailPassword = useAccountStore((state) => state.setEmailPassword);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setEmailPassword({ email: data.email, password: data.password });
  };
  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputFiled
            type={"email"}
            name="email"
            icon={<FaUser />}
            placeHolder={"Email"}
            className={clsx(styles.input)}
          />
          <InputFiled
            type={"password"}
            name="password"
            icon={<RiLockPasswordFill />}
            placeHolder={"Password"}
            className={clsx(styles.input)}
          />
          <Button type="submit" className={styles.submit}>
            Continute
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
