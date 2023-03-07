import { gapi } from "gapi-script";
import { OAuth2Client } from "google-auth-library";

export function getGithubDataAndLog(
  response: any,
  getGithubDataOnSuccess: (access_token: string) => void
) {
  console.log("Success Github");
  const params =
    "?client_id=" +
    process.env.REACT_APP_GITHUB_CLIENT_ID +
    "&client_secret=" +
    process.env.REACT_APP_GITHUB_CLIENT_SECRET +
    "&code=" +
    response.code; // + "&redirect_uri=" + authConfig.redirectUri;
  console.log(`params: ${params}`);
  const paramsBody = JSON.stringify({ params });
  console.log(`paramsBody: ${paramsBody}`);

  fetch("http://localhost:8080/get_access_token" + params, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      getGithubDataOnSuccess(data.access_token);
      // handle the response data
    })
    .catch((error) => {
      console.error(error);
      // handle the error
    });

  // fetch("https://github.com/login/oauth/access_token" + params, {
  //   method: "POST",
  //   headers: {
  //     Accept: "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  // })
  //   .then((responseGithub) => responseGithub.json())
  //   .then((data) => {
  //     console.log(data);
  //     getGithubDataOnSuccess(data.access_token);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  // const code = response.code;
  // const clientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
  // const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
  // const redirectURI = "http://localhost:3000/";
  // const oauthClient = new OAuth2Client(clientID, clientSecret, redirectURI);
  // // Exchange the authorization code for an access token
  // oauthClient.getToken(code, (err, tokens) => {
  //   if (err) {
  //     console.error("Error getting access token:", err);
  //     return;
  //   }
  //   if (tokens?.access_token) {
  //     console.log("tokens.access_token: ", tokens.access_token);
  //     getGithubDataOnSuccess(tokens.access_token);
  //   }
  // });

  // gapi.auth2
  //   .getAuthInstance()
  //   .signIn()
  //   .then(() => {
  //     const user = gapi.auth2.getAuthInstance().currentUser.get();
  //     const accessToken = user.getAuthResponse().access_token;
  //     console.log(`accessToken: ${accessToken}`);
  //     getGithubDataOnSuccess(accessToken);
  //   });

  // gapi.client
  //   .request({
  //     path: "https://github.com/login/oauth/access_token" + params,
  //     method: "POST",
  //     // params: {
  //     //   client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
  //     //   client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
  //     //   code: code,
  //     // },
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   })
  //   .then((response: any) => {
  //     const data = response.result;
  //     const accessToken = data.access_token;
  //     console.log(`accessToken: ${accessToken}`);
  //     getGithubDataOnSuccess(accessToken);
  //   })
  //   .catch((error: any) => {
  //     console.error(error);
  //   });
}
