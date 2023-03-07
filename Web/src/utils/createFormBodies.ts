interface IUserDetails {
  email: string;
  password: string;
}

export function createUserFormBody(details: IUserDetails): string {
  let formBody: string[] = [];
  let encodedValue = "";
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    if (property === "email") {
      encodedValue = encodeURIComponent(details.email);
    } else {
      encodedValue = encodeURIComponent(details.password);
    }
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let strFormBody: string = formBody.join("&");
  return strFormBody;
}

export interface IAddAreaDetails {
  action_id: string;
  action_data: string;
  reaction_id: string;
  reaction_data: string;
}

export function createAddAreaFormBody(details: IAddAreaDetails): string {
  let formBody: string[] = [];
  let encodedValue = "";
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    if (property === "action_id") {
      encodedValue = encodeURIComponent(details.action_id);
    } else if (property === "action_data") {
      encodedValue = encodeURIComponent(details.action_data);
    } else if (property === "reaction_id") {
      encodedValue = encodeURIComponent(details.reaction_id);
    } else if (property === "reaction_data") {
      encodedValue = encodeURIComponent(details.reaction_data);
    }
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let strFormBody: string = formBody.join("&");
  return strFormBody;
}

export interface IRemoveAreaDetails {
  area_id: string;
}

export function createRemoveAreaFormBody(details: IRemoveAreaDetails): string {
  let formBody: string[] = [];
  let encodedValue = "";
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    if (property === "area_id") {
      encodedValue = encodeURIComponent(details.area_id);
    }
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let strFormBody: string = formBody.join("&");
  return strFormBody;
}

interface IAddOAuthDetails {
  service_id: string;
  token: string;
  refresh_token: string;
  client_id: string;
  client_secret: string;
  expiry: string;
}

export function createAddOAuthFormBody(details: IAddOAuthDetails): string {
  let formBody: string[] = [];
  let encodedValue = "";
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    if (property === "service_id") {
      encodedValue = encodeURIComponent(details.service_id);
    } else if (property === "token") {
      encodedValue = encodeURIComponent(details.token);
    } else if (property === "refresh_token") {
      encodedValue = encodeURIComponent(details.refresh_token);
    } else if (property === "client_id") {
      encodedValue = encodeURIComponent(details.client_id);
    } else if (property === "client_secret") {
      encodedValue = encodeURIComponent(details.client_secret);
    } else if (property === "expiry") {
      encodedValue = encodeURIComponent(details.expiry);
    }
    formBody.push(encodedKey + "=" + encodedValue);
  }
  let strFormBody: string = formBody.join("&");
  return strFormBody;
}
