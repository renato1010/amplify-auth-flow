import { ChangeEvent, CSSProperties, useCallback, useState } from "react";
import { Alert } from "antd";
import {
  SignIn,
  SignUp,
  ConfirmSignUp,
  ForgotPassword,
  ForgotPasswordSubmit,
} from ".";
import {
  confirmSignUp,
  forgotPassword,
  forgotPasswordSubmit,
  signIn,
  signUp,
} from "./utilities";
import { CognitoUserInfo } from "../components";

export type FormStateType = {
  username: string;
  password: string;
  email: string;
  confirmationCode: string;
  isLoading?: boolean;
  errorMsg?: string;
};
const initialFormState: FormStateType = {
  username: "",
  password: "",
  email: "",
  confirmationCode: "",
  isLoading: false,
  errorMsg: "",
};
export type FormType =
  | "signIn"
  | "signUp"
  | "confirmSignUp"
  | "forgotPassword"
  | "forgotPasswordSubmit";
export const Form = ({
  setUser,
}: {
  setUser: (user: CognitoUserInfo) => void;
}) => {
  const [formType, updateFormType] = useState<FormType>("signIn");
  const [formState, updateFormState] = useState(initialFormState);
  const updateForm = (evt: ChangeEvent<HTMLInputElement>) => {
    const newFormState = { ...formState, [evt.target.name]: evt.target.value };
    updateFormState(newFormState);
  };
  const onSignUp = useCallback(async () => {
    updateFormState({ ...formState, isLoading: true });
    try {
      await signUp(formState, updateFormType);
      updateFormState({ ...formState, isLoading: false });
    } catch (error) {
      console.log({ error });
      updateFormState({ ...formState, errorMsg: error.toString() });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(formState)]);
  const renderForm = (): JSX.Element | null => {
    switch (formType) {
      case "signUp":
        return (
          <SignUp
            // signUp={() => signUp(formState, updateFormType)}
            signUp={onSignUp}
            updateFormState={(e) => updateForm(e)}
            isLoading={formState.isLoading}
          />
        );
      case "confirmSignUp":
        return (
          <ConfirmSignUp
            confirmSignUP={() => confirmSignUp(formState, updateFormType)}
            updateFormState={(e) => updateForm(e)}
          />
        );
      case "signIn":
        return (
          <SignIn
            formState={formState}
            signIn={() => signIn(formState, setUser)}
            updateFormState={(e) => updateForm(e)}
          />
        );
      case "forgotPassword":
        return (
          <ForgotPassword
            forgotPassword={() => forgotPassword(formState, updateFormType)}
            updateFormState={(e) => updateForm(e)}
          />
        );
      case "forgotPasswordSubmit":
        return (
          <ForgotPasswordSubmit
            forgotPasswordSubmit={() =>
              forgotPasswordSubmit(formState, updateFormType)
            }
            updateFormState={(e) => updateForm(e)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {formState.errorMsg?.length ? (
        <Alert message={formState.errorMsg} type="error" />
      ) : null}
      {renderForm()}
      {formType === "signUp" && (
        <p style={styles.toggleForm}>
          Already have an account?
          <span style={styles.anchor} onClick={() => updateFormType("signIn")}>
            Sign In
          </span>
        </p>
      )}
      {formType === "signIn" && (
        <>
          <p style={styles.toggleForm}>
            Need an account?
            <span
              style={styles.anchor}
              onClick={() => updateFormType("signUp")}
            >
              Sign Up
            </span>
          </p>
          <p style={{ ...styles.toggleForm, ...styles.resetPasword }}>
            Forget your password ?
            <span
              style={styles.anchor}
              onClick={() => updateFormType("forgotPassword")}
            >
              Reset Password
            </span>
          </p>
        </>
      )}
    </div>
  );
};
type FormStylesType = Record<string, CSSProperties>;
export const styles: FormStylesType = {
  container: {
    display: "flex",
    flexDirection: "column",
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 45,
    marginTop: 8,
    width: 300,
    maxWidth: 300,
    padding: "0px 8px",
    fontSize: 16,
    outline: "none",
    border: "none",
    borderBottom: "2px solid rgba(0, 0, 0, .3)",
  },
  toggleForm: {
    fontWeight: 600,
    padding: "0px 25px",
    marginTop: "15px",
    marginBottom: 0,
    textAlign: "center",
    color: "rgba(0, 0, 0, 0.6)",
  },
  resetPassword: {
    marginTop: "5px",
  },
  anchor: {
    color: "#006bfc",
    cursor: "pointer",
  },
};
