/**
 * utility functions for the AWS Amplify Auth service
 */
import Auth from "@aws-amplify/auth";
import { FormStateType } from "../";
import { CognitoUserInfo } from "../../components";
import { FormType } from "../Form";

export async function signIn(
  { username, password }: FormStateType,
  setUser: (user: CognitoUserInfo) => void
): Promise<void> {
  try {
    const { attributes, username: signedUsername } = await Auth.signIn(
      username,
      password
    );
    const userInfo: CognitoUserInfo = {
      username: signedUsername,
      ...attributes,
    };
    setUser(userInfo);
  } catch (error) {
    console.log("error signing in: ", error);
    throw new Error(`Error signing in: ${error?.message ?? error.toString()}`);
  }
}

export async function signUp(
  { username, password, email }: FormStateType,
  updateFormType: (type: FormType) => void
): Promise<void> {
  try {
    await Auth.signUp({ username, password, attributes: { email } });
    console.log("sign up success!");
    updateFormType("confirmSignUp");
  } catch (error) {
    console.log("error signing up: ", error);
  }
}

export async function confirmSignUp(
  { username, confirmationCode }: FormStateType,
  updateFormType: (type: FormType) => void
) {
  try {
    await Auth.confirmSignUp(username, confirmationCode);
    updateFormType("signIn");
  } catch (error) {
    console.log("error signing up: ", error);
  }
}

export async function forgotPassword(
  { username }: FormStateType,
  updateFormType: (type: FormType) => void
) {
  try {
    await Auth.forgotPassword(username);
    updateFormType("forgotPasswordSubmit");
  } catch (error) {
    console.log("error submitting username to reset password ", error);
  }
}

export async function forgotPasswordSubmit(
  { username, confirmationCode, password }: FormStateType,
  updateFormType: (type: FormType) => void
) {
  try {
    await Auth.forgotPasswordSubmit(username, confirmationCode, password);
    updateFormType("signIn");
  } catch (error) {
    console.log("error updating password ", error);
  }
}
