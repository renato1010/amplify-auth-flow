import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { Container } from "./Container";
import { RouteComponentProps } from "react-router-dom";

// type ProtectedTypeProps = RouteComponentProps | {};
export const Protected = ({ history }: RouteComponentProps<{}>) => {
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => console.log({ user }))
      .catch(() => {
        history.push("/profile");
      });
  }, [history]);
  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  );
};
