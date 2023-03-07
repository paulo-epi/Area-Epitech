import { url } from "./variables";

interface FetchItProps {
  route: string;
  method: string;
  strFormBody: string;
  onSuccess(data: any): void;
  onError(): void;
  jwtToken: string;
}

export function FetchIt({
  route,
  method,
  strFormBody,
  onSuccess,
  onError,
  jwtToken,
}: FetchItProps) {
  fetch(`${url}${route}`, {
    method: method,
    headers: {
      jwt: jwtToken,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: strFormBody !== "" ? strFormBody : undefined,
  })
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      console.log(error);
      onError();
    });
}
