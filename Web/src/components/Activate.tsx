import { Button } from "antd";
import styled from "styled-components";

interface IActivateProps {
  active: boolean;
  loading?: boolean;
  handleOnClick(): void;
}

export default function Activate(props: IActivateProps) {
  if (props.active) {
    return (
      <StyledButton
        onClick={() => {
          props.handleOnClick();
        }}
        style={{ background: "red" }}
        loading={props.loading}
      >
        Disable
      </StyledButton>
    );
  }
  return (
    <StyledButton
      onClick={() => {
        props.handleOnClick();
      }}
      style={{ background: "#00bd00" }}
      loading={props.loading}
    >
      Enable
    </StyledButton>
  );
}

const StyledButton = styled(Button)`
  color: white;
  border: none;
  width: 120px;
  font-size: 0.9rem;
  :hover {
    color: white !important;
    font-size: 1rem;
    cursor: pointer;
  }
`;
