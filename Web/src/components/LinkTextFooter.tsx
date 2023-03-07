import { Link } from "react-router-dom";
import styled from "styled-components";

interface LinkTextFooterProps {
  text: string;
  linkText: string;
  link: string;
}

export default function LinkTextFooter(props: LinkTextFooterProps) {
  return (
    <Footer>
      {props.text}
      <Link to={props.link}> {props.linkText}</Link>
    </Footer>
  );
}

const Footer = styled.div`
  color: white;
  width: 100%;
  text-align: center;
  margin-top: 5px;
`;
