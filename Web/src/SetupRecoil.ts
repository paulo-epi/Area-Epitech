import { atom } from "recoil";

export const exampleState = atom({
  key: "exampleState", // ID unique
  default: "Example", // valeur par défaut
});

export const isRegistered = atom({
  key: "isRegistered",
  default: false,
});

export const JwtToken = atom({
  key: "JwtToken",
  default: "",
});

export const isLoggedIn = atom({
  key: "isLoggedIn",
  default: false,
});

export const isGoogleLoggedIn = atom({
  key: "isGoogleLoggedIn",
  default: false,
});

export const isGithubLoggedIn = atom({
  key: "isGithubLoggedIn",
  default: false,
});
