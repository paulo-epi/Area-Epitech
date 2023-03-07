import { DataType } from "./addNewData";

export function isServiceConnected(
  row: DataType,
  services: {
    isGoogleConnected: boolean;
    isGithubConnected: boolean;
  },
  setError: React.Dispatch<React.SetStateAction<string>>
): boolean {
  const googleActionsIds = ["1", "3", "4", "11"];
  const githubActionsIds = ["7", "8", "12", "13"];
  // const microsoftActionsIds = ["2", "5", "6", "10"];
  const googleReactionsIds = ["0"];
  const githubReactionsIds = ["3", "4"];
  // const microsoftReactionsIds = ["1", "5"];
  if (googleActionsIds.includes(row.actions.id)) {
    if (!services.isGoogleConnected) {
      setError(
        `You must login to Google to use this action (${row.actions.chosen})`
      );
    }
    if (!services.isGoogleConnected) {
      return false;
    }
  }
  if (githubActionsIds.includes(row.actions.id)) {
    if (!services.isGithubConnected) {
      setError(
        `You must login to Github to use this action (${row.actions.chosen})`
      );
    }
    if (!services.isGithubConnected) {
      return false;
    }
  }
  if (googleReactionsIds.includes(row.reactions.id)) {
    if (!services.isGoogleConnected) {
      setError(
        `You must login to Google to use this reaction (${row.reactions.chosen})`
      );
    }
    if (!services.isGoogleConnected) {
      return false;
    }
  }
  if (githubReactionsIds.includes(row.reactions.id)) {
    if (!services.isGithubConnected) {
      setError(
        `You must login to Github to use this reaction (${row.reactions.chosen})`
      );
    }
    if (!services.isGithubConnected) {
      return false;
    }
  }
  return true;
}

/* actions :
  id 1 : google
  id 2 : microsoft
  id 3 : google
  id 4 : google
  id 5 : microsoft
  id 6 : microsoft
  id 7 : github
  id 8 : github
  id 10 : microsoft<
  id 11 : google
  id 12 : github
  id 13 : github
*/

/* reactions :
  id 0 : google
  id 1 : microsoft
  id 3 : github
  id 4 : github
  id 5 : microsoft
*/
