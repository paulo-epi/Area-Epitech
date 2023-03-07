import { IAction } from "../../pages/Home";
import { IInput } from "../ActionSelect/FieldInput";

interface OptionType {
  all: string[];
  descs: string[];
  chosen: string;
  id: string;
  inputs: IInput[];
}

export interface DataType {
  area_id: string;
  key: string;
  actions: OptionType;
  reactions: OptionType;
  active: boolean;
  loading: boolean;
}

export function addNewData(
  key: string,
  actionstype: IAction[],
  reactionstype: IAction[],
  area_id?: string
) {
  const every_action: { name: string; id: number; desc: string }[] = [];
  const every_reaction: { name: string; id: number; desc: string }[] = [];

  actionstype.forEach((action) => {
    every_action.push({ name: action.name, id: action.id, desc: action.desc });
  });

  reactionstype.forEach((reaction) => {
    every_reaction.push({
      name: reaction.name,
      id: reaction.id,
      desc: reaction.desc,
    });
  });

  const newElement: DataType = {
    area_id: area_id ? area_id : "",
    key: key,
    actions: {
      all: every_action.map((action) => action.name),
      descs: every_action.map((action) => action.desc),
      chosen: every_action[0].name,
      id: every_action[0].id.toString(),
      inputs: [
        {
          id: "1",
          name: "received a mail from x on gmail",
          titles: ["From who (mail address)"],
          ids: ["adress"],
          values: [""],
        },
        {
          id: "2",
          name: "received a mail from x",
          titles: ["From who (mail address)"],
          ids: ["adress"],
          values: [""],
        },
        {
          id: "5",
          name: "received a message from x",
          titles: ["From who (username)"],
          ids: ["username"],
          values: [""],
        },
        {
          id: "6",
          name: "received a message like x",
          titles: ["Message"],
          ids: ["message"],
          values: [""],
        },
        {
          id: "7",
          name: "new github issue",
          titles: ["Name of the repository"],
          ids: ["repo_name"],
          values: [""],
        },
        {
          id: "8",
          name: "new github star",
          titles: ["Name of the repository"],
          ids: ["repo_name"],
          values: [""],
        },
        {
          id: "12",
          name: "new github fork",
          titles: ["Name of the repository"],
          ids: ["repo_name"],
          values: [""],
        },
        {
          id: "13",
          name: "new github push",
          titles: ["Name of the repository"],
          ids: ["repo_name"],
          values: [""],
        },
      ],
    },
    reactions: {
      all: every_reaction.map((reaction) => reaction.name),
      descs: every_reaction.map((action) => action.desc),
      chosen: every_reaction[0].name,
      id: every_reaction[0].id.toString(),
      inputs: [
        {
          id: "0",
          name: "send a mail on gmail",
          titles: ["Mail address", "Subject", "Message"],
          ids: ["adress", "subject", "message"],
          values: ["", "", ""],
        },
        {
          id: "1",
          name: "send a mail",
          titles: ["Mail address", "Subject", "Message"],
          ids: ["adress", "subject", "message"],
          values: ["", "", ""],
        },
        {
          id: "2",
          name: "create a document",
          titles: ["Title", "Content"],
          ids: ["title", "content"],
          values: ["", ""],
        },
        {
          id: "3",
          name: "create a fork",
          titles: ["Name of the repository"],
          ids: ["repo_name"],
          values: [""],
        },
        {
          id: "4",
          name: "create an issue",
          titles: [
            "Name of the repository",
            "Title of the issue",
            "Body of the issue",
          ],
          ids: ["repo_name", "title", "body"],
          values: ["", "", ""],
        },
        {
          id: "5",
          name: "send a mail to self",
          titles: ["Subject", "Message"],
          ids: ["subject", "message"],
          values: ["", ""],
        },
      ],
    },
    active: false,
    loading: false,
  };
  return newElement;
}
