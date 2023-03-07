import { colors } from "../utils/colors";
import { PrimaryButtonProps, StyledButton } from "./PrimaryButton";

export default function ErrorButton(props: PrimaryButtonProps) {
  return (
    <StyledButton
      title={props.title}
      onClick={props.handleClick}
      background={colors.red}
    >
      {props.title}
    </StyledButton>
  );
}
