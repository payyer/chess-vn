import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import styles from "./UserName.module.scss";
import InputFiled from "../../../../components/InputFiled";
import Button from "../../../../components/Button";
import clsx from "clsx";
import { FaUserAlt } from "react-icons/fa";
import useAccountStore from "../../../../store/auth";
import SubTitle from "../SubTitle/SubTitle";
import { Link, useNavigate } from "react-router";
import { IoArrowBack } from "react-icons/io5";
import { useEffect } from "react";

type Inputs = {
  username: string;
};

export default function UserName() {
  const methods = useForm<Inputs>();
  const { setError } = methods;
  const setName = useAccountStore((state) => state.setName);
  const step = useAccountStore((state) => state.step);
  const setStep = useAccountStore((state) => state.setStep);
  const resetFiled = useAccountStore((state) => state.resetFiled);
  const navigation = useNavigate();

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
    setStep("completed");
    navigation({ pathname: "/register", search: "?step=completed" });
  };

  useEffect(() => {
    if (step != "username") {
      navigation("/register");
      setStep("main-screen");
      resetFiled();
    }
  }, []);

  return (
    <>
      <SubTitle
        title="Choose a username"
        subTitle="This is what your friends and other players will see when you play"
      />
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

            <Button type="submit" className={clsx(styles.submit)}>
              Continute
            </Button>
          </form>
        </FormProvider>
      </div>
      <Link
        onClick={() => {
          setStep("login-info");
        }}
        to={{ pathname: "/register", search: "?step=login-info" }}
        className={styles.backLink}
      >
        <IoArrowBack className={styles.backBtn} />
      </Link>
    </>
  );
}
