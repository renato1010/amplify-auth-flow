import { ChangeEvent } from "react";
import { Button } from ".";
import { styles } from ".";

type ForgotPasswordPropsType = {
  forgotPassword: () => void;
  updateFormState: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const ForgotPassword = ({
  forgotPassword,
  updateFormState,
}: ForgotPasswordPropsType) => {
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
      <Button onClick={forgotPassword} title="Reset password" />
    </div>
  );
};
