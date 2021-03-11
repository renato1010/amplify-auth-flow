import { ChangeEvent } from "react";
import { Button } from ".";
import { styles } from ".";

type ForgotPasswordSubmitPropsType = {
  forgotPasswordSubmit: () => void;
  updateFormState: (evt: ChangeEvent<HTMLInputElement>) => void;
};
export const ForgotPasswordSubmit = ({
  forgotPasswordSubmit,
  updateFormState,
}: ForgotPasswordSubmitPropsType) => {
  return (
    <div style={styles.container}>
      <input
        name="confirmationCode"
        placeholder="Confirmation code"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="New password"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
      />
      <Button onClick={forgotPasswordSubmit} title="Save new password" />
    </div>
  );
};
