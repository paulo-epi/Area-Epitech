declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      PWD: string;
      REACT_APP_GOOGLE_CLIENT_ID: string;
      REACT_APP_GOOGLE_CLIENT_SECRET: string;
      REACT_APP_GITHUB_CLIENT_ID: string;
      REACT_APP_GITHUB_CLIENT_SECRET: string;
      REACT_APP_MICROSOFT_CLIENT_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
