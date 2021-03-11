import { ChangeEvent } from "react";
import { Button, styles, loadingIcon } from ".";
import { FormStateType } from "./Form";

type SignInPropsType = {
  formState: FormStateType;
  signIn: () => void;
  updateFormState: (evt: ChangeEvent<HTMLInputElement>) => void;
};
export const SignIn = ({
  formState: { username, password, isLoading },
  signIn,
  updateFormState,
}: SignInPropsType) => {
  return (
    <div style={styles.container}>
      <input
        name="username"
        value={username}
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="username"
        autoComplete="off"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="password"
        autoComplete="new-password"
      />
      <Button
        onClick={signIn}
        title="Sign In"
        icon={isLoading ? loadingIcon : null}
      />
    </div>
  );
};
