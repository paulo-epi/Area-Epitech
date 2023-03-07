import { Col, Row } from "antd";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CheckMark from "../CheckMark";
import GoogleButton from "./GoogleButton";
import { isGithubLoggedIn, isGoogleLoggedIn } from "../../SetupRecoil";
import GithubButton from "./GithubButton";
import MicrosoftButton from "./MicrosoftButton";

export default function OAuthButtons() {
  const googleLoggedIn = useRecoilValue(isGoogleLoggedIn);
  const githubLoggedIn = useRecoilValue(isGithubLoggedIn);
  const ButtonsSynchronized: JSX.Element[] = [
    <GoogleButton children={<CheckMark isValid={googleLoggedIn} />} />,
    <GithubButton children={<CheckMark isValid={githubLoggedIn} />} />,
    // <MicrosoftButton children={<CheckMark isValid={false} />} />,
  ];

  return (
    <StyledOAuthButtons>
      {ButtonsSynchronized.map((OAButton: JSX.Element, index: number) => (
        <Col key={`${index}: ${OAButton.key}`}>
          <LogoButtonWrapper>
            <StyledBackground justify="center" align="middle">
              {OAButton}
            </StyledBackground>
          </LogoButtonWrapper>
        </Col>
      ))}
    </StyledOAuthButtons>
  );
}

const LogoButtonWrapper = styled.div`
  margin: 10px;
  min-height: 90px;
  width: 160px;
  display: flex;
  flex-direction: column;
`;

const StyledOAuthButtons = styled(Row)`
  margin: 10px 0;
`;

const StyledBackground = styled(Row)`
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 5px;
  padding: 10px;
`;
