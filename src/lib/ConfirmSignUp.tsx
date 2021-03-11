import { ChangeEvent } from "react";
import { Button } from ".";
import { styles } from ".";

type ConfirmSignUpPropsType = {
  confirmSignUP: () => void;
  updateFormState: (evt: ChangeEvent<HTMLInputElement>) => void;
};

export const ConfirmSignUp = ({
  confirmSignUP,
  updateFormState,
}: ConfirmSignUpPropsType) => {
  return (
    <div style={styles.container}>
      <input
        name="confirmationCode"
        onChange={(e) => {
          e.persist();
          updateFormState(e);
        }}
        style={styles.input}
        placeholder="Confirmation Code"
      />
      <Button onClick={confirmSignUP} title="Confirm Sign Up" />
    </div>
  );
};
