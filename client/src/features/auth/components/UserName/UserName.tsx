import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styles from "./UserName.module.scss";
import InputFiled from "../../../../components/InputFiled";
import Button from "../../../../components/Button";
import clsx from "clsx";
import { FaUserAlt } from "react-icons/fa";
import useAccountStore from "../../../../store/auth";

type Inputs = {
  username: string;
};

export default function UserName() {
  const methods = useForm<Inputs>();
  const { setError } = methods;
  const setName = useAccountStore((state) => state.setName);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Check username already exists
    if (data.username === "quocanhh") {
      setError("username", {
        type: "manual",
        message: "Name already exists",
      });
      return;
    }
    setName(data.username);
  };

  return (
    <div className={styles.wrapper}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InputFiled
            type={"text"}
            name="username"
            placeHolder={"Name"}
            className={clsx(styles.input)}
            icon={<FaUserAlt />}
          />

          <Button type="submit" className={styles.submit}>
            Continute
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
