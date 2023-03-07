import { Row } from "antd";
import styled from "styled-components";

interface TitleProps {
  title: string;
}

export default function Title(props: TitleProps) {
  return (
    <Row align="middle" justify="center">
      <StyledTitle>{props.title}</StyledTitle>
    </Row>
  );
}

const StyledTitle = styled.h1`
  color: white;
  font-size: 40px;
  margin-top: 100px;
`;
