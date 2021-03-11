import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { RouteComponentProps } from "react-router-dom";

export const protectedRoute = (
  Comp: (p: RouteComponentProps<{}>) => JSX.Element,
  route = "/profile"
) => (props: RouteComponentProps<{}>) => {
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (error) {
      props.history.push(route);
    }
  }
  useEffect(() => {
    checkAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Comp {...props} />;
};
