import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface ICheckMarkProps {
  isValid: boolean;
  disableText?: boolean;
}

export default function CheckMark(props: ICheckMarkProps) {
  return (
      <StyledCheckMark isValid={props.isValid}>
        <div style={{ display: "flex", flexDirection: "column" }}>
        {!props.disableText ? (props.isValid ? "Connected" : "Not connected") : ""}{" "}
        {props.isValid ? (
          <CheckCircleOutlined
            style={{ color: `${props.isValid ? "green" : "red"}`, marginTop: "10px" }}
          />
        ) : (
          <CloseCircleOutlined
            style={{ color: `${props.isValid ? "green" : "red"}`, marginTop: "10px" }}
          />
        )}
        </div>
      </StyledCheckMark>
  );
}

const StyledCheckMark = styled.div<{ isValid: boolean }>`
  font-size: large;
  padding: 5px;
  color: ${(props) => (props.isValid ? "green" : "red")};
`;
