import { CSSProperties } from "react";

type ButtonPropsType = {
  title: string;
  onClick: () => void;
};
export const Button = ({ title, onClick }: ButtonPropsType) => {
  return (
    <button style={styles.button} onClick={onClick}>
      {title}
    </button>
  );
};

const styles: Record<string, CSSProperties> = {
  button: {
    backgroundColor: "#006bfc",
    color: "white",
    width: 316,
    height: 45,
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
    border: "none",
    outline: "none",
    borderRadius: 3,
    marginTop: "25px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, .3)",
  },
};
