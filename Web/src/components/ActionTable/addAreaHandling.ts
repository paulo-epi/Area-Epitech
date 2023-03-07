import {
  createAddAreaFormBody,
  IAddAreaDetails,
} from "../../utils/createFormBodies";
import { FetchIt } from "../../utils/FetchIt";

export interface IAreaHandlingOnResponse {
  onSuccess(): void;
  onError(): void;
}

export function addAreaHandling(
  jwtToken: string,
  details: IAddAreaDetails,
  onResponse: IAreaHandlingOnResponse
) {
  console.log("details:");
  console.log(details);
  let strFormBody: string = createAddAreaFormBody(details);

  const handleOnSuccess = () => {
    console.log(`requête add_area effectuée`);
    onResponse.onSuccess();
  };

  const handleOnError = () => {
    onResponse.onError();
  };

  FetchIt({
    route: "add_area",
    method: "POST",
    strFormBody: strFormBody,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    jwtToken: jwtToken,
  });
}
