import { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
import { Button } from "antd";
import { Container } from ".";
import { Form } from "../lib";

export type CognitoUserInfo = {
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
  username: string;
};
export const Profile = () => {
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
  const signOut = async () => {
    Auth.signOut().catch((err) => console.log("error signing out: ", err));
  };
  useEffect(() => {
    checkUser();
    Hub.listen("auth", (data) => {
      const { payload } = data;
      if (payload.event === "signOut") {
        setUser(null);
      }
    });
  }, []);
  if (user) {
    return (
      <Container>
        <h1>Profile</h1>
        <h2>Username: {user?.username ?? ""}</h2>
        <h3>Email: {user?.phone_number ?? ""}</h3>
        <h4>Phone: {user?.phone_number}</h4>
        <Button onClick={signOut}>Sign Out</Button>
      </Container>
    );
  }
  return <Form setUser={setUser} />;
};
