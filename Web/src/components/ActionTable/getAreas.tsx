import { IAction } from "../../pages/Home";
import { FetchIt } from "../../utils/FetchIt";
import { addNewData, DataType } from "./addNewData";

interface IGetAreasDataType {
  area_id: string;
  action: {
    name: string;
    data: string;
  };
  reaction: {
    name: string;
    data: string;
  };
}

interface IGetAreasProps {
  jwtToken: string;
  setRows: React.Dispatch<React.SetStateAction<DataType[]>>;
  actions: IAction[];
  reactions: IAction[];
}

// export interface DataType {
//   area_id: string;
//   key: string;
//   actions: OptionType;
//   reactions: OptionType;
//   active: boolean;
//   loading: boolean;
// }

// export interface IInput {
//   id: string;
//   name: string;
//   titles: string[];
//   ids: string[];
//   values: string[];
// }

interface IObjectType {
  [key: string]: string;
}

interface IGithubIssue {
  repo_name: string;
  issue: {
    title: string;
    body: string;
  };
}

export function getAreas({
  jwtToken,
  setRows,
  actions,
  reactions,
}: IGetAreasProps) {
  const handleAreasOnSuccess = (areas: IGetAreasDataType[]) => {
    console.log("areas: ");
    console.log(areas);
    let rows: DataType[] = areas.map((area, index) => {
      return addNewData(index.toString(), actions, reactions, area.area_id);
    });
    for (const area of areas) {
      for (let a = 0; a < rows.length; a++) {
        if (rows[a].area_id === area.area_id) {
          rows[a].active = true;
          rows[a].actions.chosen = area.action.name;
          rows[a].actions.id =
            rows[a].actions.inputs.find(
              (input) => input.name === area.action.name
            )?.id || rows[a].actions.id;
          for (let b = 0; b < rows[a].actions.inputs.length; b++) {
            if (rows[a].actions.inputs[b].name === area.action.name) {
              const object: IObjectType = JSON.parse(area.action.data);
              for (const [key, value] of Object.entries(object)) {
                for (let i = 0; i < rows[a].actions.inputs[b].ids.length; i++) {
                  if (rows[a].actions.inputs[b].ids[i] === key) {
                    rows[a].actions.inputs[b].values[i] = value;
                  }
                }
              }
            }
          }
          rows[a].reactions.chosen = area.reaction.name;
          rows[a].reactions.id =
            rows[a].reactions.inputs.find(
              (input) => input.name === area.reaction.name
            )?.id || rows[a].reactions.id;
          for (let b = 0; b < rows[a].reactions.inputs.length; b++) {
            if (rows[a].reactions.inputs[b].name === area.reaction.name) {
              if (area.reaction.name === "create an issue") {
                const object: IGithubIssue = JSON.parse(area.reaction.data);
                for (
                  let i = 0;
                  i < rows[a].reactions.inputs[b].ids.length;
                  i++
                ) {
                  if (rows[a].reactions.inputs[b].ids[i] === "repo_name") {
                    rows[a].reactions.inputs[b].values[i] = object.repo_name;
                  }
                  if (rows[a].reactions.inputs[b].ids[i] === "title") {
                    rows[a].reactions.inputs[b].values[i] = object.issue.title;
                  }
                  if (rows[a].reactions.inputs[b].ids[i] === "body") {
                    rows[a].reactions.inputs[b].values[i] = object.issue.body;
                  }
                }
              } else {
                const object: IObjectType = JSON.parse(area.reaction.data);
                for (const [key, value] of Object.entries(object)) {
                  for (
                    let i = 0;
                    i < rows[a].reactions.inputs[b].ids.length;
                    i++
                  ) {
                    if (rows[a].reactions.inputs[b].ids[i] === key) {
                      rows[a].reactions.inputs[b].values[i] = value;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log("rows:");
    console.log(rows);
    setRows(rows);
  };

  FetchIt({
    route: "areas",
    method: "GET",
    strFormBody: "",
    onSuccess: handleAreasOnSuccess,
    onError: () => {},
    jwtToken,
  });
}
