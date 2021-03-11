import { PropsWithChildren } from "react";

type ContainerTypeProps = PropsWithChildren<{}>;
export const Container = ({ children }: ContainerTypeProps) => {
  return <div style={styles.container}>{children}</div>;
};

const styles = {
  container: {
    margin: "auto auto",
    padding: "50px 100px",
  },
};
