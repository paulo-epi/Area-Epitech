import { useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import { ErrorMessage } from "./GithubButton";

interface IMicrosoftButtonProps {
  children: React.ReactNode;
}

export default function MicrosoftButton(props: IMicrosoftButtonProps) {
  const [error, setError] = useState("");

  const authHandler = (err: any, data: any) => {
    console.log(err, data);
  };

  return (
    <>
      <MicrosoftLogin
        useLocalStorageCache={false}
        clientId={process.env.REACT_APP_MICROSOFT_CLIENT_ID}
        authCallback={authHandler}
        prompt="login"
        buttonTheme="light_short"
        debug={true}
      >
        <div>test</div>
      </MicrosoftLogin>
      {props.children}
      <ErrorMessage pad={error !== ""}>{error}</ErrorMessage>
    </>
  );
}
