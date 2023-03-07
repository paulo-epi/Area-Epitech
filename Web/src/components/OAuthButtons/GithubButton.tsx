import { GithubOutlined } from "@ant-design/icons";
import { Row } from "antd";
import { useState } from "react";
import LoginGithub from "react-login-github";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { JwtToken } from "../../SetupRecoil";
import { isGithubLoggedIn } from "../../SetupRecoil";
import { createAddOAuthFormBody } from "../../utils/createFormBodies";
import { FetchIt } from "../../utils/FetchIt";
import { getGithubDataAndLog } from "./getGithubDataAndLog";
import { ResponseData } from "./GoogleButton";

interface IGithubButtonProps {
  children: React.ReactNode;
}

/*
  voir database.sql pour savoir quels inputs garder : google, github et météo
*/

export default function GithubButton(props: IGithubButtonProps) {
  const jwtToken = useRecoilValue(JwtToken);
  const setGithubLoggedIn = useSetRecoilState(isGithubLoggedIn);
  const [error, setError] = useState("");

  const onSuccess = (response: any) => {
    const getGithubDataOnSuccess = (access_token: string) => {
      let details = {
        service_id: "2",
        token: access_token,
        refresh_token: "",
        client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
        expiry: "2023-03-20 11:41:54.642688",
      };
      let strFormBody: string = createAddOAuthFormBody(details);

      const handleOnSuccess = (data: ResponseData) => {
        data.success
          ? console.log("Success add oauth Github")
          : console.log("Failure add oauth Github");
        setGithubLoggedIn(true);
      };

      const handleOnError = () => {
        setError("There is an error with the server :(");
        setTimeout(() => {
          setError("");
        }, 5000);
      };

      FetchIt({
        route: "add_oauth",
        method: "POST",
        strFormBody: strFormBody,
        onSuccess: handleOnSuccess,
        onError: handleOnError,
        jwtToken: jwtToken,
      });
    };

    getGithubDataAndLog(response, getGithubDataOnSuccess);
  };

  const onFailure = (response: any) => {
    console.log("Failure Github");
    console.log(response);
    setError("Github authentication failed");
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <>
      <StyledGithubButton justify="space-around" align="middle">
        <StyledGithubOutlined />
        <div id="githubButton">
          <StyledLoginGithub
            clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
            clientSecret={process.env.REACT_APP_GITHUB_CLIENT_SECRET}
            onSuccess={onSuccess}
            onFailure={onFailure}
            buttonText="Login"
            // prompt="consent"
            // accessType="offline"
            // responseType="code"
            scope="repo user read:org"
          />
        </div>
      </StyledGithubButton>

      {props.children}
      <ErrorMessage pad={error !== ""}>{error}</ErrorMessage>
    </>
  );
}

const StyledGithubButton = styled(Row)`
  border: solid;
  border-color: #57575799;
  border-width: 1px;
  border-radius: 2px;
  box-shadow: 1px 2px 2px #44444487;
  width: 100px;
  :hover {
    cursor: pointer;
  }
`;

const StyledGithubOutlined = styled(GithubOutlined)`
  color: black;
  font-size: x-large;
  :hover {
    cursor: pointer;
  }
`;

const StyledLoginGithub = styled(LoginGithub)`
  height: 42px;
  border: none;
  background: none;
  :hover {
    cursor: pointer;
  }
`;

export const ErrorMessage = styled.div<{ pad: boolean }>`
  border-top: solid;
  border-top-color: black;
  padding: ${(props) => (props.pad ? "5px" : "0px")};
  color: black;
  text-align: center;
`;
