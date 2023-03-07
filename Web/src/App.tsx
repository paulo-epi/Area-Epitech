import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import CheckConnection from "./pages/CheckConnection";
import { gapi } from "gapi-script";
import { useEffect } from "react";
import Download from "./pages/Download";

function App() {
  useEffect(() => {
    function start() {
      gapi.load("auth2", function () {
        const googleAuthOptions = {
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope:
            "https://www.googleapis.com/auth/pubsub https://mail.google.com/ https://www.googleapis.com/auth/documents https://www.googleapis.com/auth/calendar.readonly",
        };
        const githubAuthOptions = {
          client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
          client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
          scope: "repo user read:org",
        };
        gapi.client.init({
          apiKey: "AIzaSyBMlhPhiD0UBsdnOhzyEILTjfRkED6Ccgk",
          clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "profile email",
        });
        gapi.auth2.getAuthInstance(googleAuthOptions);
        gapi.auth2.getAuthInstance(githubAuthOptions);
      });
    }

    gapi.load("client:auth2", start);
  });

  //<Link to="../public/logo192.png" target="_blank" download>Download</Link>
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/error" element={<Error />}></Route>
      <Route path="/client.apk" element={<Download />}></Route>
      <Route path="" element={<CheckConnection children={<Home />} />}></Route>
    </Routes>
  );
}

export default App;
