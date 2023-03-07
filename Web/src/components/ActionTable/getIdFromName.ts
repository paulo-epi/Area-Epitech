import { IAction } from "../../pages/Home";

export function getIdFromActionName(actions: IAction[], name: string) {
  const action = actions.find((action) => action.name === name);
  if (action) {
    return action.id.toString();
  }
  return "";
}

export function getIdFromReactionName(reactions: IAction[], name: string) {
  const reaction = reactions.find((reaction) => reaction.name === name);
  if (reaction) {
    return reaction.id.toString();
  }
  return "";
}
