import { IInput } from "../ActionSelect/FieldInput";

export function createStringFromInputs(inputs: IInput[], id: string) {
  let inputsString = `'{`;

  for (const input of inputs) {
    if (input.id === id) {
      if (
        input.ids.length === 3 &&
        input.ids[0] === "repo_name" &&
        input.ids[1] === "title" &&
        input.ids[2] === "body"
      ) {
        return handleGithubCreateIssueCase(input);
      } else {
        let indexIds = 0;
        for (const value of input.values) {
          inputsString += `"${input.ids[indexIds]}":"${value.replace(
            /'/g,
            "\\'"
          )}"`;
          indexIds += 1;
          if (indexIds < input.ids.length) {
            inputsString += `,`;
          }
        }
      }
    }
  }
  inputsString += `}'`;

  if (inputsString === `'{}'`) {
    inputsString = `""`;
  }

  return inputsString;
}

function handleGithubCreateIssueCase(input: IInput): string {
  return `'{"${input.ids[0]}":"${input.values[0]}","issue":{"${input.ids[1]}":"${input.values[1]}","${input.ids[2]}":"${input.values[2]}"}}'`;
}
