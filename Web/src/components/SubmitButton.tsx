import { LoadingOutlined } from "@ant-design/icons";
import { Row, Spin } from "antd";
import styled from "styled-components";
import { colors } from "../utils/colors";

interface SubmitButtonProps {
  title: string;
  loading?: boolean;
}

export default function SubmitButton(props: SubmitButtonProps) {
  const loadIcon = <LoadingOutlined spin />;

  return (
    <Row justify="center">
      <StyledButton type="submit">
        {props.loading && (
          <Spin size="small" indicator={loadIcon} style={{ color: "white" }} />
        )}{" "}
        {props.title}
      </StyledButton>
    </Row>
  );
}

const StyledButton = styled.button`
  font-size: 20px;
  width: 100%;
  color: white;
  background: ${colors.blue};
  padding: 5px 10px;
  border-radius: 5px;
  margin-top: 15px;
  margin-bottom: 10px;
  border: none;
  :hover {
    cursor: pointer;
  }
  border-width: 1px;
  height: 38px;
`;
