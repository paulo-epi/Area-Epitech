import { Row } from "antd";
import styled from "styled-components";
import LinkTextFooter from "../components/LinkTextFooter";

export default function Error() {
  return (
    <StyledError align="middle" justify="center">
      <div>
        <StyledText>
          Error: you must be logged in to access this page
        </StyledText>
        <LinkTextFooter text="" linkText="Login" link="/login" />
      </div>
    </StyledError>
  );
}

const StyledError = styled(Row)`
  width: 100vw;
  height: 100vh;
  background: #22272e;
`;

const StyledText = styled.div`
  font-size: 2rem;
  color: white;
  max-width: 80vw;
  text-align: center;
`;
