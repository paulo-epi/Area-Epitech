import {
  createRemoveAreaFormBody,
  IRemoveAreaDetails,
} from "../../utils/createFormBodies";
import { FetchIt } from "../../utils/FetchIt";
import { IAreaHandlingOnResponse } from "./addAreaHandling";

export function removeAreaHandling(
  jwtToken: string,
  details: IRemoveAreaDetails,
  onResponse: IAreaHandlingOnResponse
) {
  let strFormBody: string = createRemoveAreaFormBody(details);

  const handleOnSuccess = () => {
    console.log(`requête remove_area effectuée`);
    onResponse.onSuccess();
  };

  const handleOnError = () => {
    onResponse.onError();
  };

  FetchIt({
    route: "remove_area",
    method: "DELETE",
    strFormBody: strFormBody,
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    jwtToken: jwtToken,
  });
}
