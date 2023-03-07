import { Row } from "antd";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface LogoButtonProps {
  logo: string;
  text: string;
  background: string;
  href: string;
  url?: string;
}

export default function LogoButton(props: LogoButtonProps) {
  const navigate = useNavigate();

  function handleOnClick() {
    if (props.url) {
      navigate(props.url);
    }
  }

  return (
    <a href={props.href} target="_blank" rel="noopener noreferrer">
      <LogoButtonWrapper
        align="middle"
        justify="center"
        background={props.background}
        onClick={handleOnClick}
      >
        <Row align="middle" justify="center">
          <Logo alt="logo" src={props.logo} />
          <StyledText>{props.text}</StyledText>
        </Row>
      </LogoButtonWrapper>
    </a>
  );
}

const Logo = styled.img`
  width: 20px;
  height: 20px;
`;

const StyledText = styled.span`
  color: black;
  font-size: 0.8rem;
  margin: 0px 4px;
  text-align: center;
`;

const LogoButtonWrapper = styled(Row)<{ background: string }>`
  color: white;
  max-width: 300px;
  height: auto;
  border: solid;
  border-color: white;
  border-width: 1px;
  border-radius: 10px;
  background: ${(props) => props.background};
  padding: 5px 15px;
  :hover {
    cursor: pointer;
  }
`;
