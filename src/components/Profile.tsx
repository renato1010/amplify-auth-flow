import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Container } from ".";

type CognitoUserInfo = {
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
  username: string;
};
const Profile = () => {
  const [user, setUser] = useState<CognitoUserInfo | null>(null);
  const checkUser = async () => {
    try {
      const { attributes, username } = await Auth.currentUserPoolUser();
      const userInfo: CognitoUserInfo = { ...attributes, username };
      setUser(userInfo);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  if (!user) {
    return null;
  }
  return (
    <Container>
      <h1>Profile</h1>
      <h2>Username: {user.username}</h2>
      <h3>Email: {user.phone_number}</h3>
      <AmplifySignOut />
    </Container>
  );
};

export const ProfileWAuthenticator = withAuthenticator(Profile);
