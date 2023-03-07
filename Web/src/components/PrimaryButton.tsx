import styled from "styled-components";
import { colors } from "../utils/colors";

export interface PrimaryButtonProps {
  title: string;
  handleClick(): void;
}

export default function PrimaryButton(props: PrimaryButtonProps) {
  return (
    <StyledButton
      title={props.title}
      onClick={props.handleClick}
      background={colors.blue}
    >
      {props.title}
    </StyledButton>
  );
}

export const StyledButton = styled.button<{ background: string }>`
  border-width: 0px;
  border-radius: 5px;
  padding: 5px 25px;
  background: ${(props) => props.background};
  color: white;
  font-size: 20px;
  :hover {
    cursor: pointer;
  }
`;
