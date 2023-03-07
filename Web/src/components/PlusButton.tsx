import { PlusOutlined } from "@ant-design/icons";
import { Row } from "antd";
import styled from "styled-components";

interface PlusButtonProps {
  handleOnClick(): void;
}

export default function PlusButton(props: PlusButtonProps) {
  return (
    <PlusButtonWrapper
      align="middle"
      justify="end"
      onClick={props.handleOnClick}
    >
      <StyledButton id="PlusButton" align="middle" justify="center">
        <PlusOutlined />
      </StyledButton>
    </PlusButtonWrapper>
  );
}

const PlusButtonWrapper = styled(Row)`
  width: 100%;
`;

const StyledButton = styled(Row)`
  height: 40px;
  width: 40px;
  color: white;
  background: #00df00;
  font-size: large;
  font-weight: 900;
  border-radius: 30px;
  :hover {
    cursor: pointer;
  }
`;
