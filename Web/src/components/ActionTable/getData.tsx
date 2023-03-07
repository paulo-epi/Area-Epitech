import { IAction } from "../../pages/Home";
import { cloneRows } from "../../utils/cloneRows";
import ActionSelect from "../ActionSelect/ActionSelect";
import Activate from "../Activate";
import CheckMark from "../CheckMark";
import PlusButton from "../PlusButton";
import { addNewData, DataType } from "./addNewData";
import { addAreaHandling } from "./addAreaHandling";
import { getIdFromActionName, getIdFromReactionName } from "./getIdFromName";
import { createStringFromInputs } from "./createStringFromInputs";
import { removeAreaHandling } from "./removeAreaHandling";
import { getAreas } from "./getAreas";
import { areInputsFilled } from "./areInputsFilled";
import { isServiceConnected } from "./isServiceConnected";

export interface JsxType {
  key: string;
  action: JSX.Element;
  reaction: JSX.Element;
  active: JSX.Element;
  activate: JSX.Element;
}

interface IGetDataProps {
  rows: DataType[];
  actions: IAction[];
  reactions: IAction[];
  setRows: React.Dispatch<React.SetStateAction<DataType[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  jwtToken: string;
  isGithubConnected: boolean;
  isGoogleConnected: boolean;
}

export function getData({
  rows,
  actions,
  reactions,
  setRows,
  setError,
  jwtToken,
  isGithubConnected,
  isGoogleConnected,
}: IGetDataProps): JsxType[] {
  const data: JsxType[] = [];

  function handleOnAdd() {
    const index = rows.length.toString();
    let newRows = cloneRows(rows);
    const newRow = addNewData(index, actions, reactions);
    newRows.push(newRow);
    setRows(newRows);
  }

  function handleOnSelect(i: number, chosen: string, action?: boolean) {
    let newRows = cloneRows(rows);

    if (action) {
      newRows[i].actions.chosen = chosen;
      newRows[i].actions.id = getIdFromActionName(actions, chosen);
    } else {
      newRows[i].reactions.chosen = chosen;
      newRows[i].reactions.id = getIdFromReactionName(reactions, chosen);
    }
    setRows(newRows);
  }

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    title: string,
    id: string,
    row_id: string,
    action?: boolean
  ) {
    let newRows = cloneRows(rows);
    let index1 = 0;
    for (let input of action
      ? newRows[Number(row_id)].actions.inputs
      : newRows[Number(row_id)].reactions.inputs) {
      if (input.id === id) {
        let index2 = 0;
        for (const iTitle of input.titles) {
          if (iTitle === title) {
            if (action) {
              newRows[Number(row_id)].actions.inputs[index1].values[index2] =
                e.currentTarget.value;
            } else {
              newRows[Number(row_id)].reactions.inputs[index1].values[index2] =
                e.currentTarget.value;
            }
          }
          index2 += 1;
        }
      }
      index1 += 1;
    }
    setRows(newRows);
  }

  function handleOnClick(i: number) {
    let newRows = cloneRows(rows);

    const handleOnSuccess = () => {
      let successNewRows = cloneRows(rows);
      successNewRows[i].loading = false;
      successNewRows[i].active = !successNewRows[i].active;
      setRows(successNewRows);
      getAreas({ jwtToken, setRows, actions, reactions });
    };

    const handleOnError = () => {
      let errorNewRows = cloneRows(rows);
      errorNewRows[i].loading = false;
      setRows(errorNewRows);
      setError("Something went wrong. Maybe the server is down?");
    };

    if (jwtToken) {
      // setTimeout(() => {
      if (newRows[i].active) {
        newRows[i].loading = true;
        setRows(newRows);
        removeAreaHandling(
          jwtToken,
          { area_id: newRows[i].area_id },
          { onError: handleOnError, onSuccess: handleOnSuccess }
        );
      } else {
        if (
          areInputsFilled(newRows[i], setError) &&
          isServiceConnected(
            newRows[i],
            { isGoogleConnected, isGithubConnected },
            setError
          )
        ) {
          newRows[i].loading = true;
          setRows(newRows);
          addAreaHandling(
            jwtToken,
            {
              action_id: newRows[i].actions.id,
              action_data: createStringFromInputs(
                newRows[i].actions.inputs,
                newRows[i].actions.id
              ),
              reaction_id: newRows[i].reactions.id,
              reaction_data: createStringFromInputs(
                newRows[i].reactions.inputs,
                newRows[i].reactions.id
              ),
            },
            { onError: handleOnError, onSuccess: handleOnSuccess }
          );
        }
      }
      // }, 2000);
    } else {
      console.log("Error: you are not logged in");
      setError("You are not logged in");
    }
  }

  for (let i = 0; i <= rows.length; i++) {
    if (i === rows.length) {
      data.push({
        key: i.toString(),
        action: <></>,
        reaction: <></>,
        active: <></>,
        activate: <PlusButton handleOnClick={handleOnAdd} />,
      });
    } else {
      data.push({
        key: i.toString(),
        action: (
          <ActionSelect
            key={`action - ${i}`}
            options={rows[i].actions.all}
            descs={rows[i].actions.descs}
            i={i}
            id={rows[i].actions.id}
            chosen={rows[i].actions.chosen}
            inputs={rows[i].actions.inputs}
            handleOnSelect={handleOnSelect}
            handleOnChange={handleOnChange}
            action
            active={rows[i].active}
          />
        ),
        reaction: (
          <ActionSelect
            key={`reaction - ${i}`}
            options={rows[i].reactions.all}
            descs={rows[i].reactions.descs}
            i={i}
            id={rows[i].reactions.id}
            chosen={rows[i].reactions.chosen}
            inputs={rows[i].reactions.inputs}
            handleOnSelect={handleOnSelect}
            handleOnChange={handleOnChange}
            active={rows[i].active}
          />
        ),
        active: <CheckMark isValid={rows[i].active} disableText />,
        activate: (
          <Activate
            active={rows[i].active}
            loading={rows[i].loading}
            handleOnClick={() => handleOnClick(i)}
          />
        ),
      });
    }
  }
  return data;
}
