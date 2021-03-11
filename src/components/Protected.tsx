import { Container } from "./Container";
import { RouteComponentProps } from "react-router-dom";
import { protectedRoute } from "../protectedRoute";

// type ProtectedTypeProps = RouteComponentProps | {};
const Protected = ({ history }: RouteComponentProps<{}>) => {
  return (
    <Container>
      <h1>Protected route</h1>
    </Container>
  );
};

export const ProtectedProtected = protectedRoute(Protected);
