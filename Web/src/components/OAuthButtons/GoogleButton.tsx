import { useRecoilValue, useSetRecoilState } from "recoil";
import { isGoogleLoggedIn, JwtToken } from "../../SetupRecoil";
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "@leecheuk/react-google-login";
import { useState } from "react";
import { FetchIt } from "../../utils/FetchIt";
import { createAddOAuthFormBody } from "../../utils/createFormBodies";
import styled from "styled-components";

export interface ResponseData {
  success: boolean;
}

interface IGoogleButtonProps {
  children: React.ReactNode;
}

export default function GoogleButton(props: IGoogleButtonProps) {
  const jwtToken = useRecoilValue(JwtToken);
  const setGoogleLoggedIn = useSetRecoilState(isGoogleLoggedIn);
  const [accessToken, setAccessToken] = useState("");
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState("");

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline | any
  ) => {
    console.log("Success Google");
    if (response.code) {
      console.log(response);
      let details = {
        service_id: "0",
        token: accessToken,
        refresh_token: response.code,
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        client_secret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
        expiry: expiry,
      };
      let strFormBody: string = createAddOAuthFormBody(details);

      const handleOnSuccess = (data: ResponseData) => {
        data.success
          ? console.log("Success add oauth Google")
          : console.log("Failure add oauth Google");
        setGoogleLoggedIn(true);
      };

      const handleOnError = () => {
        setError("There is an error with the server :(");
        setTimeout(() => {
          setError("");
        }, 5000);
      };
      // const expiry = "2023-03-20 11:41:54.642688";

      FetchIt({
        route: "add_oauth",
        method: "POST",
        strFormBody: strFormBody,
        onSuccess: handleOnSuccess,
        onError: handleOnError,
        jwtToken: jwtToken,
      });
    } else {
      console.log(response.xc.expires_in);
      const expiresIn = response.xc.expires_in;
      const now = new Date(Date.now() + expiresIn * 1000 + 3600 * 1000); // add an hour
      const formattedDate = now.toISOString().slice(0, 19).replace("T", " ");
      console.log(formattedDate);
      setExpiry(formattedDate);
      setAccessToken(response.accessToken);
    }
  };

  const onFailure = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log("Failure Google");
    console.log(response);
    setError("Google authentication failed");
    setTimeout(() => {
      setError("");
    }, 5000);
  };

  return (
    <>
      <div id="googleButton">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          prompt="consent"
          accessType="offline"
          responseType="code"
          scope="https://www.googleapis.com/auth/pubsub https://mail.google.com/ https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/calendar.readonly"
        />
      </div>

      {props.children}
      <ErrorMessage pad={error !== ""}>{error}</ErrorMessage>
    </>
  );
}

const ErrorMessage = styled.div<{ pad: boolean }>`
  border-top: solid;
  border-top-color: black;
  padding: ${(props) => (props.pad ? "5px" : "0px")};
  background: -webkit-linear-gradient(
    top,
    #4285f4 20%,
    #34a853 35%,
    #fbbc05 60%,
    #ea4335 80%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
`;
