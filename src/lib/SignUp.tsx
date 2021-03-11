import { ChangeEvent } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Button } from ".";
import { styles } from ".";

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
  const loadingIcon = (
    <SyncOutlined style={{ fontSize: 24, color: "white" }} spin />
  );
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
