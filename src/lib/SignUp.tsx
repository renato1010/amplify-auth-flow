import { ChangeEvent } from "react";
import { Button, styles, loadingIcon } from ".";

type SignUpPropsType = {
  signUp: () => void;
  updateFormState: (evt: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
};

export const SignUp = ({
  signUp,
  updateFormState,
  isLoading,
}: SignUpPropsType) => {
  return (
    <div style={styles.container}>
      <input
        name="username"
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
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="password"
      />
      <input
        name="email"
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
