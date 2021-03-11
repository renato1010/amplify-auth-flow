import { ChangeEvent } from "react";
import { Button, styles, loadingIcon } from ".";
import { FormStateType } from "./Form";

type SignUpPropsType = {
  signUp: () => void;
  updateFormState: (evt: ChangeEvent<HTMLInputElement>) => void;
  formState: FormStateType;
};

export const SignUp = ({
  signUp,
  updateFormState,
  formState: { isLoading, username, password, email },
}: SignUpPropsType) => {
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
      />
      <input
        name="email"
        value={email}
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="email"
      />
      <Button
        onClick={signUp}
        icon={isLoading ? loadingIcon : null}
        title="Sign Up"
      />
    </div>
  );
};
