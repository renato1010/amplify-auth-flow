## AWS Amplify Authentication flow

To show a typical Authentication flow, a basic React app with 3 routes, home, profile and secured Route  
it's in the profile route where we show forms for auth:

- Sign In
- Sign Up
- Confirm Sign Up
- Forgot Password
- Forgot Password Submit

And _Sign Out_ button to log out.

![Authentication flow](https://icons-images.s3.us-east-2.amazonaws.com/screencasts/signUp_signIn_Peek+2021-03-11+08-48.gif)

### Note

You will need an AWS acc. and also need some keys to configure the project, watch this [video](https://youtu.be/fWbM5DLh25U)  
to learn how to configure the Amplify CLI

## Credits

This example and code is based on book **Full Stack Serverless** by [Nader Dabit](https://twitter.com/dabit3)  
I changed the project a bit using `Typescript` insted of `JavaScript` on code examples, and other minor changes  
_node-fetch_ instead of _Axios_. and other UI adds on  
AWS Amplify will generete the `src/aws-exports.js` file that you will need to configure the React client App

## Functionality

The workhorse is **Auth** class and the core functionality is exposed at: `src/lib/utilities/auth.ts`

```ts
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
    throw new Error(`At Signing in: ${error?.message ?? error.toString()}`);
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
    throw new Error(`At signing up: ${error?.message ?? error.toString()}`);
  }
}
```

Then the _Form_ component (src/lib/Form.tsx) will keep track of the state to show the right form block

```ts
  const renderForm = (): JSX.Element | null => {
    switch (formType) {
      case "signUp":
        return (
          <SignUp
            signUp={onSignUp}
            updateFormState={(e) => updateForm(e)}
            formState={formState}
          />
        );
      case "signIn":
        return (
          <SignIn
            formState={formState}
            signIn={onSignIn}
            updateFormState={(e) => updateForm(e)}
          />
        );

```
