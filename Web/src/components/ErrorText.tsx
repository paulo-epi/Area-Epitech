import styled from "styled-components";

interface ErrorTextProps {
  title: string;
}

export default function ErrorText(props: ErrorTextProps) {
  return <StyledDiv>{props.title}</StyledDiv>;
}

const StyledDiv = styled.div`
  width: 100%;
  color: red;
  text-align: center;
`;
