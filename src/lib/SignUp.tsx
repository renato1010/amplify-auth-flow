import { ChangeEvent } from "react";
import { Button } from ".";
import { styles } from ".";

type SignUpPropsType = {
  signUp: () => void;
  updateFormState: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const SignUp = ({ signUp, updateFormState }: SignUpPropsType) => {
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
      <Button onClick={signUp} title="Sign Up" />
    </div>
  );
};
